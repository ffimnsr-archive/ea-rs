pub struct WorkExperience {
    pub id: Uuid,
    pub user_id: Uuid,
    pub title: String,
    pub organization: String,
    pub location: String,
    pub from_date: NaiveDate,
    pub to_date: NaiveDate,
    pub description: String,
}
