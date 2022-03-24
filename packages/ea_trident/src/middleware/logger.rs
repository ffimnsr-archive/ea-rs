use hyper::body::HttpBody;
use hyper::Response;
use routerify::{Middleware, RequestInfo};
use std::error::Error;
use uuid::Uuid;

use crate::ServiceError;

pub fn enable_logger_with_request_id<B, E>() -> Middleware<B, E>
where
    B: HttpBody + Send + Sync + Unpin + 'static,
    E: Error + From<ServiceError> + Send + Sync + Unpin + 'static,
{
    Middleware::post_with_info(logger_with_request_id::<B, E>)
}

pub async fn logger_with_request_id<B, E>(
    res: Response<B>,
    req_info: RequestInfo,
) -> Result<Response<B>, E>
where
    B: HttpBody + Send + Sync + Unpin + 'static,
    E: Error + From<ServiceError> + Send + Sync + Unpin + 'static,
{
    let request_id = req_info
        .context::<Uuid>()
        .ok_or(ServiceError::DefinedError("Unable to get request id"))?;

    log::info!(
        "[request-id:{}] {} {} {}",
        request_id,
        res.status().as_u16(),
        req_info.method(),
        req_info.uri().path()
    );
    Ok(res)
}
