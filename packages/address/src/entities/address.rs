use chrono::{DateTime, Utc};
use chrono::serde::ts_seconds;
use uuid::Uuid;
use serde::{Serialize, Deserialize};
use prost_types::Timestamp;
use tokio_postgres::Row;
use ea_core::{FromDt, MyriadExt, BaseEntity, MutateEntity};
use ea_sql_derive::{FromRow, IntoBaseEntity};
pub use crate::pb::Address as AddressPayload;

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, FromRow, IntoBaseEntity)]
pub struct Address {
    pub id: Uuid,
    pub address_1: String,
    pub address_2: String,
    pub city: String,
    pub state: String,
    pub country: String,
    pub postal_code: String,
    #[serde(with = "ts_seconds")]
    pub created_at: DateTime<Utc>,
    #[serde(with = "ts_seconds")]
    pub updated_at: DateTime<Utc>,
}

impl Address {
    pub fn to_payload(&self) -> AddressPayload {
        AddressPayload::from(self)
    }
}

impl MutateEntity for Address {
    fn get_required_create_fields_arr() -> Vec<String> {
        let fields = [
            "address_1",
            "address_2",
            "city",
            "state",
            "country",
            "postal_code",
        ];

        fields.iter().map(|s| s.to_string()).collect()
    }

    fn get_required_update_fields_arr() -> Vec<String> {
        let fields = [
            "address_1",
            "address_2",
            "city",
            "state",
            "country",
            "postal_code",
        ];

        fields.iter().map(|s| s.to_string()).collect()
    }
}

impl From<&Address> for AddressPayload {
    fn from(payload: &Address) -> Self {
        Self {
            id: payload.id.to_string(),
            address_1: payload.address_1.clone(),
            address_2: payload.address_2.clone(),
            city: payload.city.clone(),
            state: payload.state.clone(),
            country: payload.country.clone(),
            postal_code: payload.postal_code.clone(),
            created_at: Some(Timestamp::from_utc(payload.created_at)),
            updated_at: Some(Timestamp::from_utc(payload.updated_at)),
        }
    }
}

impl From<Address> for AddressPayload {
    fn from(payload: Address) -> Self {
        Self {
            id: payload.id.to_string(),
            address_1: payload.address_1.clone(),
            address_2: payload.address_2.clone(),
            city: payload.city.clone(),
            state: payload.state.clone(),
            country: payload.country.clone(),
            postal_code: payload.postal_code.clone(),
            created_at: Some(Timestamp::from_utc(payload.created_at)),
            updated_at: Some(Timestamp::from_utc(payload.updated_at)),
        }
    }
}

impl MyriadExt<Address> for AddressPayload {
    fn from_vec(data: Vec<Address>) -> Vec<Self> {
        data.iter().map(Self::from).collect()
    }
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, FromRow)]
pub struct RawAddress {
    pub row_num: i64,
    pub id: Uuid,
    pub address_1: String,
    pub address_2: String,
    pub city: String,
    pub state: String,
    pub country: String,
    pub postal_code: String,
    #[serde(with = "ts_seconds")]
    pub created_at: DateTime<Utc>,
    #[serde(with = "ts_seconds")]
    pub updated_at: DateTime<Utc>,
}

impl MyriadExt<Row> for RawAddress {
    fn from_vec(data: Vec<Row>) -> Vec<Self> {
        data.iter().map(Self::from).collect()
    }
}

impl From<&RawAddress> for AddressPayload {
    fn from(payload: &RawAddress) -> Self {
        Self {
            id: payload.id.to_string(),
            address_1: payload.address_1.clone(),
            address_2: payload.address_2.clone(),
            city: payload.city.clone(),
            state: payload.state.clone(),
            country: payload.country.clone(),
            postal_code: payload.postal_code.clone(),
            created_at: Some(Timestamp::from_utc(payload.created_at)),
            updated_at: Some(Timestamp::from_utc(payload.updated_at)),
        }
    }
}

impl From<RawAddress> for AddressPayload {
    fn from(payload: RawAddress) -> Self {
        Self {
            id: payload.id.to_string(),
            address_1: payload.address_1.clone(),
            address_2: payload.address_2.clone(),
            city: payload.city.clone(),
            state: payload.state.clone(),
            country: payload.country.clone(),
            postal_code: payload.postal_code.clone(),
            created_at: Some(Timestamp::from_utc(payload.created_at)),
            updated_at: Some(Timestamp::from_utc(payload.updated_at)),
        }
    }
}

impl MyriadExt<RawAddress> for AddressPayload {
    fn from_vec(data: Vec<RawAddress>) -> Vec<Self> {
        data.iter().map(Self::from).collect()
    }
}
