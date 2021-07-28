pub mod error;
pub mod header;
pub mod middleware;
pub mod mime_type;

use axum::response::IntoResponse;
use axum::http::{Request, StatusCode};
use axum::Json;
use hyper::Body;
use serde_json::json;

pub use error::ServiceError;

pub type ServiceResult<T> = Result<T, ServiceError>;
pub type DbResult<T> = Result<T, Box<dyn ::std::error::Error>>;

pub async fn hello_world() -> impl IntoResponse {
    (StatusCode::OK, Json(json!({
        "success": true,
        "message": "How long is forever?",
    }))).into_response()
}

pub async fn handler_404(req: Request<Body>) -> impl IntoResponse {
    match *req.method() {
        // To handle cors options request.
        // Needed similar to https://github.com/expressjs/cors/blob/c49ca10e92ac07f98a3b06783d3e6ba0ea5b70c7/lib/index.js#L173
        // Method::OPTIONS => Response::builder()
        //     .status(StatusCode::NO_CONTENT)
        //     .header(HeaderKey::CONTENT_LENGTH, "0")
        //     .body(Body::empty()),
        _ => {
            let output = Json(json!({
                "success": false,
                "message": "Not Found",
            }));

            (StatusCode::NOT_FOUND, output).into_response()
        }
    }
}

// pub async fn error_handler(err: routerify::RouteError) -> Response<Body> {
//     let svc_err = err.downcast::<ServiceError>().unwrap();

//     match svc_err.as_ref() {
//         _ => {
//             let data = serde_json::json!({
//                 "success": false,
//                 "message": svc_err.to_string(),
//             });

//             json_response(
//                 StatusCode::INTERNAL_SERVER_ERROR,
//                 Body::from(data.to_string()),
//             )
//             .unwrap()
//         }
//     }
// }

#[cfg(test)]
mod tests {
    // use super::*;

    #[test]
    fn sanity_check() {
        assert_eq!(2 + 2, 4);
    }

    // #[tokio::test]
    // async fn test_hello_world_status_should_ok() {
    //     let req = Request::builder()
    //         .uri("https://www.example.org/")
    //         .header("User-Agent", "test-agent/1.0")
    //         .body(Body::empty())
    //         .unwrap();

    //     let resp = hello_world(req).unwrap();
    //     assert_eq!(resp.status(), ::hyper::StatusCode::OK)
    // }

    // #[tokio::test]
    // async fn test_hello_world_body_should_ok() {
    //     let data = serde_json::json!({
    //         "success": true,
    //         "message": "How long is forever?",
    //     });

    //     let req = Request::<Body>::default();
    //     let resp = hello_world(req).unwrap();

    //     let body = hyper::body::to_bytes(resp).await.unwrap();
    //     let body = String::from_utf8(body.to_vec()).unwrap();
    //     assert_eq!(body, data.to_string())
    // }

    // #[tokio::test]
    // async fn test_handler_404_status_should_ok() {
    //     let req = Request::<Body>::default();
    //     let resp = handler_404(req).await.unwrap();

    //     assert_eq!(resp.status(), ::hyper::StatusCode::NOT_FOUND);
    // }
}
