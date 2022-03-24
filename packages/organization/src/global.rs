use ea_trident::ServiceError;

pub const DEFAULT_DB_URI: &str = "mongodb://root:pass@localhost:27017";
pub const DEFAULT_DB: &str = "ea_organization";
pub const DEFAULT_COLLECTION: &str = "test_organization";

pub const ERR_DB_INSTANTIATE: ServiceError =
    ServiceError::DefinedError("Unable to instantiate shared DB instance");
pub const ERR_UPTIME_INSTANTIATE: ServiceError =
    ServiceError::DefinedError("Unable to instantiate process uptime");
