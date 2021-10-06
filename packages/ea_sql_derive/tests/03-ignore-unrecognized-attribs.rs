use ea_sql_derive::{FromRow, IntoBaseEntity};
use uuid::Uuid;
use chrono::{DateTime, Utc};
use chrono::serde::ts_seconds;
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, FromRow, IntoBaseEntity)]
pub struct Account {
    pub row_num: i64,
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
    #[serde(with = "ts_seconds")]
    pub created_at: DateTime<Utc>,
    #[serde(with = "ts_seconds")]
    pub updated_at: DateTime<Utc>,
}

fn main() {}
