pub enum WithdrawalRequestStatus {
    Closed = 0,
    Pending,
    Resolved,
}

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
