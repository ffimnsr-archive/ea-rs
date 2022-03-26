use ea_trident::{ServiceError, ServiceResult};

use futures::stream::TryStreamExt;
use hyper::body::Buf;
use hyper::{Body, Request, Response, StatusCode};
use mongodb::bson::oid::ObjectId;
use mongodb::options::FindOneAndUpdateOptions;
use mongodb::Database;
use routerify::prelude::*;
use routerify::Router;
use std::str::FromStr;
use std::sync::Arc;

use mongodb::bson::doc;

use crate::entity::Address;
use crate::global::*;

async fn retrieve(req: Request<Body>) -> ServiceResult<Response<Body>> {
    let db = req.data::<Arc<Database>>().ok_or(ERR_DB_INSTANTIATE)?;
    let collection = db.collection::<Address>(DEFAULT_COLLECTION);
    let cursor = collection
        .find(None, None)
        .await
        .map_err(ServiceError::Mongo)?;
    let addresses = cursor
        .try_collect::<Vec<Address>>()
        .await
        .map_err(ServiceError::Mongo)?;
    let output = serde_json::to_string(&addresses).map_err(ServiceError::SerdeJson)?;

    ea_trident::json_response(StatusCode::OK, Body::from(output))
}

async fn create(req: Request<Body>) -> ServiceResult<Response<Body>> {
    let db = req.data::<Arc<Database>>().ok_or(ERR_DB_INSTANTIATE)?;
    let collection = db.collection::<Address>(DEFAULT_COLLECTION);

    let buffer = hyper::body::aggregate(req.into_body())
        .await
        .map_err(ServiceError::Hyper)?;
    let input: Address =
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

async fn find_by_id(req: Request<Body>) -> ServiceResult<Response<Body>> {
    let db = req.data::<Arc<Database>>().ok_or(ERR_DB_INSTANTIATE)?;
    let collection = db.collection::<Address>(DEFAULT_COLLECTION);
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

#[allow(dead_code)]
async fn find_one(req: Request<Body>) -> ServiceResult<Response<Body>> {
    let db = req.data::<Arc<Database>>().ok_or(ERR_DB_INSTANTIATE)?;
    let collection = db.collection::<Address>(DEFAULT_COLLECTION);
    let address = collection
        .find_one(None, None)
        .await
        .map_err(ServiceError::Mongo)?
        .ok_or(ServiceError::DefinedError("Unable to find mongo record"))?;

    let output = serde_json::to_string(&address).map_err(ServiceError::SerdeJson)?;

    ea_trident::json_response(StatusCode::OK, Body::from(output))
}

#[allow(dead_code)]
async fn find(req: Request<Body>) -> ServiceResult<Response<Body>> {
    let db = req.data::<Arc<Database>>().ok_or(ERR_DB_INSTANTIATE)?;
    let collection = db.collection::<Address>(DEFAULT_COLLECTION);
    let cursor = collection
        .find(None, None)
        .await
        .map_err(ServiceError::Mongo)?;

    let addresses = cursor
        .try_collect::<Vec<Address>>()
        .await
        .map_err(ServiceError::Mongo)?;
    let output = serde_json::to_string(&addresses).map_err(ServiceError::SerdeJson)?;

    ea_trident::json_response(StatusCode::OK, Body::from(output))
}

async fn upsert(req: Request<Body>) -> ServiceResult<Response<Body>> {
    let db = req.data::<Arc<Database>>().ok_or(ERR_DB_INSTANTIATE)?;
    let collection = db.collection::<Address>(DEFAULT_COLLECTION);
    let id = req
        .param("id")
        .map(|v| ObjectId::from_str(v.as_str()))
        .ok_or(ServiceError::DefinedError("Unable to find parameter 'id'"))?
        .map_err(ServiceError::BsonOid)?;

    let buffer = hyper::body::aggregate(req.into_body())
        .await
        .map_err(ServiceError::Hyper)?;

    let input: Address =
        serde_json::from_slice(buffer.chunk()).map_err(ServiceError::SerdeJson)?;

    let input = bson::to_bson(&input).map_err(ServiceError::BsonSer)?;

    let input = input
        .as_document()
        .ok_or(ServiceError::DefinedError("Unable to unpack document"))?
        .to_owned();

    let options = FindOneAndUpdateOptions::builder().upsert(true).build();

    let address = collection
        .find_one_and_update(doc! { "_id": id }, doc! { "$set": input }, options)
        .await
        .map_err(ServiceError::Mongo)?
        .ok_or(ServiceError::DefinedError(
            "Unable to find and update mongo record",
        ))?;

    let output = serde_json::to_string(&address).map_err(ServiceError::SerdeJson)?;

    ea_trident::json_response(StatusCode::OK, Body::from(output))
}

async fn delete(req: Request<Body>) -> ServiceResult<Response<Body>> {
    let db = req.data::<Arc<Database>>().ok_or(ERR_DB_INSTANTIATE)?;
    let collection = db.collection::<Address>(DEFAULT_COLLECTION);
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

pub fn api_router() -> ServiceResult<Router<Body, ServiceError>> {
    Router::<Body, ServiceError>::builder()
        .get("/", retrieve)
        .post("/", create)
        .get("/:id", find_by_id)
        .put("/:id", upsert)
        .delete("/:id", delete)
        .build()
        .map_err(|_| ServiceError::DefinedError("Unable to build api router"))
}
