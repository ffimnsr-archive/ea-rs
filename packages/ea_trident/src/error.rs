use bson::de::Error as BsonDeError;
use bson::oid::Error as BsonOidError;
use bson::ser::Error as BsonSerError;
use hyper::http::Error as HttpError;
use hyper::Error as HyperError;
use mongodb::error::Error as MongoError;
use serde_json::Error as SerdeJsonError;
use std::fmt;

#[derive(Debug)]
pub enum ServiceError {
    Hyper(HyperError),
    Http(HttpError),
    Mongo(MongoError),
    BsonOid(BsonOidError),
    BsonDe(BsonDeError),
    BsonSer(BsonSerError),
    SerdeJson(SerdeJsonError),
    DefinedError(&'static str),
}

impl std::error::Error for ServiceError {}

impl fmt::Display for ServiceError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match *self {
            ServiceError::Hyper(ref err) => write!(f, "Hyper internal error: {}", err),
            ServiceError::Http(ref err) => write!(f, "Hyper http error: {}", err),
            ServiceError::Mongo(ref err) => write!(f, "Mongo error: {}", err),
            ServiceError::BsonOid(ref err) => {
                write!(f, "Bson OID parsing error: {}", err)
            }
            ServiceError::BsonDe(ref err) => {
                write!(f, "Bson deserializer error: {}", err)
            }
            ServiceError::BsonSer(ref err) => {
                write!(f, "Bson serializer error: {}", err)
            }
            ServiceError::SerdeJson(ref err) => {
                write!(f, "Serde JSON parsing error: {}", err)
            }
            ServiceError::DefinedError(err) => write!(f, "Fatal error: {}", err),
        }
    }
}

impl From<HttpError> for ServiceError {
    fn from(e: HttpError) -> Self {
        Self::Http(e)
    }
}
