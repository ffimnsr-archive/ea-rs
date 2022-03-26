use chrono::{DateTime, Utc};
use mongodb::bson::oid::ObjectId;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Address {
    #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
    pub id: Option<ObjectId>,

    pub address_1: String,
    pub address_2: String,
    pub city: String,
    pub state: String,
    pub postal_code: String,
    pub country_id: ObjectId,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}
