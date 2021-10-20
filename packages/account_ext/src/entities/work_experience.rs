use chrono::{DateTime, Utc};
use uuid::Uuid;
use ea_sql_derive::{Arbiter, FromRow, IntoBaseEntity, IntoMutateEntity, IntoProtoPayload};

#[derive(Debug, Clone, PartialEq, Arbiter, FromRow, IntoBaseEntity, IntoMutateEntity, IntoProtoPayload)]
pub struct WorkExperience {
    pub id: Uuid,

    #[ea_sql(include_in(create, update))]
    pub title: String,

    #[ea_sql(include_in(create, update))]
    pub organization: String,

    #[ea_sql(include_in(create, update))]
    pub location: String,

    #[ea_sql(include_in(create, update))]
    pub description: String,

    // #[ea_sql(include_in(create, update))]
    // pub from_date: NaiveDate,

    // #[ea_sql(include_in(create, update))]
    // pub to_date: NaiveDate,

    #[ea_sql(include_in(create, update))]
    pub user_id: Uuid,

    pub created_at: DateTime<Utc>,

    pub updated_at: DateTime<Utc>,
}
