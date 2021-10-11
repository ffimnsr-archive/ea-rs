use chrono::{DateTime, Utc};
use uuid::Uuid;
use ea_sql_derive::{Arbiter, FromRow, IntoBaseEntity, IntoMutateEntity, IntoProtoPayload};

#[derive(Debug, Clone, PartialEq, Arbiter, FromRow, IntoBaseEntity, IntoMutateEntity, IntoProtoPayload)]
pub struct Country {
    pub id: Uuid,

    #[ea_sql(include_in(create, update))]
    pub name: String,

    #[ea_sql(include_in(create, update))]
    pub alpha2: String,

    #[ea_sql(include_in(create, update))]
    pub alpha3: String,

    #[ea_sql(include_in(create, update))]
    pub phone_code: String,

    #[ea_sql(include_in(create, update))]
    pub currency_code: String,

    pub created_at: DateTime<Utc>,

    pub updated_at: DateTime<Utc>,
}
