use std::error::Error;
use hyper::body::HttpBody;
use hyper::{
    header::HeaderValue, Body, Request, Response,
};
use routerify::ext::RequestExt;
use routerify::{Middleware, RequestInfo};
use uuid::Uuid;

use crate::{header, ServiceError};

pub fn enable_add_request_id<E>() -> Middleware<Body, E>
where
    E: Error + Send + Sync + Unpin + 'static,
{
    Middleware::pre(add_request_id::<Request<Body>, E>)
}

async fn add_request_id<B, E>(req: B) -> Result<B, E>
where
    B: RequestExt + Send + Sync + Unpin + 'static,
    E: Error + Send + Sync + Unpin + 'static,
{
    req.set_context(Uuid::new_v4());
    Ok(req)
}

pub fn enable_set_request_id<B, E>() -> Middleware<B, E>
where
    B: HttpBody + Send + Sync + Unpin + 'static,
    E: Error + From<ServiceError> + Send + Sync + Unpin + 'static,
{
    Middleware::post_with_info(set_request_id_header::<B, E>)
}

async fn set_request_id_header<B, E>(
    mut res: Response<B>,
    req_info: RequestInfo,
) -> Result<Response<B>, E>
where
    B: HttpBody + Send + Sync + Unpin + 'static,
    E: Error + From<ServiceError> + Send + Sync + Unpin + 'static,
{
    let request_id = req_info
        .context::<Uuid>()
        .ok_or(ServiceError::DefinedError("Unable to find request ID in context"))
        .map(|c| c.to_string())?;

    let value = HeaderValue::from_str(request_id.as_str()).unwrap();
    res.headers_mut().append(header::X_REQUEST_ID, value);
    Ok(res)
}
