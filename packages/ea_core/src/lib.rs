use chrono::{DateTime, Utc};
use prost_types::Timestamp;
use std::borrow::Cow;

pub mod db;
pub mod token;

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

pub trait MutateEntity {
    fn get_required_create_fields() -> Cow<'static, str> {
        let fields = Self::get_required_create_fields_arr();
        fields.join(", ").into()
    }

    fn get_required_create_fields_arr() -> Vec<String>;

    fn create_field_count() -> usize {
        Self::get_required_create_fields_arr().len()
    }

    fn get_required_update_fields() -> Cow<'static, str> {
        let fields = Self::get_required_update_fields_arr();
        fields.join(", ").into()
    }

    fn get_required_update_fields_arr() -> Vec<String>;

    fn update_field_count() -> usize {
        Self::get_required_update_fields_arr().len()
    }
}


#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        assert_eq!(2 + 2, 4);
    }
}
