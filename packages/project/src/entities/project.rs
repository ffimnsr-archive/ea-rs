
#[derive(Debug)]
pub struct Project {
    pub id: Uuid,
    pub public_code: String,
    pub name: String,
    pub description: String,
    pub parent_organization_id: Uuid,
    pub managed_by_id: Uuid,
    pub created_by_id: Uuid,
}
