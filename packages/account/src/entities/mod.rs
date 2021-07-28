use chrono::{DateTime, Utc};
use prost_types::Timestamp;
use std::borrow::Cow;

pub mod account;

pub trait FromDt: Sized {
    fn from_utc(dt: DateTime<Utc>) -> Self;
}

impl FromDt for Timestamp {
    fn from_utc(dt: DateTime<Utc>) -> Self {
        Timestamp {
            seconds: dt.timestamp(),
            nanos: dt.timestamp_subsec_nanos() as i32
        }
    }
}

pub trait MyriadExt<T>: Sized {
    fn from_vec(data: Vec<T>) -> Vec<Self>;
}

pub trait BaseEntity {
    fn get_table_name() -> Cow<'static, str>;
    fn get_required_fields() -> Cow<'static, str>;
    fn get_required_fields_arr() -> Vec<String>;
    fn field_count() -> usize;
}
