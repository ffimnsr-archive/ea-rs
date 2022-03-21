use log::error;

pub struct PaginationToken {
    pub offset: i64,
}

pub fn generate_token(offset: i64) -> String {
    base64::encode(offset.to_string())
}

pub fn parse_token(token: &str) -> Option<PaginationToken> {
    if token == "" {
        error!("The token string is empty");
        return None;
    }

    let raw_token = base64::decode(token).ok()?;
    let raw_token = String::from_utf8_lossy(&raw_token).into_owned();
    let offset = raw_token.parse::<i64>().ok()?;

    Some(PaginationToken { offset })
}
