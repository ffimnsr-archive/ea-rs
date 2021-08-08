pub struct ProjectMember {
    pub id: Uuid,
    pub user_id: Uuid,
    pub project_id: Uuid,
    pub work_function_id: Uuid,
    pub start_date: NaiveDate,
    pub end_date: NaiveDate,
    pub status: i32,
    pub remarks: String,
}
