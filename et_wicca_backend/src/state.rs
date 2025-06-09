use sqlx::SqlitePool;

#[derive(Clone)]
pub struct AppState {
    pub db_pool: SqlitePool,
}
