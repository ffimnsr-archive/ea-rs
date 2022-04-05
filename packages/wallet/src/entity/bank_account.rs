use uuid::Uuid;
use tokio_postgres::Row;
use ea_sql_derive::{FromRow, IntoBaseEntity};
use serde::{Serialize, Deserialize};

use super::{FromDt, MyriadExt, BaseEntity, MutateEntity};

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, FromRow, IntoBaseEntity)]
pub struct BankAccount {
    pub id: Uuid,
    pub user_id: Uuid,
    pub account_name: String,
    pub account_no: String,
    pub bank_address: String,
    pub bank_branch: String,
    pub bank_name: String,
    pub bank_swift_code: String,
    pub bank_routing_number: String,
}
