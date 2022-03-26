//! This module is the main entrypoint for address service.
mod entity;
mod global;
mod handler;

use chrono::Utc;
use ea_trident::{ServiceError, ServiceResult};
use hyper::{Body, Request, Response, Server, StatusCode};
use mongodb::{options::ClientOptions, Client, Database};
use routerify::prelude::*;
use routerify::{Router, RouterService};
use std::time::Instant;
use std::{env, sync::Arc};

use crate::global::*;

pub async fn health(req: Request<Body>) -> ServiceResult<Response<Body>> {
    let uptime = req.data::<Arc<Instant>>().ok_or(ERR_UPTIME_INSTANTIATE)?;
    let health_check = serde_json::json!({
        "uptime": uptime.elapsed(),
        "message": "ok",
        "timestamp": Utc::now().timestamp(),
    });

    ea_trident::json_response(StatusCode::OK, Body::from(health_check.to_string()))
}

fn router(db: Arc<Database>) -> ServiceResult<Router<Body, ServiceError>> {
    let uptime = Arc::new(Instant::now());

    Router::<Body, ServiceError>::builder()
        .middleware(ea_trident::middleware::enable_add_request_id())
        .middleware(ea_trident::middleware::enable_set_request_id())
        .middleware(ea_trident::middleware::enable_logger_with_request_id())
        .middleware(ea_trident::middleware::enable_cors_all())
        .data(db.clone())
        .data(uptime.clone())
        .get("/", ea_trident::hello_world)
        .scope("/api/addresses", handler::address::api_router()?)
        .scope("/api/countries", handler::country::api_router()?)
        .get("/health", health)
        .any(ea_trident::handler_404)
        .err_handler(ea_trident::error_handler)
        .build()
        .map_err(|_| ServiceError::DefinedError("Unable to build root router"))
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    dotenv::dotenv().ok();

    if env::var("RUST_LOG").is_err() {
        env::set_var("RUST_LOG", "ea_address=trace,ea_trident=trace");
    }

    tracing_subscriber::fmt()
        .with_env_filter(tracing_subscriber::EnvFilter::from_default_env())
        .init();

    let client_options = ClientOptions::parse(DEFAULT_DB_URI)
        .await
        .map_err(ServiceError::Mongo)?;
    let client = Client::with_options(client_options).map_err(ServiceError::Mongo)?;
    let db = Arc::new(client.database(DEFAULT_DB));

    let router = router(db.clone())?;
    let service = RouterService::new(router).map_err(|_| {
        ServiceError::DefinedError("Unable to create the router service")
    })?;

    let addr = ([0, 0, 0, 0], 8011).into();
    log::info!("Address service is listening on {}", addr);

    let server = Server::bind(&addr).serve(service);

    if let Err(e) = server.await {
        log::error!("A server error occurred: {}", e);
    }

    Ok(())
}
