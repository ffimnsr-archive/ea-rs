mod internals;

pub mod pb {
    tonic::include_proto!("ea");
}

use ea_proto_derive::ProtoAccessors;
use ea_core::DbResult;
use internals::{Account, AccountRaw, Country, CountryRaw};

#[derive(ProtoAccessors)]
#[ea_proto(name("Account", "Country"))]
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

    async fn count_country_entries(&self) -> DbResult<i64> {
        unimplemented!()
    }

    async fn list_countries(&self, _data: &pb::ListCountriesRequest, _page_size: i64) -> DbResult<Vec<CountryRaw>> {
        unimplemented!()
    }

    async fn get_country(&self, _data: &pb::GetCountryRequest) -> DbResult<Country> {
        unimplemented!()
    }

    async fn create_country(&self, _data: &pb::CreateCountryRequest) -> DbResult<Country> {
        unimplemented!()
    }

    async fn soft_delete_country(&self, _data: &pb::DeleteCountryRequest) -> DbResult<Country> {
        unimplemented!()
    }

    async fn update_country(&self, _data: &pb::UpdateCountryRequest) -> DbResult<Country> {
        unimplemented!()
    }
}

fn main() {}
