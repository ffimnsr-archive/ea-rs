//! This module is the main entrypoint for organization service.
mod entity;
mod global;

use chrono::Utc;
use ea_trident::{ServiceError, ServiceResult};
use entity::organization::Organization;
use futures::stream::TryStreamExt;
use hyper::body::Buf;
use hyper::{Body, Request, Response, Server, StatusCode};
use mongodb::bson::oid::ObjectId;
use mongodb::options::FindOneAndUpdateOptions;
use mongodb::{options::ClientOptions, Client, Database};
use routerify::prelude::*;
use routerify::{Router, RouterService};
use std::str::FromStr;
use std::time::Instant;
use std::{env, sync::Arc};

use mongodb::bson::doc;

use crate::global::*;

pub async fn retrieve(req: Request<Body>) -> ServiceResult<Response<Body>> {
    let db = req.data::<Arc<Database>>().ok_or(ERR_DB_INSTANTIATE)?;
    let collection = db.collection::<Organization>(DEFAULT_COLLECTION);
    let cursor = collection
        .find(None, None)
        .await
        .map_err(ServiceError::Mongo)?;
    let organizations = cursor
        .try_collect::<Vec<Organization>>()
        .await
        .map_err(ServiceError::Mongo)?;
    let output = serde_json::to_string(&organizations).map_err(ServiceError::SerdeJson)?;

    ea_trident::json_response(StatusCode::OK, Body::from(output))
}

pub async fn create(req: Request<Body>) -> ServiceResult<Response<Body>> {
    let db = req.data::<Arc<Database>>().ok_or(ERR_DB_INSTANTIATE)?;
    let collection = db.collection::<Organization>(DEFAULT_COLLECTION);

    let buffer = hyper::body::aggregate(req.into_body())
        .await
        .map_err(ServiceError::Hyper)?;
    let input: Organization =
        serde_json::from_slice(buffer.chunk()).map_err(ServiceError::SerdeJson)?;

    let result = collection
        .insert_one(input, None)
        .await
        .map_err(ServiceError::Mongo)?;

    let object_id = result
        .inserted_id
        .as_object_id()
        .map(|x| x.to_hex())
        .ok_or(ServiceError::DefinedError("Unable to read object id"))?;
    let data = serde_json::json!({
        "id": object_id,
    });

    ea_trident::json_response(StatusCode::CREATED, Body::from(data.to_string()))
}

pub async fn find_by_id(req: Request<Body>) -> ServiceResult<Response<Body>> {
    let db = req.data::<Arc<Database>>().ok_or(ERR_DB_INSTANTIATE)?;
    let collection = db.collection::<Organization>(DEFAULT_COLLECTION);
    let id = req
        .param("id")
        .map(|v| ObjectId::from_str(v.as_str()))
        .ok_or(ServiceError::DefinedError("Unable to find parameter 'id'"))?
        .map_err(ServiceError::BsonOid)?;

    let mut cursor = collection
        .find(doc! { "_id": id }, None)
        .await
        .map_err(ServiceError::Mongo)?;

    let output = cursor
        .try_next()
        .await
        .map(|x| serde_json::to_string(&x))
        .map_err(ServiceError::Mongo)?
        .map_err(ServiceError::SerdeJson)?;

    ea_trident::json_response(StatusCode::OK, Body::from(output))
}

pub async fn find_one(req: Request<Body>) -> ServiceResult<Response<Body>> {
    let db = req.data::<Arc<Database>>().ok_or(ERR_DB_INSTANTIATE)?;
    let collection = db.collection::<Organization>(DEFAULT_COLLECTION);
    let organization = collection
        .find_one(None, None)
        .await
        .map_err(ServiceError::Mongo)?
        .ok_or(ServiceError::DefinedError("Unable to find mongo record"))?;

    let output = serde_json::to_string(&organization).map_err(ServiceError::SerdeJson)?;

    ea_trident::json_response(StatusCode::OK, Body::from(output))
}

pub async fn find(req: Request<Body>) -> ServiceResult<Response<Body>> {
    let db = req.data::<Arc<Database>>().ok_or(ERR_DB_INSTANTIATE)?;
    let collection = db.collection::<Organization>(DEFAULT_COLLECTION);
    let cursor = collection
        .find(None, None)
        .await
        .map_err(ServiceError::Mongo)?;

    let organizations = cursor
        .try_collect::<Vec<Organization>>()
        .await
        .map_err(ServiceError::Mongo)?;
    let output = serde_json::to_string(&organizations).map_err(ServiceError::SerdeJson)?;

    ea_trident::json_response(StatusCode::OK, Body::from(output))
}

pub async fn upsert(req: Request<Body>) -> ServiceResult<Response<Body>> {
    let db = req.data::<Arc<Database>>().ok_or(ERR_DB_INSTANTIATE)?;
    let collection = db.collection::<Organization>(DEFAULT_COLLECTION);
    let id = req
        .param("id")
        .map(|v| ObjectId::from_str(v.as_str()))
        .ok_or(ServiceError::DefinedError("Unable to find parameter 'id'"))?
        .map_err(ServiceError::BsonOid)?;

    let buffer = hyper::body::aggregate(req.into_body())
        .await
        .map_err(ServiceError::Hyper)?;

    let input: Organization =
        serde_json::from_slice(buffer.chunk()).map_err(ServiceError::SerdeJson)?;

    let input = bson::to_bson(&input).map_err(ServiceError::BsonSer)?;

    let input = input
        .as_document()
        .ok_or(ServiceError::DefinedError("Unable to unpack document"))?
        .to_owned();

    let options = FindOneAndUpdateOptions::builder().upsert(true).build();

    let organization = collection
        .find_one_and_update(doc! { "_id": id }, doc! { "$set": input }, options)
        .await
        .map_err(ServiceError::Mongo)?
        .ok_or(ServiceError::DefinedError(
            "Unable to find and update mongo record",
        ))?;

    let output = serde_json::to_string(&organization).map_err(ServiceError::SerdeJson)?;

    ea_trident::json_response(StatusCode::OK, Body::from(output))
}

pub async fn delete(req: Request<Body>) -> ServiceResult<Response<Body>> {
    let db = req.data::<Arc<Database>>().ok_or(ERR_DB_INSTANTIATE)?;
    let collection = db.collection::<Organization>(DEFAULT_COLLECTION);
    let id = req
        .param("id")
        .map(|v| ObjectId::from_str(v.as_str()))
        .ok_or(ServiceError::DefinedError("Unable to find parameter 'id'"))?
        .map_err(ServiceError::BsonOid)?;

    collection
        .delete_one(doc! { "_id": id }, None)
        .await
        .map_err(ServiceError::Mongo)?;

    ea_trident::json_response(StatusCode::OK, Body::empty())
}

pub async fn health(req: Request<Body>) -> ServiceResult<Response<Body>> {
    let uptime = req.data::<Arc<Instant>>().ok_or(ERR_UPTIME_INSTANTIATE)?;
    let health_check = serde_json::json!({
        "uptime": uptime.elapsed(),
        "message": "ok",
        "timestamp": Utc::now().timestamp(),
    });

    ea_trident::json_response(StatusCode::OK, Body::from(health_check.to_string()))
}

fn api_router() -> ServiceResult<Router<Body, ServiceError>> {
    Router::<Body, ServiceError>::builder()
        .get("/", retrieve)
        .post("/", create)
        .get("/:id", find_by_id)
        .put("/:id", upsert)
        .delete("/:id", delete)
        .build()
        .map_err(|_| ServiceError::DefinedError("Unable to build api router"))
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
        .scope("/api/organizations", api_router()?)
        .get("/health", health)
        .any(ea_trident::handler_404)
        .err_handler(ea_trident::error_handler)
        .build()
        .map_err(|_| ServiceError::DefinedError("Unable to build root router"))
}

#[tokio::main]
async fn main() -> ServiceResult<()> {
    dotenv::dotenv().ok();

    if env::var("RUST_LOG").is_err() {
        env::set_var("RUST_LOG", "ea_organization=trace,ea_trident=trace");
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

    let addr = ([0, 0, 0, 0], 8013).into();
    log::info!("Organization service is listening on {}", addr);

    let server = Server::bind(&addr).serve(service);

    if let Err(e) = server.await {
        log::error!("A server error occurred: {}", e);
    }

    Ok(())
}
