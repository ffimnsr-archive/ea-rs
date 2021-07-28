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

use crate::entity::Account;
use crate::global::*;

#[axum_macros::debug_handler]
async fn retrieve(
    Extension(db): Extension<Arc<Database>>,
) -> ServiceResult<impl IntoResponse> {
    let accounts = Account::retrieve(db).await?;
    Ok((StatusCode::OK, Json(accounts)))
}

async fn create(
    Extension(db): Extension<Arc<Database>>,
    account: Json<Account>,
) -> ServiceResult<impl IntoResponse> {
    let object_id = Account::create(db, account).await?;
    let data = json!({
        "id": object_id,
    });

    Ok((StatusCode::CREATED, Json(data)))
}

async fn find_by_id(
    Extension(db): Extension<Arc<Database>>,
    Path(params): Path<HashMap<String, String>>,
) -> ServiceResult<impl IntoResponse> {
    let collection = db.collection::<Account>(DEFAULT_COLLECTION);
    let id = params
        .get("id")
        .map(|v| ObjectId::from_str(v.as_str()))
        .ok_or(ServiceError::DefinedError("Unable to find parameter 'id'"))?
        .map_err(ServiceError::BsonOid)?;

    let mut cursor = collection
        .find(doc! { "_id": id }, None)
        .await
        .map_err(ServiceError::Mongo)?;

    let account = cursor
        .try_next()
        .await
        .map_err(ServiceError::Mongo)?
        .ok_or(ServiceError::DefinedError("Unable to create mongo record"))?;

    Ok((StatusCode::OK, Json(account)))
}

#[allow(dead_code)]
async fn find_one(
    Extension(db): Extension<Arc<Database>>,
) -> ServiceResult<impl IntoResponse> {
    let collection = db.collection::<Account>(DEFAULT_COLLECTION);
    let account = collection
        .find_one(None, None)
        .await
        .map_err(ServiceError::Mongo)?
        .ok_or(ServiceError::DefinedError("Unable to find mongo record"))?;

    Ok((StatusCode::OK, Json(account)))
}

#[allow(dead_code)]
async fn find(
    Extension(db): Extension<Arc<Database>>,
) -> ServiceResult<impl IntoResponse> {
    let collection = db.collection::<Account>(DEFAULT_COLLECTION);
    let cursor = collection
        .find(None, None)
        .await
        .map_err(ServiceError::Mongo)?;

    let accounts = cursor
        .try_collect::<Vec<Account>>()
        .await
        .map_err(ServiceError::Mongo)?;

    Ok((StatusCode::OK, Json(accounts)))
}

async fn upsert(
    Extension(db): Extension<Arc<Database>>,
    Path(params): Path<HashMap<String, String>>,
    Json(account): Json<Account>,
) -> ServiceResult<impl IntoResponse> {
    let collection = db.collection::<Account>(DEFAULT_COLLECTION);
    let id = params
        .get("id")
        .map(|v| ObjectId::from_str(v.as_str()))
        .ok_or(ServiceError::DefinedError("Unable to find parameter 'id'"))?
        .map_err(ServiceError::BsonOid)?;

    let input = bson::to_bson(&account).map_err(ServiceError::BsonSer)?;

    let input = input
        .as_document()
        .ok_or(ServiceError::DefinedError("Unable to unpack document"))?
        .to_owned();

    let options = FindOneAndUpdateOptions::builder().upsert(true).build();

    let account = collection
        .find_one_and_update(doc! { "_id": id }, doc! { "$set": input }, options)
        .await
        .map_err(ServiceError::Mongo)?
        .ok_or(ServiceError::DefinedError(
            "Unable to find and update mongo record",
        ))?;

    Ok((StatusCode::OK, Json(account)))
}

// async fn delete(Extension(db): Extension<Arc<Database>>, Path(params): Path<HashMap<String, String>>) -> ServiceResult<impl IntoResponse> {
//     let collection = db.collection::<Account>(DEFAULT_COLLECTION);
//     let id = params.get("id")
//         .map(|v| ObjectId::from_str(v.as_str()))
//         .ok_or(ServiceError::DefinedError("Unable to find parameter 'id'"))?
//         .map_err(ServiceError::BsonOid)?;

//     collection
//         .delete_one(doc! { "_id": id }, None)
//         .await
//         .map_err(ServiceError::Mongo)?;

//     Ok((StatusCode::OK, ()))
// }

pub fn api_router() -> Router {
    Router::new().route("/", get(retrieve).post(create)).route(
        "/:id",
        get(find_by_id).put(upsert), // .delete(delete)
    )
}
