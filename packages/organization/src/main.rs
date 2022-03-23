//! This module is the main entrypoint for organization service.
use std::env;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    dotenv::dotenv().ok();

    if env::var("RUST_LOG").is_err() {
        env::set_var("RUST_LOG", "ea_organization=trace");
    }

    tracing_subscriber::fmt()
        .with_env_filter(tracing_subscriber::EnvFilter::from_default_env())
        .init();

    let addr = "[::]:8013".parse()?;
    log::info!("Open Sesame: Organization Service");
    log::info!("Service is listening on {}", addr);

    Ok(())
}
