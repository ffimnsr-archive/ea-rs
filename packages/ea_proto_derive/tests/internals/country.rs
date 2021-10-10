use crate::pb;
use ea_core::MyriadExt;

pub struct Country;

pub struct CountryRaw {
    pub row_num: i64,
}

impl From<&Country> for pb::Country {
    fn from(_payload: &Country) -> Self {
        unimplemented!()
    }
}

impl From<Country> for pb::Country {
    fn from(_payload: Country) -> Self {
        unimplemented!()
    }
}

impl MyriadExt<CountryRaw> for pb::Country {
    fn from_vec(_data: ::std::vec::Vec<CountryRaw>) -> Vec<Self> {
        unimplemented!()
    }
}
