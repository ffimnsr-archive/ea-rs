//! This module is the main entrypoint for accounts service.

use std::env;
use entities::MyriadExt;
use tonic::{transport::Server, Request, Response, Status};
use log::{info, trace};
use nanoid::nanoid;
use uuid::Uuid;
use db::{Pool, get_db_pool};
use entities::BaseEntity;
use entities::account::{Account, AccountPayload};

use pb::{
    GetAccountsResponse,
    GetAccountRequest,
    GetAccountResponse,
    CreateAccountRequest,
    CreateAccountResponse,
    DeleteAccountRequest,
    DeleteAccountResponse,
    UpdateAccountRequest,
    UpdateAccountResponse,
};

pub mod pb {
    tonic::include_proto!("accounts");
}

mod db;
mod entities;

type AccountsResult<T> = Result<Response<T>, Status>;
type DbResult<T> = Result<T, Box<dyn std::error::Error>>;

pub struct AccountsServer {
    pool: Pool,
}

#[tonic::async_trait]
impl pb::accounts_server::Accounts for AccountsServer {
    async fn get_accounts(&self, _: Request<()>) -> AccountsResult<GetAccountsResponse> {
        let result = self.get_accounts().await;

        let res = result
            .map(|data| Response::new(GetAccountsResponse {
                success: true,
                message: None,
                accounts: AccountPayload::from_vec(data),
            }));

        match res {
            Ok(data) => Ok(data),
            Err(err) => Ok(Response::new(GetAccountsResponse {
                success: false,
                message: Some(err.to_string()),
                accounts: vec![],
            })),
        }
    }

    async fn get_account(&self, req: Request<GetAccountRequest>) -> AccountsResult<GetAccountResponse> {
        let data = req.into_inner();
        let result = self.get_account(&data).await;

        result
            .map(|data| Response::new(GetAccountResponse {
                success: true,
                data: Some(pb::get_account_response::Data::Account(AccountPayload::from(data))),
            }))
            .map_err(|op| Status::not_found(op.to_string()))
    }

    async fn create_account(&self, req: Request<CreateAccountRequest>) -> AccountsResult<CreateAccountResponse> {
        let data = req.into_inner();
        let result = self.create_account(&data).await;

        result
            .map(|data| Response::new(CreateAccountResponse {
                success: true,
                data: Some(pb::create_account_response::Data::Account(AccountPayload::from(data))),
            }))
            .map_err(|op| Status::aborted(op.to_string()))
    }

    async fn delete_account(&self, req: Request<DeleteAccountRequest>) -> AccountsResult<DeleteAccountResponse> {
        let data = req.into_inner();
        let result = self.delete_account(&data).await;

        result
            .map(|data| Response::new(DeleteAccountResponse {
                success: true,
                data: Some(pb::delete_account_response::Data::Account(AccountPayload::from(data))),
            }))
            .map_err(|op| Status::aborted(op.to_string()))
    }

    async fn update_account(&self, req: Request<UpdateAccountRequest>) -> AccountsResult<UpdateAccountResponse> {
        let data = req.into_inner();
        let result = self.update_account(&data).await;

        result
            .map(|data| Response::new(UpdateAccountResponse {
                success: true,
                data: Some(pb::update_account_response::Data::Account(AccountPayload::from(data))),
            }))
            .map_err(|op| Status::aborted(op.to_string()))
    }
}

impl AccountsServer {
    fn new(pool: &Pool) -> Self {
        Self { pool: pool.clone() }
    }

    async fn get_accounts(&self) -> DbResult<Vec<Account>> {
        let conn = self.pool.get().await?;

        let query = format!(
            "SELECT {} FROM {}",
            Account::get_required_fields(),
            Account::get_table_name(),
        );

        let result = conn
            .query(query.as_str(), &[])
            .await
            .map_err(|err| err.into())
            .map(Account::from_vec);

        result
    }

    async fn get_account(&self, data: &GetAccountRequest) -> DbResult<Account> {
        let conn = self.pool.get().await?;

        let query = format!(
            "SELECT {} FROM {} WHERE id = $1",
            Account::get_required_fields(),
            Account::get_table_name(),
        );

        let result = conn
            .query_one(query.as_str(), &[&data.user_id])
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
            let max = num - 1;
            for i in 0..max {
                placeholder.push_str(&format!("${}, ", i));
            }
            placeholder.push_str(&format!("${}", max));
            placeholder
        };

        let query = format!("INSERT INTO {} ({}) VALUES ({}) RETURNING id",
            Account::get_table_name(),
            Account::get_required_fields(),
            field_placeholder(Account::field_count()),
        );

        trace!("Create account statement: {}", &query);

        let result: Result<Account, Box<dyn std::error::Error + 'static>> = conn
            .query_one(
                query.as_str(),
                &[
                    &data.global_id,
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
                let global_id = Uuid::parse_str(&data.global_id)?;

                Ok(Account {
                    id: row.get("id"),
                    global_id: global_id,
                    public_code: public_code,
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

    async fn delete_account(&self, data: &DeleteAccountRequest) -> DbResult<Account> {
        let conn = self.pool.get().await?;

        let account = self.get_account(&GetAccountRequest {
            user_id: data.user_id.clone(),
        }).await.map_err(|err| Status::internal(err.to_string()))?;

        let query = format!(
            "DELETE FROM {} WHERE id = $1",
            Account::get_table_name()
        );

        trace!("Delete account statement: {}", &query);

        // let result: Result<Account, Box<dyn std::error::Error + 'static>> = conn
        //     .query_opt(
        //         query.as_str(),
        //         &[&data.user_id],
        //     )
        //     .await
        //     .map_err(|op| op.into())
        //     .and_then(|row| {
        //         let global_id = Uuid::parse_str(&data.global_id)?;

        //         Ok(Account {
        //             id: row.get("id"),
        //             global_id: global_id,
        //             public_code: public_code,
        //             username: data.username.clone(),
        //             avatar: data.avatar.clone(),
        //             given_name: data.given_name.clone(),
        //             family_name: data.family_name.clone(),
        //             middle_name: data.middle_name.clone(),
        //             email: data.email.clone(),
        //             email_verified: row.get("email_verified"),
        //             created_at: row.get("created_at"),
        //             updated_at: row.get("updated_at"),
        //         })
        //     });

        Ok(account)
    }

    async fn update_account(&self, data: &UpdateAccountRequest) -> DbResult<Account> {
        let conn = self.pool.get().await?;

        let field_placeholder = || {
            let mut placeholder = String::new();
            let mut count = 0i32;
            for field in Account::get_required_fields_arr().iter() {
                placeholder.push_str(&format!("{} = COALESCE(${}, {}), ", field, count, field));
                count += 1;
            }
            placeholder.pop();
            placeholder.pop();
            placeholder
        };

        let account = self.get_account(&GetAccountRequest {
            user_id: data.user_id.clone(),
        }).await.map_err(|err| Status::internal(err.to_string()))?;


        let query = format!(
            "UPDATE {} SET {} WHERE id = ${}",
            Account::get_table_name(),
            field_placeholder(),
            (Account::field_count() + 1),
        );

        trace!("Update account statement: {}", &query);

        let result: Result<u64, Box<dyn std::error::Error + 'static>> = conn
            .execute(
                query.as_str(),
                &[
                    &data.global_id,
                    &data.public_code,
                    &data.username,
                    &data.avatar,
                    &data.given_name,
                    &data.family_name,
                    &data.middle_name,
                    &data.email,
                    &data.email_verified,
                    &data.user_id,
                ],
            )
            .await
            .map_err(|err| err.into());

        result?;

        Ok(account)
    }
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    dotenv::dotenv().ok();

    if env::var("RUST_LOG").is_err() {
        env::set_var("RUST_LOG", "accounts=info");
    }

    env_logger::init();

    let pool = get_db_pool()?;

    let server = AccountsServer::new(&pool);

    let addr = "[::1]:8090".parse()?;
    info!("Accounts Service is listening on {}", addr);

    Server::builder()
        .add_service(pb::accounts_server::AccountsServer::new(server))
        .serve(addr)
        .await?;

    Ok(())
}
