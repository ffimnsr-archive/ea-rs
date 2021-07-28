//! This module is the main entrypoint for account service.
mod entity;
mod global;
mod handler;

use axum::handler::Handler;
use axum::http::{HeaderValue, Method, StatusCode};
use axum::response::IntoResponse;
use axum::routing::get;
use axum::{Extension, Json, Router, Server};
use chrono::Utc;
use ea_trident::{ServiceError, ServiceResult};
use mongodb::{options::ClientOptions, Client, Database};
use serde_json::json;
use std::time::Instant;
use std::{env, sync::Arc};
use tokio::signal;
use tower_http::cors::CorsLayer;

use crate::global::*;

async fn health(Extension(uptime): Extension<Arc<Instant>>) -> impl IntoResponse {
    let data = json!({
        "uptime": uptime.elapsed(),
        "message": "ok",
        "timestamp": Utc::now().timestamp(),
    });

    (StatusCode::OK, Json(data))
}

fn router(db: Arc<Database>) -> Router {
    let uptime = Arc::new(Instant::now());

    Router::new()
        .route("/", get(::ea_trident::hello_world))
        .route("/health", get(health))
        .nest("/api/accounts", handler::account::api_router())
        .layer(Extension(db))
        .layer(Extension(uptime))
        .layer(
            CorsLayer::new()
                .allow_origin("http://localhost:3000".parse::<HeaderValue>().unwrap())
                .allow_methods([Method::GET]),
        )
        .fallback(ea_trident::handler_404.into_service())
}

async fn shutdown_signal() {
    let ctrl_c = async {
        signal::ctrl_c()
            .await
            .expect("Failed to install Ctrl+C handler");
    };

    tokio::select! {
        _ = ctrl_c => {},
    }
}

#[tokio::main]
async fn main() -> ServiceResult<()> {
    dotenv::dotenv().ok();

    if env::var("RUST_LOG").is_err() {
        env::set_var("RUST_LOG", "ea_account=trace,ea_trident=info");
    }

    tracing_subscriber::fmt()
        .with_env_filter(tracing_subscriber::EnvFilter::from_default_env())
        .init();

    let dsn = env::var("DSN").ok().unwrap_or(DEFAULT_DSN.to_string());


    let client_options = ClientOptions::parse(dsn)
        .await
        .map_err(ServiceError::Mongo)?;
    let client = Client::with_options(client_options).map_err(ServiceError::Mongo)?;
    let db = Arc::new(client.database(DEFAULT_DB));

    log::info!("Account service is now connected to MongoDB");

    let router = router(db.clone());
    let port = env::var("PORT")
        .map(|x| x.parse::<u16>())
        .ok()
        .and_then(|x| x.ok())
        .unwrap_or(8080);

    let addr = format!("[::]:{}", port)
        .parse()
        .map_err(|_| ServiceError::DefinedError("Unable to parse socket address."))?;
    log::info!("Account service is listening on {}", addr);

    let server = Server::bind(&addr)
        .serve(router.into_make_service())
        .with_graceful_shutdown(shutdown_signal());

    if let Err(e) = server.await {
        log::error!("A server error occurred: {}", e);
    }

    Ok(())
}

#[cfg(test)]
mod tests {
    #[test]
    fn sanity_check() {
        assert_eq!(2 + 2, 4);
    }
}
