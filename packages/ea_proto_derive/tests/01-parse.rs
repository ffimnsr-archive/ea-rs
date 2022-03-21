mod internals;

pub mod pb {
    tonic::include_proto!("ea");
}

use ea_core::DbResult;
use ea_proto_derive::ProtoAccessors;
use internals::{Account, AccountRaw};

#[derive(ProtoAccessors)]
#[ea_proto(name("Account"))]
pub struct CoreImpl;

impl CoreImpl {
    async fn count_account_entries(&self) -> DbResult<i64> {
        unimplemented!()
    }

    async fn list_accounts(
        &self,
        _data: &pb::ListAccountsRequest,
        _page_size: i64,
    ) -> DbResult<Vec<AccountRaw>> {
        unimplemented!()
    }

    async fn get_account(&self, _data: &pb::GetAccountRequest) -> DbResult<Account> {
        unimplemented!()
    }

    async fn create_account(
        &self,
        _data: &pb::CreateAccountRequest,
    ) -> DbResult<Account> {
        unimplemented!()
    }

    async fn soft_delete_account(
        &self,
        _data: &pb::DeleteAccountRequest,
    ) -> DbResult<Account> {
        unimplemented!()
    }

    async fn update_account(
        &self,
        _data: &pb::UpdateAccountRequest,
    ) -> DbResult<Account> {
        unimplemented!()
    }
}

fn main() {}
