use chrono::{DateTime, Utc};
use mongodb::bson::oid::ObjectId;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct ProjectClue {
    #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
    pub id: Option<ObjectId>,
    pub project_id: Uuid,
    pub requirements: String,
    pub environments: String,
    pub repository_http_url: String,
    pub repository_ssh_url: String,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}
