//! This module is the main entrypoint for talent pool service.
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
use tower_http::trace::{DefaultMakeSpan, DefaultOnResponse, TraceLayer};

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
        .nest("/api/pools", handler::talent_pool::api_router())
        .layer(Extension(db))
        .layer(Extension(uptime))
        .layer(
            TraceLayer::new_for_http()
                .make_span_with(DefaultMakeSpan::new())
                .on_response(
                    DefaultOnResponse::new()
                        .level(tracing::Level::INFO)
                )
        )
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
        env::set_var("RUST_LOG", "ea_talent_pool=trace,ea_trident=info,tower_http=info");
    }

    tracing_subscriber::fmt()
        .with_env_filter(tracing_subscriber::EnvFilter::from_default_env())
        .init();

    let dsn = env::var("DSN").ok();
    let dsn = match dsn {
        Some(x) => x,
        None => DEFAULT_DSN.to_string(),
    };

    log::trace!("DSN = {}", dsn);

    let client_options = ClientOptions::parse(dsn)
        .await
        .map_err(ServiceError::Mongo)?;
    let client = Client::with_options(client_options).map_err(ServiceError::Mongo)?;
    let db = Arc::new(client.database(DEFAULT_DB));

    log::info!("Talent pool service is now connected to MongoDB");

    let router = router(db.clone());
    let port = env::var("PORT")
        .map(|x| x.parse::<u16>())
        .ok()
        .and_then(|x| x.ok())
        .unwrap_or(8080);

    let addr = format!("[::]:{}", port)
        .parse()
        .map_err(|_| ServiceError::DefinedError("Unable to parse socket address."))?;
    log::info!("Talent pool service is listening on {}", addr);

    let server = Server::bind(&addr)
        .serve(router.into_make_service())
        .with_graceful_shutdown(shutdown_signal());

    if let Err(e) = server.await {
        log::error!("A server error occurred: {}", e);
    }

    Ok(())
}
