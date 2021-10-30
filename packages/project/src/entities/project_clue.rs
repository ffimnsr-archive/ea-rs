
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, FromRow, IntoBaseEntity)]
pub struct ProjectClue {
    pub id: Uuid,
    pub project_id: Uuid,
    pub requirements: String,
    pub environments: String,
    pub repository_http_url: String,
    pub repository_ssh_url: String,
    #[serde(with = "ts_seconds")]
    pub created_at: DateTime<Utc>,
    #[serde(with = "ts_seconds")]
    pub updated_at: DateTime<Utc>,
}
