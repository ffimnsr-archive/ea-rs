use ea_sql_derive::{FromRow, IntoBaseEntity};
use uuid::Uuid;

#[derive(FromRow, IntoBaseEntity)]
pub struct Account {
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
}

fn main() {}
