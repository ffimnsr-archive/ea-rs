//! This module is the main entrypoint for account service.

use std::env;
use std::time::Duration;
use entities::MyriadExt;
use tonic::{transport::Server, Request, Response, Status};
use log::{error, info, trace, warn};
use nanoid::nanoid;
use uuid::Uuid;
use db::{Pool, get_db_pool};
use entities::BaseEntity;
use entities::account::{RawAccount, Account, AccountPayload};
use pb::account_service_server::AccountServiceServer;

use pb::{
    ListAccountsRequest,
    ListAccountsResponse,
    GetAccountRequest,
    GetAccountResponse,
    CreateAccountRequest,
    CreateAccountResponse,
    DeleteAccountRequest,
    DeleteAccountResponse,
    UpdateAccountRequest,
    UpdateAccountResponse,
};

use crate::entities::MutateEntity;

pub mod pb {
    tonic::include_proto!("account");

    pub(crate) const FILE_DESCRIPTOR_SET: &[u8] =
        tonic::include_file_descriptor_set!("account_descriptor");
}

mod db;
mod entities;

type AccountResult<T> = Result<Response<T>, Status>;
type DbResult<T> = Result<T, Box<dyn std::error::Error>>;

pub struct CoreAccount {
    pool: Pool,
}

pub struct PaginationToken {
    offset: i64,
}

#[tonic::async_trait]
impl pb::account_service_server::AccountService for CoreAccount {
    async fn list_accounts(&self, req: Request<ListAccountsRequest>) -> AccountResult<ListAccountsResponse> {
        let data = req.into_inner();
        let total_size = self.count_account_entries().await.unwrap();

        // Default the `page_size` to 10 if no value is present.
        let page_size: i64 = match data.page_size {
            0 => 10i64,
            n => i64::from(n),
        };

        let result = self.list_accounts(&data, page_size).await;

        let res = result
            .map(|data| {
                let last_entry = data.last().clone().unwrap();
                let is_more_entries = total_size >= last_entry.row_num + page_size;
                let next_page_token = if is_more_entries { self.generate_token(last_entry.row_num) } else { String::new() };

                Response::new(ListAccountsResponse {
                    success: true,
                    accounts: AccountPayload::from_vec(data),
                    next_page_token,
                    total_size,
                })
            });

        match res {
            Ok(data) => Ok(data),
            Err(err) => {
                warn!("An non fatal error occurred in `list_accounts` method: {}", err.to_string());
                Ok(Response::new(ListAccountsResponse {
                    success: false,
                    accounts: vec![],
                    next_page_token: String::new(),
                    total_size,
                }))
            },
        }
    }

    async fn get_account(&self, req: Request<GetAccountRequest>) -> AccountResult<GetAccountResponse> {
        let data = req.into_inner();
        let result = self.get_account(&data).await;

        result
            .map(|data| Response::new(GetAccountResponse {
                success: true,
                data: Some(pb::get_account_response::Data::Account(AccountPayload::from(data))),
            }))
            .map_err(|err| {
                error!("An error occurred in `get_account` method: {}", err.to_string());
                Status::not_found(err.to_string())
            })
    }

    async fn create_account(&self, req: Request<CreateAccountRequest>) -> AccountResult<CreateAccountResponse> {
        let data = req.into_inner();
        let result = self.create_account(&data).await;

        result
            .map(|data| Response::new(CreateAccountResponse {
                success: true,
                data: Some(pb::create_account_response::Data::Account(AccountPayload::from(data))),
            }))
            .map_err(|err| {
                error!("An error occurred in `create_account` method: {}", err.to_string());
                Status::aborted(err.to_string())
            })
    }

    async fn delete_account(&self, req: Request<DeleteAccountRequest>) -> AccountResult<DeleteAccountResponse> {
        let data = req.into_inner();
        let result = self.soft_delete_account(&data).await;

        result
            .map(|data| Response::new(DeleteAccountResponse {
                success: true,
                data: Some(pb::delete_account_response::Data::Account(AccountPayload::from(data))),
            }))
            .map_err(|err| {
                error!("An error occurred in `delete_account` method: {}", err.to_string());
                Status::aborted(err.to_string())
            })
    }

    async fn update_account(&self, req: Request<UpdateAccountRequest>) -> AccountResult<UpdateAccountResponse> {
        let data = req.into_inner();
        let result = self.update_account(&data).await;

        result
            .map(|data| Response::new(UpdateAccountResponse {
                success: true,
                data: Some(pb::update_account_response::Data::Account(AccountPayload::from(data))),
            }))
            .map_err(|err| {
                error!("An error occurred in `update_account` method: {}", err.to_string());
                Status::aborted(err.to_string())
            })
    }
}

impl CoreAccount {
    fn new(pool: &Pool) -> Self {
        Self { pool: pool.clone() }
    }

    fn generate_token(&self, offset: i64) -> String {
        base64::encode(offset.to_string())
    }

    fn parse_token(&self, token: &str) -> Option<PaginationToken> {
        if token == "" {
            error!("The passed token string is empty");
            return None
        }

        let raw_token = base64::decode(token).ok()?;
        let raw_token  = String::from_utf8_lossy(&raw_token).into_owned();
        let offset = raw_token.parse::<i64>().ok()?;

        Some(PaginationToken { offset })
    }

    async fn count_account_entries(&self) -> DbResult<i64> {
        let conn = self.pool.get().await?;

        let query = format!(
            "SELECT COUNT(id) FROM {} WHERE is_deleted = false",
            Account::get_table_name(),
        );

        trace!("Count account entries statement: {}", &query);

        let result = conn
            .query_one(query.as_str(), &[])
            .await
            .map_err(|err| err.into())
            .map(|row| row.get(0));

        result
    }

    async fn list_accounts(&self, data: &ListAccountsRequest, page_size: i64) -> DbResult<Vec<RawAccount>> {
        let conn = self.pool.get().await?;

        if let Some(token_context) = self.parse_token(&data.page_token) {
            let query = format!(
                "SELECT row_num, {} FROM (
                    SELECT ROW_NUMBER() OVER (ORDER BY created_at) AS row_num, {} FROM {} WHERE is_deleted = false ORDER BY created_at ASC
                ) AS constrained_result
                WHERE row_num > $1
                FETCH FIRST $2 ROWS ONLY",
                Account::get_required_fields(),
                Account::get_required_fields(),
                Account::get_table_name(),
            );

            trace!("List accounts statement: {}", &query);
            trace!("List accounts variables: $1 = {}, $2 = {}", token_context.offset, page_size);

            let result = conn
                .query(query.as_str(), &[
                    &token_context.offset,
                    &page_size,
                ])
                .await
                .map_err(|err| err.into())
                .map(RawAccount::from_vec);

            result
        } else {
            let query = format!(
                "SELECT ROW_NUMBER() OVER (ORDER BY created_at) AS row_num, {} FROM {} WHERE is_deleted = false ORDER BY created_at ASC
                FETCH FIRST $1 ROWS ONLY",
                Account::get_required_fields(),
                Account::get_table_name(),
            );

            trace!("List accounts statement: {}", &query);

            let result = conn
                .query(query.as_str(), &[
                    &page_size,
                ])
                .await
                .map_err(|err| err.into())
                .map(RawAccount::from_vec);

            result
        }
    }

    async fn get_account(&self, data: &GetAccountRequest) -> DbResult<Account> {
        let conn = self.pool.get().await?;

        let query = format!(
            "SELECT {} FROM {} WHERE id = $1 AND is_deleted = false",
            Account::get_required_fields(),
            Account::get_table_name(),
        );

        trace!("Get account statement: {}", &query);

        let user_id = Uuid::parse_str(&data.user_id)?;

        let result = conn
            .query_one(query.as_str(), &[&user_id])
            .await
            .map_err(|err| err.into())
            .map(Account::from);

        result
    }

    async fn create_account(&self, data: &CreateAccountRequest) -> DbResult<Account> {
        let conn = self.pool.get().await?;
        let public_code = nanoid!(12, &nanoid::alphabet::SAFE);

        let field_placeholder = |num: usize| {
            let mut placeholder = String::new();
            for i in 1..num {
                placeholder.push_str(&format!("${}, ", i));
            }
            placeholder.push_str(&format!("${}", num));
            placeholder
        };

        let query = format!("INSERT INTO {} ({}) VALUES ({}) RETURNING id, email_verified, created_at, updated_at",
            Account::get_table_name(),
            Account::get_required_create_fields(),
            field_placeholder(Account::create_field_count()),
        );

        trace!("Create account statement: {}", &query);

        let global_id = Uuid::parse_str(&data.global_id)?;

        let result: Result<Account, Box<dyn std::error::Error + 'static>> = conn
            .query_one(
                query.as_str(),
                &[
                    &global_id,
                    &public_code,
                    &data.username,
                    &data.avatar,
                    &data.given_name,
                    &data.family_name,
                    &data.middle_name,
                    &data.email,
                ],
            )
            .await
            .map_err(|err| err.into())
            .and_then(|row| {
                Ok(Account {
                    id: row.get("id"),
                    global_id,
                    public_code,
                    username: data.username.clone(),
                    avatar: data.avatar.clone(),
                    given_name: data.given_name.clone(),
                    family_name: data.family_name.clone(),
                    middle_name: data.middle_name.clone(),
                    email: data.email.clone(),
                    email_verified: row.get("email_verified"),
                    created_at: row.get("created_at"),
                    updated_at: row.get("updated_at"),
                })
            });

        result
    }

    async fn soft_delete_account(&self, data: &DeleteAccountRequest) -> DbResult<Account> {
        let conn = self.pool.get().await?;

        let query = format!(
            "UPDATE {} SET is_deleted = true WHERE id = $1 RETURNING *",
            Account::get_table_name()
        );

        trace!("Delete account statement: {}", &query);

        let user_id = Uuid::parse_str(&data.user_id)?;

        let result: Result<Account, Box<dyn std::error::Error + 'static>> = conn
            .query_one(
                query.as_str(),
                &[&user_id],
            )
            .await
            .map_err(|err| err.into())
            .and_then(|row| Ok(Account::from(row)));

        result
    }

    #[allow(dead_code)]
    async fn hard_delete_account(&self, data: &DeleteAccountRequest) -> DbResult<Account> {
        let conn = self.pool.get().await?;

        let query = format!(
            "DELETE FROM {} WHERE id = $1 RETURNING *",
            Account::get_table_name()
        );

        trace!("Delete account statement: {}", &query);

        let user_id = Uuid::parse_str(&data.user_id)?;

        let result: Result<Account, Box<dyn std::error::Error + 'static>> = conn
            .query_one(
                query.as_str(),
                &[&user_id],
            )
            .await
            .map_err(|err| err.into())
            .and_then(|row| Ok(Account::from(row)));

        result
    }

    async fn update_account(&self, data: &UpdateAccountRequest) -> DbResult<Account> {
        let conn = self.pool.get().await?;

        let field_placeholder = || {
            let mut placeholder = String::new();
            let mut count = 1i32;
            for field in Account::get_required_update_fields_arr().iter() {
                placeholder.push_str(&format!("{} = COALESCE(${}, {}), ", field, count, field));
                count += 1;
            }
            placeholder.pop();
            placeholder.pop();
            placeholder
        };

        let query = format!(
            "UPDATE {} SET {} WHERE id = ${} RETURNING *",
            Account::get_table_name(),
            field_placeholder(),
            (Account::update_field_count() + 1),
        );

        trace!("Update account statement: {}", &query);

        let user_id = Uuid::parse_str(&data.user_id)?;
        let global_id = Uuid::parse_str(&data.global_id.clone().ok_or_else(|| "global_id can't be is empty")?)?;

        let result: Result<Account, Box<dyn std::error::Error + 'static>> = conn
            .query_one(
                query.as_str(),
                &[
                    &global_id,
                    &data.public_code,
                    &data.username,
                    &data.avatar,
                    &data.given_name,
                    &data.family_name,
                    &data.middle_name,
                    &data.email,
                    &data.email_verified,
                    &user_id,
                ],
            )
            .await
            .map_err(|err| err.into())
            .and_then(|row| Ok(Account::from(row)));

        result
    }
}

async fn flip_service_status(mut reporter: tonic_health::server::HealthReporter) {
    let mut iter = 0u64;
    loop {
        iter += 1;
        tokio::time::sleep(Duration::from_secs(1)).await;

        if iter % 2 == 0 {
            reporter.set_serving::<AccountServiceServer<CoreAccount>>().await;
        } else {
            reporter.set_not_serving::<AccountServiceServer<CoreAccount>>().await;
        };
    }
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    dotenv::dotenv().ok();

    if env::var("RUST_LOG").is_err() {
        env::set_var("RUST_LOG", "account_svc=trace");
    }

    tracing_subscriber::fmt()
        .with_env_filter(tracing_subscriber::EnvFilter::from_default_env())
        .init();

    let pool = get_db_pool()?;

    let server = CoreAccount::new(&pool);

    let addr = "[::1]:8090".parse()?;
    info!("Account service is listening on {}", addr);

    let reflection_service = tonic_reflection::server::Builder::configure()
        .register_encoded_file_descriptor_set(pb::FILE_DESCRIPTOR_SET)
        .build()?;

    let (mut health_reporter, health_service) = tonic_health::server::health_reporter();
    health_reporter
        .set_serving::<AccountServiceServer<CoreAccount>>()
        .await;

    tokio::spawn(flip_service_status(health_reporter.clone()));

    Server::builder()
        .add_service(reflection_service)
        .add_service(health_service)
        .add_service(AccountServiceServer::new(server))
        .serve(addr)
        .await?;

    Ok(())
}
