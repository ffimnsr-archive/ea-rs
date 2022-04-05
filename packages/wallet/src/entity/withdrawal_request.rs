use uuid::Uuid;
use tokio_postgres::Row;
use ea_sql_derive::{FromRow, IntoBaseEntity};
use serde::{Serialize, Deserialize};

use super::{FromDt, MyriadExt, BaseEntity, MutateEntity};

pub enum WithdrawalRequestStatus {
    Closed = 0,
    Pending,
    Resolved,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, FromRow, IntoBaseEntity)]
pub struct WithdrawalRequest {
    pub id: Uuid,
    pub user_id: Uuid,
    pub amount: f64,
    pub reference_no: String,
    pub remarks: String,
    pub approved_by_id: Uuid,
    pub approved_at: DateTime<Utc>,
    pub status: WithdrawalRequestStatus,
}
