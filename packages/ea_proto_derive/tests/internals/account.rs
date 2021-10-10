use crate::pb;
use ea_core::MyriadExt;

pub struct Account;

pub struct AccountRaw {
    pub row_num: i64,
}

impl From<&Account> for pb::Account {
    fn from(_payload: &Account) -> Self {
        unimplemented!()
    }
}

impl From<Account> for pb::Account {
    fn from(_payload: Account) -> Self {
        unimplemented!()
    }
}

impl MyriadExt<AccountRaw> for pb::Account {
    fn from_vec(_data: ::std::vec::Vec<AccountRaw>) -> Vec<Self> {
        unimplemented!()
    }
}
