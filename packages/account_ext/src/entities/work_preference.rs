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
pub struct WorkPreference {
    pub id: Uuid,

    #[ea_sql(include_in(create, update))]
    pub user_id: Uuid,

    #[ea_sql(include_in(create, update))]
    pub work_function_id: Uuid,

    pub created_at: DateTime<Utc>,

    pub updated_at: DateTime<Utc>,
}
