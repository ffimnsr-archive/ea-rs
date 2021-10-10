use ea_proto_derive::ProtoAccessors;
use ea_core::DbResult;

use ea_core::MyriadExt;

pub mod pb {
    tonic::include_proto!("ea");
}

struct Account;

struct AccountRaw {
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

#[derive(ProtoAccessors)]
#[ea_proto(name = "Account")]
pub struct CoreImpl;

impl CoreImpl {
    async fn count_account_entries(&self) -> DbResult<i64> {
        unimplemented!()
    }

    async fn list_accounts(&self, _data: &pb::ListAccountsRequest, _page_size: i64) -> DbResult<Vec<AccountRaw>> {
        unimplemented!()
    }

    async fn get_account(&self, _data: &pb::GetAccountRequest) -> DbResult<Account> {
        unimplemented!()
    }

    async fn create_account(&self, _data: &pb::CreateAccountRequest) -> DbResult<Account> {
        unimplemented!()
    }

    async fn soft_delete_account(&self, _data: &pb::DeleteAccountRequest) -> DbResult<Account> {
        unimplemented!()
    }

    async fn update_account(&self, _data: &pb::UpdateAccountRequest) -> DbResult<Account> {
        unimplemented!()
    }
}

fn main() {}
