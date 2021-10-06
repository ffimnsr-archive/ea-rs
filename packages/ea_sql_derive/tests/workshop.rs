use ea_sql_derive::{FromRow, IntoBaseEntity, IntoMutateEntity, IntoProtoPayload};
use uuid::Uuid;
use chrono::{DateTime, Utc};

mod pb {
    pub struct Account {
        pub id: String,
        pub global_id: String,
        pub public_code: String,
        pub username: String,
        pub avatar: String,
        pub given_name: String,
        pub family_name: String,
        pub middle_name: String,
        pub email: String,
        pub email_verified: bool,
        pub created_at: Option<prost_types::Timestamp>,
        pub updated_at: Option<prost_types::Timestamp>,
    }
}

#[derive(Debug, FromRow, IntoBaseEntity, IntoMutateEntity, IntoProtoPayload)]
pub struct Account {
    pub id: Uuid,

    #[ea_sql(include_in(create, update))]
    pub global_id: Uuid,

    #[ea_sql(include_in(create, update))]
    pub public_code: String,

    #[ea_sql(include_in(create, update))]
    pub username: String,

    #[ea_sql(include_in(create, update))]
    pub avatar: String,

    #[ea_sql(include_in(create, update))]
    pub given_name: String,

    #[ea_sql(include_in(create, update))]
    pub family_name: String,

    #[ea_sql(include_in(create, update))]
    pub middle_name: String,

    #[ea_sql(include_in(create, update))]
    pub email: String,

    #[ea_sql(include_in(update))]
    pub email_verified: bool,

    // #[serde(with = "ts_seconds")]
    pub created_at: DateTime<Utc>,

    // #[serde(with = "ts_seconds")]
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, FromRow, IntoProtoPayload)]
pub struct AccountRaw {
    pub row_num: i64,
    pub id: Uuid,
    pub global_id: Uuid,
    pub public_code: String,
    pub username: String,
    pub avatar: String,
    pub given_name: String,
    pub family_name: String,
    pub middle_name: String,
    pub email: String,
    pub email_verified: bool,
    // #[serde(with = "ts_seconds")]
    pub created_at: DateTime<Utc>,
    // #[serde(with = "ts_seconds")]
    pub updated_at: DateTime<Utc>,
}

fn main() {}
