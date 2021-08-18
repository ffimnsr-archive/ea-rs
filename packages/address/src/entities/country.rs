use uuid::Uuid;
use tokio_postgres::Row;
use ea_core::{MyriadExt, BaseEntity};
use ea_sql_derive::{FromRow, IntoBaseEntity};
use serde::{Serialize, Deserialize};
pub use crate::pb::Country as CountryPayload;

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, FromRow, IntoBaseEntity)]
pub struct Country {
    pub id: Uuid,
    pub name: String,
    pub alpha2: String,
    pub alpha3: String,
    pub phone_code: String,
    pub currency_code: String,
}

impl Country {
    pub fn to_payload(&self) -> CountryPayload {
        CountryPayload::from(self)
    }
}

impl From<&Country> for CountryPayload {
    fn from(payload: &Country) -> Self {
        Self {
            id: payload.id.to_string(),
            name: payload.name.clone(),
            alpha2: payload.alpha2.clone(),
            alpha3: payload.alpha3.clone(),
            phone_code: payload.phone_code.clone(),
            currency_code: payload.currency_code.clone(),
        }
    }
}

impl From<Country> for CountryPayload {
    fn from(payload: Country) -> Self {
        Self {
            id: payload.id.to_string(),
            name: payload.name.clone(),
            alpha2: payload.alpha2.clone(),
            alpha3: payload.alpha3.clone(),
            phone_code: payload.phone_code.clone(),
            currency_code: payload.currency_code.clone(),
        }
    }
}

impl MyriadExt<Country> for CountryPayload {
    fn from_vec(data: Vec<Country>) -> Vec<Self> {
        data.iter().map(Self::from).collect()
    }
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, FromRow)]
pub struct RawCountry {
    pub row_num: i64,
    pub id: Uuid,
    pub name: String,
    pub alpha2: String,
    pub alpha3: String,
    pub phone_code: String,
    pub currency_code: String,
}

impl MyriadExt<Row> for RawCountry {
    fn from_vec(data: Vec<Row>) -> Vec<Self> {
        data.iter().map(Self::from).collect()
    }
}

impl From<&RawCountry> for CountryPayload {
    fn from(payload: &RawCountry) -> Self {
        Self {
            id: payload.id.to_string(),
            name: payload.name.clone(),
            alpha2: payload.alpha2.clone(),
            alpha3: payload.alpha3.clone(),
            phone_code: payload.phone_code.clone(),
            currency_code: payload.currency_code.clone(),
        }
    }
}

impl From<RawCountry> for CountryPayload {
    fn from(payload: RawCountry) -> Self {
        Self {
            id: payload.id.to_string(),
            name: payload.name.clone(),
            alpha2: payload.alpha2.clone(),
            alpha3: payload.alpha3.clone(),
            phone_code: payload.phone_code.clone(),
            currency_code: payload.currency_code.clone(),
        }
    }
}

impl MyriadExt<RawCountry> for CountryPayload {
    fn from_vec(data: Vec<RawCountry>) -> Vec<Self> {
        data.iter().map(Self::from).collect()
    }
}
