use chrono::{DateTime, Utc};
use chrono::serde::ts_seconds;
use uuid::Uuid;
use serde::{Serialize, Deserialize};
use prost_types::Timestamp;
use tokio_postgres::Row;
use ea_core::{FromDt, MyriadExt, BaseEntity, MutateEntity};
use ea_sql_derive::{FromRow, IntoBaseEntity};
pub use crate::pb::Account as AccountPayload;

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, FromRow, IntoBaseEntity)]
pub struct Account {
    pub id: Uuid,
    pub global_id: Uuid,
    pub public_code: String,
    pub username: String,
    pub avatar: String,
    pub given_name: String,
    pub family_name: String,
    pub middle_name: String,
    pub email: String,
    pub email_verified: bool,
    #[serde(with = "ts_seconds")]
    pub created_at: DateTime<Utc>,
    #[serde(with = "ts_seconds")]
    pub updated_at: DateTime<Utc>,
}

impl Account {
    pub fn to_payload(&self) -> AccountPayload {
        AccountPayload::from(self)
    }
}

impl MutateEntity for Account {
    fn get_required_create_fields_arr() -> Vec<String> {
        let fields = [
            "global_id",
            "public_code",
            "username",
            "avatar",
            "given_name",
            "family_name",
            "middle_name",
            "email",
        ];

        fields.iter().map(|s| s.to_string()).collect()
    }

    fn get_required_update_fields_arr() -> Vec<String> {
        let fields = [
            "global_id",
            "public_code",
            "username",
            "avatar",
            "given_name",
            "family_name",
            "middle_name",
            "email",
            "email_verified",
        ];

        fields.iter().map(|s| s.to_string()).collect()
    }
}

impl From<&Account> for AccountPayload {
    fn from(payload: &Account) -> Self {
        Self {
            id: payload.id.to_string(),
            global_id: payload.global_id.to_string(),
            public_code: payload.public_code.clone(),
            username: payload.username.clone(),
            avatar: payload.avatar.clone(),
            given_name: payload.given_name.clone(),
            family_name: payload.family_name.clone(),
            middle_name: payload.middle_name.clone(),
            email: payload.email.clone(),
            email_verified: payload.email_verified,
            created_at: Some(Timestamp::from_utc(payload.created_at)),
            updated_at: Some(Timestamp::from_utc(payload.updated_at)),
        }
    }
}

impl From<Account> for AccountPayload {
    fn from(payload: Account) -> Self {
        Self {
            id: payload.id.to_string(),
            global_id: payload.global_id.to_string(),
            public_code: payload.public_code.clone(),
            username: payload.username.clone(),
            avatar: payload.avatar.clone(),
            given_name: payload.given_name.clone(),
            family_name: payload.family_name.clone(),
            middle_name: payload.middle_name.clone(),
            email: payload.email.clone(),
            email_verified: payload.email_verified,
            created_at: Some(Timestamp::from_utc(payload.created_at)),
            updated_at: Some(Timestamp::from_utc(payload.updated_at)),
        }
    }
}

impl MyriadExt<Account> for AccountPayload {
    fn from_vec(data: Vec<Account>) -> Vec<Self> {
        data.iter().map(Self::from).collect()
    }
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, FromRow)]
pub struct RawAccount {
    pub row_num: i64,
    pub id: Uuid,
    pub global_id: Uuid,
    pub public_code: String,
    pub username: String,
    pub avatar: String,
    pub given_name: String,
    pub family_name: String,
    pub middle_name: String,
    pub email: String,
    pub email_verified: bool,
    #[serde(with = "ts_seconds")]
    pub created_at: DateTime<Utc>,
    #[serde(with = "ts_seconds")]
    pub updated_at: DateTime<Utc>,
}

impl MyriadExt<Row> for RawAccount {
    fn from_vec(data: Vec<Row>) -> Vec<Self> {
        data.iter().map(Self::from).collect()
    }
}

impl From<&RawAccount> for AccountPayload {
    fn from(payload: &RawAccount) -> Self {
        Self {
            id: payload.id.to_string(),
            global_id: payload.global_id.to_string(),
            public_code: payload.public_code.clone(),
            username: payload.username.clone(),
            avatar: payload.avatar.clone(),
            given_name: payload.given_name.clone(),
            family_name: payload.family_name.clone(),
            middle_name: payload.middle_name.clone(),
            email: payload.email.clone(),
            email_verified: payload.email_verified,
            created_at: Some(Timestamp::from_utc(payload.created_at)),
            updated_at: Some(Timestamp::from_utc(payload.updated_at)),
        }
    }
}

impl From<RawAccount> for AccountPayload {
    fn from(payload: RawAccount) -> Self {
        Self {
            id: payload.id.to_string(),
            global_id: payload.global_id.to_string(),
            public_code: payload.public_code.clone(),
            username: payload.username.clone(),
            avatar: payload.avatar.clone(),
            given_name: payload.given_name.clone(),
            family_name: payload.family_name.clone(),
            middle_name: payload.middle_name.clone(),
            email: payload.email.clone(),
            email_verified: payload.email_verified,
            created_at: Some(Timestamp::from_utc(payload.created_at)),
            updated_at: Some(Timestamp::from_utc(payload.updated_at)),
        }
    }
}

impl MyriadExt<RawAccount> for AccountPayload {
    fn from_vec(data: Vec<RawAccount>) -> Vec<Self> {
        data.iter().map(Self::from).collect()
    }
}
