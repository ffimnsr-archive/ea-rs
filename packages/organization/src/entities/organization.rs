
#[derive(Debug)]
pub struct Organization {
    pub id: Uuid,
    pub name: String,
    pub description: String,
    pub managed_by_id: Uuid,
    pub created_by_id: Uuid,
}
