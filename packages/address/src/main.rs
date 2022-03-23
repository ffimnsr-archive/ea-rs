//! This module is the main entrypoint for address service.
use std::env;

mod entities;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    dotenv::dotenv().ok();

    if env::var("RUST_LOG").is_err() {
        env::set_var("RUST_LOG", "ea_address=trace");
    }

    tracing_subscriber::fmt()
        .with_env_filter(tracing_subscriber::EnvFilter::from_default_env())
        .init();

    let addr = "[::]:8011".parse()?;
    log::info!("Open Sesame: Address Service");
    log::info!("Service is listening on {}", addr);

    Ok(())
}
