//! This module is the main entrypoint for account ext. service.

use ea_core::db::{get_db_pool, Pool};
use ea_proto_derive::ProtoAccessors;
use log::info;
use std::env;
use tonic::transport::Server;

pub mod pb {
    tonic::include_proto!("ea");

    pub(crate) const ACCOUNT_EXT_FILE_DESCRIPTOR_SET: &[u8] =
        tonic::include_file_descriptor_set!("account_ext_descriptor");
}

mod entities;

#[derive(ProtoAccessors)]
#[ea_proto(name(
    "ExperienceLevel",
    "Rank",
    "SitePreference",
    "WorkExperience",
    "WorkFunction",
    "WorkPreference",
))]
pub struct CoreImpl {
    pool: Pool,
}

impl CoreImpl {
    fn new(pool: &Pool) -> Self {
        Self { pool: pool.clone() }
    }

    ::ea_core::impl_crud_for!(
        {
            "experience_level",
            "experience_levels",
            [],
            ["name", "description"],
        },
        {
            "rank",
            "ranks",
            [],
            ["name", "description"],
        },
        {
            "site_preference",
            "site_preferences",
            ["user_id"],
            ["is_opt_in_marketing", "is_opt_in_usage_statistics", "is_opt_in_experimental"],
        },
        {
            "work_experience",
            "work_experiences",
            ["user_id"],
            ["title", "organization", "location", "description"],
        },
        {
            "work_function",
            "work_functions",
            [],
            ["name", "description"],
        },
        {
            "work_preference",
            "work_preferences",
            ["user_id", "work_function_id"],
            [],
        },
    );
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    dotenv::dotenv().ok();

    if env::var("RUST_LOG").is_err() {
        env::set_var("RUST_LOG", "ea_account_ext=trace");
    }

    tracing_subscriber::fmt()
        .with_env_filter(tracing_subscriber::EnvFilter::from_default_env())
        .init();

    let pool = get_db_pool()?;

    let addr = "[::]:8012".parse()?;
    info!("Open Sesame: Account Extension Service");
    info!("Service is listening on {}", addr);

    let reflection_service = tonic_reflection::server::Builder::configure()
        .register_encoded_file_descriptor_set(pb::ACCOUNT_EXT_FILE_DESCRIPTOR_SET)
        .build()?;

    let (mut health_reporter, health_service) = tonic_health::server::health_reporter();

    ::ea_core::spawn_health_reporter!(
        health_reporter,
        "experience_level",
        "rank",
        "site_preference",
        "work_experience",
        "work_function",
        "work_preference"
    );

    Server::builder()
        .add_service(reflection_service)
        .add_service(health_service)
        .add_service(CoreImpl::new_experience_level_service(&pool))
        .add_service(CoreImpl::new_rank_service(&pool))
        .add_service(CoreImpl::new_site_preference_service(&pool))
        .add_service(CoreImpl::new_work_experience_service(&pool))
        .add_service(CoreImpl::new_work_function_service(&pool))
        .add_service(CoreImpl::new_work_preference_service(&pool))
        .serve(addr)
        .await?;

    Ok(())
}
