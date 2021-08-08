pub struct SitePreference {
    pub id: Uuid,
    pub user_id: Uuid,
    pub is_opt_in_marketing: bool,
    pub is_opt_in_usage_statistics: bool,
    pub is_opt_in_experimental: bool,
}
