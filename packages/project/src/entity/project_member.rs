use chrono::{DateTime, Utc};
use mongodb::bson::oid::ObjectId;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct ProjectMember {
    #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
    pub id: Option<ObjectId>,
    pub user_id: Uuid,
    pub project_id: Uuid,
    pub work_function_id: Uuid,
    pub start_date: NaiveDate,
    pub end_date: NaiveDate,
    pub status: i32,
    pub remarks: String,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}
