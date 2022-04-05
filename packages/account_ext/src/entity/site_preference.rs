use chrono::{DateTime, Utc};
use ea_sql_derive::{
    Arbiter, FromRow, IntoBaseEntity, IntoMutateEntity, IntoProtoPayload,
};
use uuid::Uuid;

#[derive(
    Debug,
    Clone,
    PartialEq,
    Arbiter,
    FromRow,
    IntoBaseEntity,
    IntoMutateEntity,
    IntoProtoPayload,
)]
pub struct SitePreference {
    pub id: Uuid,

    #[ea_sql(include_in(create, update))]
    pub is_opt_in_marketing: bool,

    #[ea_sql(include_in(create, update))]
    pub is_opt_in_usage_statistics: bool,

    #[ea_sql(include_in(create, update))]
    pub is_opt_in_experimental: bool,

    #[ea_sql(include_in(create, update))]
    pub user_id: Uuid,

    pub created_at: DateTime<Utc>,

    pub updated_at: DateTime<Utc>,
}
