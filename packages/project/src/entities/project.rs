
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, FromRow, IntoBaseEntity)]
pub struct Project {
    pub id: Uuid,
    pub public_code: String,
    pub name: String,
    pub description: String,
    pub parent_organization_id: Uuid,
    pub managed_by_id: Uuid,
    pub created_by_id: Uuid,
    #[serde(with = "ts_seconds")]
    pub created_at: DateTime<Utc>,
    #[serde(with = "ts_seconds")]
    pub updated_at: DateTime<Utc>,
}
