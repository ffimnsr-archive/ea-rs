pub mod error;
pub mod header;
pub mod middleware;
pub mod mime_type;

use hyper::{
    header as HeaderKey, Body, Method, Request, Response,
    StatusCode,
};
use routerify::RequestInfo;
use uuid::Uuid;

pub use error::ServiceError;

pub type ServiceResult<T> = Result<T, ServiceError>;
pub type DbResult<T> = Result<T, Box<dyn ::std::error::Error>>;

pub fn json_response(status: StatusCode, body: Body) -> ServiceResult<Response<Body>> {
    Response::builder()
        .status(status)
        .header(HeaderKey::CONTENT_TYPE, mime_type::JSON)
        .body(body)
        .map_err(ServiceError::Http)
}

pub async fn hello_world(_: Request<Body>) -> ServiceResult<Response<Body>> {
    let data = serde_json::json!({
        "success": true,
        "message": "How long is forever?",
    });

    json_response(StatusCode::OK, Body::from(data.to_string()))
}

pub async fn handler_404(req: Request<Body>) -> ServiceResult<Response<Body>> {
    match *req.method() {
        // To handle cors options request.
        // Needed similar to https://github.com/expressjs/cors/blob/c49ca10e92ac07f98a3b06783d3e6ba0ea5b70c7/lib/index.js#L173
        Method::OPTIONS => Response::builder()
            .status(StatusCode::NO_CONTENT)
            .header(HeaderKey::CONTENT_LENGTH, "0")
            .body(Body::empty())
            .map_err(ServiceError::Http),
        _ => {
            let data = serde_json::json!({
                "success": false,
                "message": "Not Found",
            });

            json_response(StatusCode::NOT_FOUND, Body::from(data.to_string()))
        }
    }
}

pub async fn error_handler(err: routerify::RouteError) -> Response<Body> {
    let svc_err = err.downcast::<ServiceError>().unwrap();

    match svc_err.as_ref() {
        _ => {
            let data = serde_json::json!({
                "success": false,
                "message": svc_err.to_string(),
            });

            json_response(
                StatusCode::INTERNAL_SERVER_ERROR,
                Body::from(data.to_string()),
            )
            .unwrap()
        }
    }
}

#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        assert_eq!(2 + 2, 4);
    }
}
