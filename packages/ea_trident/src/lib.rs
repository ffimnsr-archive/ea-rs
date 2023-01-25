pub mod error;
pub mod header;
pub mod middleware;
pub mod mime_type;

use axum::response::IntoResponse;
use axum::http::{Request, StatusCode};
use axum::Json;
use hyper::{Body, Method};
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
        Method::OPTIONS => StatusCode::NO_CONTENT.into_response(),
        _ => {
            let output = Json(json!({
                "success": false,
                "message": "Not Found",
            }));

            (StatusCode::NOT_FOUND, output).into_response()
        }
    }
}

#[cfg(test)]
mod tests {
    use axum::{Router, routing::get};
    use tower::ServiceExt;

    use super::*;

    #[test]
    fn sanity_check() {
        assert_eq!(2 + 2, 4);
    }

    #[tokio::test]
    async fn test_hello_world_status_should_ok() {
        let app = Router::new()
            .route("/", get(hello_world));

        let response = app
            .oneshot(
                Request::builder()
                    .uri("/")
                    .body(Body::empty())
                    .unwrap(),
            )
            .await
            .unwrap();

        assert_eq!(response.status(), StatusCode::OK);
    }

    #[tokio::test]
    async fn test_hello_world_body_should_ok() {
        let data = serde_json::json!({
            "success": true,
            "message": "How long is forever?",
        });

        let app = Router::new()
            .route("/", get(hello_world));

        let response = app
            .oneshot(
                Request::builder()
                    .uri("/")
                    .body(Body::empty())
                    .unwrap(),
            )
            .await
            .unwrap();

        let body = hyper::body::to_bytes(response.into_body()).await.unwrap();
        let body = String::from_utf8(body.to_vec()).unwrap();
        assert_eq!(body, data.to_string())
    }

    #[tokio::test]
    async fn test_handler_404_status_should_ok() {
        let app = Router::new()
            .route("/", get(handler_404));

        let response = app
            .oneshot(
                Request::builder()
                    .uri("/")
                    .body(Body::empty())
                    .unwrap(),
            )
            .await
            .unwrap();

        assert_eq!(response.status(), StatusCode::NOT_FOUND);
    }

    #[tokio::test]
    async fn test_handler_404_body_should_ok() {
        let data = serde_json::json!({
            "success": false,
            "message": "Not Found",
        });

        let app = Router::new()
            .route("/", get(handler_404));

        let response = app
            .oneshot(
                Request::builder()
                    .uri("/")
                    .body(Body::empty())
                    .unwrap(),
            )
            .await
            .unwrap();

        let body = hyper::body::to_bytes(response.into_body()).await.unwrap();
        let body = String::from_utf8(body.to_vec()).unwrap();
        assert_eq!(body, data.to_string())
    }
}
