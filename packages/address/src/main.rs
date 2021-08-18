//! This module is the main entrypoint for address service.

use std::env;
use std::time::Duration;
use tonic::{transport::Server, Request, Response, Status};
use log::{error, info, trace, warn};
use uuid::Uuid;
use ea_core::{MyriadExt, MutateEntity, BaseEntity};
use ea_core::token::{generate_token, parse_token};
use ea_core::db::{Pool, get_db_pool};
use entities::country::{Country, RawCountry, CountryPayload};
use entities::address::{Address, RawAddress, AddressPayload};
use pb::country_service_server::CountryServiceServer;
use pb::address_service_server::AddressServiceServer;

use pb::{
    ListCountriesRequest,
    ListCountriesResponse,
    GetCountryRequest,
    GetCountryResponse,
    ListAddressesRequest,
    ListAddressesResponse,
    GetAddressRequest,
    GetAddressResponse,
    CreateAddressRequest,
    CreateAddressResponse,
    UpdateAddressRequest,
    UpdateAddressResponse,
    DeleteAddressRequest,
    DeleteAddressResponse,
};

pub mod pb {
    tonic::include_proto!("country");

    tonic::include_proto!("address");

    pub(crate) const COUNTRY_FILE_DESCRIPTOR_SET: &[u8] =
        tonic::include_file_descriptor_set!("country_descriptor");

    pub(crate) const ADDRESS_FILE_DESCRIPTOR_SET: &[u8] =
        tonic::include_file_descriptor_set!("address_descriptor");
}

mod entities;

type ServiceResult<T> = Result<Response<T>, Status>;
type DbResult<T> = Result<T, Box<dyn std::error::Error>>;

pub struct CoreImpl {
    pool: Pool,
}

#[tonic::async_trait]
impl pb::country_service_server::CountryService for CoreImpl {
    async fn list_countries(&self, req: Request<ListCountriesRequest>) -> ServiceResult<ListCountriesResponse> {
        let data = req.into_inner();
        let total_size = self.count_country_entries().await.unwrap();

        // Default the `page_size` to 10 if no value is present.
        let page_size: i64 = match data.page_size {
            0 => 10i64,
            n => i64::from(n),
        };

        let result = self.list_countries(&data, page_size).await;

        let res = result
            .map(|data| {
                let last_entry = data.last().clone().unwrap();
                let is_more_entries = total_size >= last_entry.row_num + page_size;
                let next_page_token = if is_more_entries { generate_token(last_entry.row_num) } else { String::new() };

                Response::new(ListCountriesResponse {
                    success: true,
                    countries: CountryPayload::from_vec(data),
                    next_page_token,
                    total_size,
                })
            });

        match res {
            Ok(data) => Ok(data),
            Err(err) => {
                warn!("An non fatal error occurred in `list_countries` method: {}", err.to_string());
                Ok(Response::new(ListCountriesResponse {
                    success: false,
                    countries: vec![],
                    next_page_token: String::new(),
                    total_size,
                }))
            },
        }
    }

    async fn get_country(&self, req: Request<GetCountryRequest>) -> ServiceResult<GetCountryResponse> {
        let data = req.into_inner();
        let result = self.get_country(&data).await;

        result
            .map(|data| Response::new(GetCountryResponse {
                success: true,
                data: Some(pb::get_country_response::Data::Country(CountryPayload::from(data))),
            }))
            .map_err(|err| {
                error!("An error occurred in `get_country` method: {}", err.to_string());
                Status::not_found(err.to_string())
            })
    }
}

#[tonic::async_trait]
impl pb::address_service_server::AddressService for CoreImpl {
    async fn list_addresses(&self, req: Request<ListAddressesRequest>) -> ServiceResult<ListAddressesResponse> {
        let data = req.into_inner();
        let total_size = self.count_address_entries().await.unwrap();

        // Default the `page_size` to 10 if no value is present.
        let page_size: i64 = match data.page_size {
            0 => 10i64,
            n => i64::from(n),
        };

        let result = self.list_addresses(&data, page_size).await;

        let res = result
            .map(|data| {
                let last_entry = data.last().clone().unwrap();
                let is_more_entries = total_size >= last_entry.row_num + page_size;
                let next_page_token = if is_more_entries { generate_token(last_entry.row_num) } else { String::new() };

                Response::new(ListAddressesResponse {
                    success: true,
                    addresses: AddressPayload::from_vec(data),
                    next_page_token,
                    total_size,
                })
            });

        match res {
            Ok(data) => Ok(data),
            Err(err) => {
                warn!("An non fatal error occurred in `list_addresses` method: {}", err.to_string());
                Ok(Response::new(ListAddressesResponse {
                    success: false,
                    addresses: vec![],
                    next_page_token: String::new(),
                    total_size,
                }))
            },
        }
    }

    async fn get_address(&self, req: Request<GetAddressRequest>) -> ServiceResult<GetAddressResponse> {
        let data = req.into_inner();
        let result = self.get_address(&data).await;

        result
            .map(|data| Response::new(GetAddressResponse {
                success: true,
                data: Some(pb::get_address_response::Data::Address(AddressPayload::from(data))),
            }))
            .map_err(|err| {
                error!("An error occurred in `get_address` method: {}", err.to_string());
                Status::not_found(err.to_string())
            })
    }

    async fn create_address(&self, req: Request<CreateAddressRequest>) -> ServiceResult<CreateAddressResponse> {
        let data = req.into_inner();
        let result = self.create_address(&data).await;

        result
            .map(|data| Response::new(CreateAddressResponse {
                success: true,
                data: Some(pb::create_address_response::Data::Address(AddressPayload::from(data))),
            }))
            .map_err(|err| {
                error!("An error occurred in `create_address` method: {}", err.to_string());
                Status::aborted(err.to_string())
            })
    }

    async fn delete_address(&self, req: Request<DeleteAddressRequest>) -> ServiceResult<DeleteAddressResponse> {
        let data = req.into_inner();
        let result = self.soft_delete_address(&data).await;

        result
            .map(|data| Response::new(DeleteAddressResponse {
                success: true,
                data: Some(pb::delete_address_response::Data::Address(AddressPayload::from(data))),
            }))
            .map_err(|err| {
                error!("An error occurred in `delete_address` method: {}", err.to_string());
                Status::aborted(err.to_string())
            })
    }

    async fn update_address(&self, req: Request<UpdateAddressRequest>) -> ServiceResult<UpdateAddressResponse> {
        let data = req.into_inner();
        let result = self.update_address(&data).await;

        result
            .map(|data| Response::new(UpdateAddressResponse {
                success: true,
                data: Some(pb::update_address_response::Data::Address(AddressPayload::from(data))),
            }))
            .map_err(|err| {
                error!("An error occurred in `update_address` method: {}", err.to_string());
                Status::aborted(err.to_string())
            })
    }
}

macro_rules! get_count {
    ($self:expr, $cls:ty) => {{
        let conn = $self.pool.get().await?;

        let query = format!(
            "SELECT COUNT(id) FROM {} WHERE is_deleted = false",
            <$cls>::get_table_name(),
        );

        trace!("Count {} entries statement: {}", <$cls>::get_table_name(), &query);

        let result = conn
            .query_one(query.as_str(), &[])
            .await
            .map_err(|err| err.into())
            .map(|row| row.get(0));

        result
    }};
}

macro_rules! list_items {
    ($self:expr, $data:expr, $page_size:expr, $cls:ty, $cls2:ty) => {{
        let conn = $self.pool.get().await?;

        if let Some(token_context) = parse_token(&$data.page_token) {
            let query = format!(
                "SELECT row_num, {} FROM (
                    SELECT ROW_NUMBER() OVER (ORDER BY created_at) AS row_num, {} FROM {} WHERE is_deleted = false ORDER BY created_at ASC
                ) AS constrained_result
                WHERE row_num > $1
                FETCH FIRST $2 ROWS ONLY",
                <$cls>::get_required_fields(),
                <$cls>::get_required_fields(),
                <$cls>::get_table_name(),
            );

            trace!("List {} statement: {}", <$cls>::get_table_name(), &query);
            trace!("List {} variables: $1 = {}, $2 = {}", <$cls>::get_table_name(), token_context.offset, $page_size);

            let result = conn
                .query(query.as_str(), &[
                    &token_context.offset,
                    &$page_size,
                ])
                .await
                .map_err(|err| err.into())
                .map(<$cls2>::from_vec);

            result
        } else {
            let query = format!(
                "SELECT ROW_NUMBER() OVER (ORDER BY created_at) AS row_num, {} FROM {} WHERE is_deleted = false ORDER BY created_at ASC
                FETCH FIRST $1 ROWS ONLY",
                <$cls>::get_required_fields(),
                <$cls>::get_table_name(),
            );

            trace!("List {} statement: {}", <$cls>::get_table_name(), &query);

            let result = conn
                .query(query.as_str(), &[
                    &$page_size,
                ])
                .await
                .map_err(|err| err.into())
                .map(<$cls2>::from_vec);

            result
        }
    }};
}

macro_rules! get_item {
    ($self:expr, $data:expr, $name:expr, $cls:ty) => {{
        let conn = $self.pool.get().await?;

        let query = format!(
            "SELECT {} FROM {} WHERE id = $1 AND is_deleted = false",
            <$cls>::get_required_fields(),
            <$cls>::get_table_name(),
        );

        trace!("Get {} statement: {}", <$cls>::get_table_name(), &query);

        let item_id = Uuid::parse_str(&$name)?;

        let result = conn
            .query_one(query.as_str(), &[&item_id])
            .await
            .map_err(|err| err.into())
            .map(<$cls>::from);

        result
    }};
}

impl CoreImpl {
    fn new(pool: &Pool) -> Self {
        Self { pool: pool.clone() }
    }

    async fn count_country_entries(&self) -> DbResult<i64> {
        get_count!(self, Country)
    }

    async fn list_countries(&self, data: &ListCountriesRequest, page_size: i64) -> DbResult<Vec<RawCountry>> {
        list_items!(self, data, page_size, Country, RawCountry)
    }

    async fn get_country(&self, data: &GetCountryRequest) -> DbResult<Country> {
        get_item!(self, data, data.country_id, Country)
    }

    async fn count_address_entries(&self) -> DbResult<i64> {
        get_count!(self, Address)
    }

    async fn list_addresses(&self, data: &ListAddressesRequest, page_size: i64) -> DbResult<Vec<RawAddress>> {
        list_items!(self, data, page_size, Address, RawAddress)
    }

    async fn get_address(&self, data: &GetAddressRequest) -> DbResult<Address> {
        get_item!(self, data, data.address_id, Address)
    }

    async fn create_address(&self, data: &CreateAddressRequest) -> DbResult<Address> {
        let conn = self.pool.get().await?;

        let field_placeholder = |num: usize| {
            let mut placeholder = String::new();
            for i in 1..num {
                placeholder.push_str(&format!("${}, ", i));
            }
            placeholder.push_str(&format!("${}", num));
            placeholder
        };

        let query = format!("INSERT INTO {} ({}) VALUES ({}) RETURNING id, created_at, updated_at",
            Address::get_table_name(),
            Address::get_required_create_fields(),
            field_placeholder(Address::create_field_count()),
        );

        trace!("Create address statement: {}", &query);

        let result: Result<Address, Box<dyn std::error::Error + 'static>> = conn
            .query_one(
                query.as_str(),
                &[
                    &data.address_1,
                    &data.address_2,
                    &data.city,
                    &data.state,
                    &data.country,
                    &data.postal_code,
                ],
            )
            .await
            .map_err(|err| err.into())
            .and_then(|row| {
                Ok(Address {
                    id: row.get("id"),
                    address_1: data.address_1.clone(),
                    address_2: data.address_2.clone(),
                    city: data.city.clone(),
                    state: data.state.clone(),
                    country: data.country.clone(),
                    postal_code: data.postal_code.clone(),
                    created_at: row.get("created_at"),
                    updated_at: row.get("updated_at"),
                })
            });

        result
    }

    async fn soft_delete_address(&self, data: &DeleteAddressRequest) -> DbResult<Address> {
        let conn = self.pool.get().await?;

        let query = format!(
            "UPDATE {} SET is_deleted = true WHERE id = $1 RETURNING *",
            Address::get_table_name()
        );

        trace!("Delete address statement: {}", &query);

        let address_id = Uuid::parse_str(&data.address_id)?;

        let result: Result<Address, Box<dyn std::error::Error + 'static>> = conn
            .query_one(
                query.as_str(),
                &[&address_id],
            )
            .await
            .map_err(|err| err.into())
            .and_then(|row| Ok(Address::from(row)));

        result
    }

    async fn update_address(&self, data: &UpdateAddressRequest) -> DbResult<Address> {
        let conn = self.pool.get().await?;

        let field_placeholder = || {
            let mut placeholder = String::new();
            let mut count = 1i32;
            for field in Address::get_required_update_fields_arr().iter() {
                placeholder.push_str(&format!("{} = COALESCE(${}, {}), ", field, count, field));
                count += 1;
            }
            placeholder.pop();
            placeholder.pop();
            placeholder
        };

        let query = format!(
            "UPDATE {} SET {} WHERE id = ${} RETURNING *",
            Address::get_table_name(),
            field_placeholder(),
            (Address::update_field_count() + 1),
        );

        trace!("Update address statement: {}", &query);

        let address_id = Uuid::parse_str(&data.address_id)?;

        let result: Result<Address, Box<dyn std::error::Error + 'static>> = conn
            .query_one(
                query.as_str(),
                &[
                    &data.address_1,
                    &data.address_2,
                    &data.city,
                    &data.state,
                    &data.country,
                    &data.postal_code,
                    &address_id,
                ],
            )
            .await
            .map_err(|err| err.into())
            .and_then(|row| Ok(Address::from(row)));

        result
    }
}

async fn flip_service_status(mut reporter: tonic_health::server::HealthReporter) {
    let mut iter = 0u64;
    loop {
        iter += 1;
        tokio::time::sleep(Duration::from_secs(1)).await;

        if iter % 2 == 0 {
            reporter.set_serving::<CountryServiceServer<CoreImpl>>().await;
            reporter.set_serving::<AddressServiceServer<CoreImpl>>().await;
        } else {
            reporter.set_not_serving::<CountryServiceServer<CoreImpl>>().await;
            reporter.set_not_serving::<AddressServiceServer<CoreImpl>>().await;
        };
    }
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    dotenv::dotenv().ok();

    if env::var("RUST_LOG").is_err() {
        env::set_var("RUST_LOG", "address_svc=trace");
    }

    tracing_subscriber::fmt()
        .with_env_filter(tracing_subscriber::EnvFilter::from_default_env())
        .init();

    let pool = get_db_pool()?;

    let addr = "[::1]:8100".parse()?;
    info!("Address service is listening on {}", addr);

    let reflection_service = tonic_reflection::server::Builder::configure()
        .register_encoded_file_descriptor_set(pb::COUNTRY_FILE_DESCRIPTOR_SET)
        .register_encoded_file_descriptor_set(pb::ADDRESS_FILE_DESCRIPTOR_SET)
        .build()?;

    let (mut health_reporter, health_service) = tonic_health::server::health_reporter();
    health_reporter
        .set_serving::<CountryServiceServer<CoreImpl>>()
        .await;

    health_reporter
        .set_serving::<AddressServiceServer<CoreImpl>>()
        .await;

    tokio::spawn(flip_service_status(health_reporter.clone()));

    Server::builder()
        .add_service(reflection_service)
        .add_service(health_service)
        .add_service(CountryServiceServer::new(CoreImpl::new(&pool)))
        .add_service(AddressServiceServer::new(CoreImpl::new(&pool)))
        .serve(addr)
        .await?;

    Ok(())
}
