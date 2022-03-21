//! This module is the main entrypoint for address service.

use ea_core::db::{get_db_pool, Pool};
use ea_proto_derive::ProtoAccessors;
use log::info;
use std::env;
use tonic::transport::Server;

pub mod pb {
    tonic::include_proto!("ea");

    pub(crate) const ADDRESS_FILE_DESCRIPTOR_SET: &[u8] =
        tonic::include_file_descriptor_set!("address_descriptor");
}

mod entities;

#[derive(ProtoAccessors)]
#[ea_proto(name("Address", "Country"))]
pub struct CoreImpl {
    pool: Pool,
}

impl CoreImpl {
    fn new(pool: &Pool) -> Self {
        Self { pool: pool.clone() }
    }

    ::ea_core::impl_crud_for!(
        {
            "address",
            "addresses",
            ["country_id"],
            ["address_1", "address_2", "city", "state", "postal_code"],
        },
        {
            "country",
            "countries",
            [],
            ["name", "alpha2", "alpha3", "phone_code", "currency_code"],
        },
    );
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    dotenv::dotenv().ok();

    if env::var("RUST_LOG").is_err() {
        env::set_var("RUST_LOG", "ea_address=trace");
    }

    tracing_subscriber::fmt()
        .with_env_filter(tracing_subscriber::EnvFilter::from_default_env())
        .init();

    let pool = get_db_pool()?;

    let addr = "[::]:8011".parse()?;
    info!("Open Sesame: Address Service");
    info!("Service is listening on {}", addr);

    let reflection_service = tonic_reflection::server::Builder::configure()
        .register_encoded_file_descriptor_set(pb::ADDRESS_FILE_DESCRIPTOR_SET)
        .build()?;

    let (mut health_reporter, health_service) = tonic_health::server::health_reporter();

    ::ea_core::spawn_health_reporter!(health_reporter, "address", "country");

    Server::builder()
        .add_service(reflection_service)
        .add_service(health_service)
        .add_service(CoreImpl::new_address_service(&pool))
        .add_service(CoreImpl::new_country_service(&pool))
        .serve(addr)
        .await?;

    Ok(())
}
