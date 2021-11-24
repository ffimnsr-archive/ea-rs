//! This module is the main entrypoint for talent pool service.

use std::env;
use tonic::transport::Server;
use log::info;
use ea_core::db::{Pool, get_db_pool};
use ea_proto_derive::ProtoAccessors;

pub mod pb {
    tonic::include_proto!("ea");

    pub(crate) const FILE_DESCRIPTOR_SET: &[u8] =
        tonic::include_file_descriptor_set!("talent_pool_descriptor");
}

mod entities;

#[derive(ProtoAccessors)]
#[ea_proto(name("TalentPool"))]
pub struct CoreImpl {
    pool: Pool,
}

impl CoreImpl {
    fn new(pool: &Pool) -> Self {
        Self { pool: pool.clone() }
    }

    ::ea_core::impl_crud_for!(
        {
            "talent_pool",
            "talent_pools",
            ["user_id"],
            [],
        },
    );
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    dotenv::dotenv().ok();

    if env::var("RUST_LOG").is_err() {
        env::set_var("RUST_LOG", "ea_organization=trace");
    }

    tracing_subscriber::fmt()
        .with_env_filter(tracing_subscriber::EnvFilter::from_default_env())
        .init();

    let pool = get_db_pool()?;

    let addr = "[::]:8014".parse()?;
    info!("Open Sesame: Talent Pool Service");
    info!("Service is listening on {}", addr);

    let reflection_service = tonic_reflection::server::Builder::configure()
        .register_encoded_file_descriptor_set(pb::FILE_DESCRIPTOR_SET)
        .build()?;

    let (mut health_reporter, health_service) = tonic_health::server::health_reporter();

    ::ea_core::spawn_health_reporter!(health_reporter, "talent_pool");

    Server::builder()
        .add_service(reflection_service)
        .add_service(health_service)
        .add_service(CoreImpl::new_talent_pool_service(&pool))
        .serve(addr)
        .await?;

    Ok(())
}
