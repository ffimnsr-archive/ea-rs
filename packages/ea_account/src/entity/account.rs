use std::sync::Arc;

use axum::Json;
use chrono::{DateTime, Utc};
use ea_trident::{ServiceError, ServiceResult};
use futures::TryStreamExt;
use mongodb::{bson::oid::ObjectId, Database};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::global::*;

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Account {
    #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
    pub id: Option<ObjectId>,

    #[serde(with = "bson::serde_helpers::uuid_as_binary")]
    pub global_id: Uuid,
    pub public_code: String,
    pub username: String,
    pub avatar: String,
    pub given_name: String,
    pub family_name: String,
    pub middle_name: String,
    pub email: String,
    pub email_verified: bool,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

impl Account {
    pub async fn retrieve(db: Arc<Database>) -> ServiceResult<Vec<Self>> {
        let collection = db.collection::<Self>(DEFAULT_COLLECTION);
        let cursor = collection
            .find(None, None)
            .await
            .map_err(ServiceError::Mongo)?;

        cursor
            .try_collect::<Vec<Self>>()
            .await
            .map_err(ServiceError::Mongo)
    }

    pub async fn create(
        db: Arc<Database>,
        Json(payload): Json<Self>,
    ) -> ServiceResult<String> {
        let collection = db.collection::<Self>(DEFAULT_COLLECTION);

        let result = collection
            .insert_one(payload, None)
            .await
            .map_err(ServiceError::Mongo)?;

        result
            .inserted_id
            .as_object_id()
            .map(|x| x.to_hex())
            .ok_or(ServiceError::DefinedError("Unable to read object id"))
    }
}
