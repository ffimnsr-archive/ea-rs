pub struct ProjectClue {
    pub id: Uuid,
    pub project_id: Uuid,
    pub requirements: String,
    pub environments: String,
    pub repository_http_url: String,
    pub repository_ssh_url: String,
}
