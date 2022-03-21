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
pub struct WorkFunction {
    pub id: Uuid,

    #[ea_sql(include_in(create, update))]
    pub name: String,

    #[ea_sql(include_in(create, update))]
    pub description: String,

    pub created_at: DateTime<Utc>,

    pub updated_at: DateTime<Utc>,
}
