use axum::extract::Path;
use axum::http::StatusCode;
use axum::response::IntoResponse;
use axum::routing::get;
use axum::{Extension, Json, Router};
use ea_trident::{ServiceError, ServiceResult};
use futures::stream::TryStreamExt;
use mongodb::bson::oid::ObjectId;
use mongodb::options::FindOneAndUpdateOptions;
use mongodb::Database;
use serde_json::json;
use std::collections::HashMap;
use std::str::FromStr;
use std::sync::Arc;

use mongodb::bson::doc;

use crate::entity::TalentPool;
use crate::global::*;

async fn retrieve(Extension(db): Extension<Arc<Database>>) -> ServiceResult<impl IntoResponse> {
    let collection = db.collection::<TalentPool>(DEFAULT_COLLECTION);
    let cursor = collection
        .find(None, None)
        .await
        .map_err(ServiceError::Mongo)?;
    let talent_pools = cursor
        .try_collect::<Vec<TalentPool>>()
        .await
        .map_err(ServiceError::Mongo)?;

    Ok((StatusCode::OK, Json(talent_pools)))
}

async fn create(
    Extension(db): Extension<Arc<Database>>,
    Json(talent_pool): Json<TalentPool>,
) -> ServiceResult<impl IntoResponse> {
    let collection = db.collection::<TalentPool>(DEFAULT_COLLECTION);

    let result = collection
        .insert_one(talent_pool, None)
        .await
        .map_err(ServiceError::Mongo)?;

    let object_id = result
        .inserted_id
        .as_object_id()
        .map(|x| x.to_hex())
        .ok_or(ServiceError::DefinedError("Unable to read object id"))?;

    let data = json!({
        "id": object_id,
    });

    Ok((StatusCode::CREATED, Json(data)))
}

async fn find_by_id(
    Extension(db): Extension<Arc<Database>>,
    Path(params): Path<HashMap<String, String>>,
) -> ServiceResult<impl IntoResponse> {
    let collection = db.collection::<TalentPool>(DEFAULT_COLLECTION);
    let id = params
        .get("id")
        .map(|v| ObjectId::from_str(v.as_str()))
        .ok_or(ServiceError::DefinedError("Unable to find parameter 'id'"))?
        .map_err(ServiceError::BsonOid)?;

    let mut cursor = collection
        .find(doc! { "_id": id }, None)
        .await
        .map_err(ServiceError::Mongo)?;

    let talent_pool = cursor
        .try_next()
        .await
        .map_err(ServiceError::Mongo)?
        .ok_or(ServiceError::DefinedError("Unable to create mongo record"))?;

    Ok((StatusCode::OK, Json(talent_pool)))
}

#[allow(dead_code)]
async fn find_one(
    Extension(db): Extension<Arc<Database>>,
) -> ServiceResult<impl IntoResponse> {
    let collection = db.collection::<TalentPool>(DEFAULT_COLLECTION);
    let talent_pool = collection
        .find_one(None, None)
        .await
        .map_err(ServiceError::Mongo)?
        .ok_or(ServiceError::DefinedError("Unable to find mongo record"))?;

    Ok((StatusCode::OK, Json(talent_pool)))
}

#[allow(dead_code)]
async fn find(
    Extension(db): Extension<Arc<Database>>,
) -> ServiceResult<impl IntoResponse> {
    let collection = db.collection::<TalentPool>(DEFAULT_COLLECTION);
    let cursor = collection
        .find(None, None)
        .await
        .map_err(ServiceError::Mongo)?;

    let talent_pools = cursor
        .try_collect::<Vec<TalentPool>>()
        .await
        .map_err(ServiceError::Mongo)?;

    Ok((StatusCode::OK, Json(talent_pools)))
}

async fn upsert(
    Extension(db): Extension<Arc<Database>>,
    Path(params): Path<HashMap<String, String>>,
    Json(talent_pool): Json<TalentPool>,
) -> ServiceResult<impl IntoResponse> {
    let collection = db.collection::<TalentPool>(DEFAULT_COLLECTION);
    let id = params
        .get("id")
        .map(|v| ObjectId::from_str(v.as_str()))
        .ok_or(ServiceError::DefinedError("Unable to find parameter 'id'"))?
        .map_err(ServiceError::BsonOid)?;

    let input = bson::to_bson(&talent_pool).map_err(ServiceError::BsonSer)?;

    let input = input
        .as_document()
        .ok_or(ServiceError::DefinedError("Unable to unpack document"))?
        .to_owned();

    let options = FindOneAndUpdateOptions::builder().upsert(true).build();

    let talent_pool = collection
        .find_one_and_update(doc! { "_id": id }, doc! { "$set": input }, options)
        .await
        .map_err(ServiceError::Mongo)?
        .ok_or(ServiceError::DefinedError(
            "Unable to find and update mongo record",
        ))?;

    Ok((StatusCode::OK, Json(talent_pool)))
}

async fn delete(
    Extension(db): Extension<Arc<Database>>,
    Path(params): Path<HashMap<String, String>>,
) -> ServiceResult<impl IntoResponse> {
    let collection = db.collection::<TalentPool>(DEFAULT_COLLECTION);
    let id = params
        .get("id")
        .map(|v| ObjectId::from_str(v.as_str()))
        .ok_or(ServiceError::DefinedError("Unable to find parameter 'id'"))?
        .map_err(ServiceError::BsonOid)?;

    collection
        .delete_one(doc! { "_id": id }, None)
        .await
        .map_err(ServiceError::Mongo)?;

    Ok((StatusCode::OK, ()))
}

pub fn api_router() -> Router {
    Router::new()
        .route("/", get(retrieve).post(create))
        .route("/:id",
            get(find_by_id)
                .put(upsert)
                .delete(delete))
}
