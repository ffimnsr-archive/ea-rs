use deadpool_postgres::{Manager, ManagerConfig, RecyclingMethod};
use std::{env, str::FromStr};
use tokio_postgres::{Config, NoTls};

pub use deadpool_postgres::Pool;

pub fn get_db_pool() -> Result<Pool, Box<dyn std::error::Error>> {
    let db_url = env::var("DSN").map_err(|op| op.to_string())?;
    let pg_config = Config::from_str(db_url.as_str()).map_err(|op| op.to_string())?;

    let manager = Manager::from_config(
        pg_config,
        NoTls,
        ManagerConfig {
            recycling_method: RecyclingMethod::Fast,
        },
    );

    Ok(Pool::new(manager, 16))
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_get_db_pool_ok() {
        assert_eq!(dotenv::dotenv().is_ok(), true);
        let pool = get_db_pool();
        assert!(pool.is_ok());
    }
}
