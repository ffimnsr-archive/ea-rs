use chrono::{DateTime, Utc};
use uuid::Uuid;
use ea_sql_derive::{Arbiter, FromRow, IntoBaseEntity, IntoMutateEntity, IntoProtoPayload};

#[derive(Debug, Clone, PartialEq, Arbiter, FromRow, IntoBaseEntity, IntoMutateEntity, IntoProtoPayload)]
pub struct Address {
    pub id: Uuid,

    #[ea_sql(include_in(create, update))]
    pub address_1: String,

    #[ea_sql(include_in(create, update))]
    pub address_2: String,

    #[ea_sql(include_in(create, update))]
    pub city: String,

    #[ea_sql(include_in(create, update))]
    pub state: String,

    #[ea_sql(include_in(create, update))]
    pub postal_code: String,

    #[ea_sql(include_in(create, update))]
    pub country_id: Uuid,

    pub created_at: DateTime<Utc>,

    pub updated_at: DateTime<Utc>,
}
