use crate::models::{CreateNetworkDevice, NetworkDevice};
use crate::state::AppState;
use axum::{
    Router,
    extract::{Path, State},
    http::StatusCode,
    response::Json,
    routing::{delete, get, post},
};
use std::sync::Arc;

async fn create_handler(
    State(state): State<Arc<AppState>>,
    Json(payload): Json<CreateNetworkDevice>,
) -> Result<Json<NetworkDevice>, StatusCode> {
    let result = sqlx::query_as!(
        NetworkDevice,
        "INSERT INTO network_devices (nome, tipo, ip, local, fabricante, modelo, status) VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING *",
        payload.nome, payload.tipo, payload.ip, payload.local, payload.fabricante, payload.modelo, payload.status
    )
    .fetch_one(&state.db_pool)
    .await;

    match result {
        Ok(item) => Ok(Json(item)),
        Err(_) => Err(StatusCode::INTERNAL_SERVER_ERROR),
    }
}

async fn get_all_handler(
    State(state): State<Arc<AppState>>,
) -> Result<Json<Vec<NetworkDevice>>, StatusCode> {
    let result = sqlx::query_as!(NetworkDevice, "SELECT * FROM network_devices")
        .fetch_all(&state.db_pool)
        .await;

    match result {
        Ok(list) => Ok(Json(list)),
        Err(_) => Err(StatusCode::INTERNAL_SERVER_ERROR),
    }
}

async fn delete_handler(State(state): State<Arc<AppState>>, Path(id): Path<i64>) -> StatusCode {
    let result = sqlx::query!("DELETE FROM network_devices WHERE id = ?", id)
        .execute(&state.db_pool)
        .await;

    match result {
        Ok(res) if res.rows_affected() > 0 => StatusCode::NO_CONTENT,
        Ok(_) => StatusCode::NOT_FOUND,
        Err(_) => StatusCode::INTERNAL_SERVER_ERROR,
    }
}

pub fn routes() -> Router<Arc<AppState>> {
    Router::new()
        .route("/", get(get_all_handler).post(create_handler))
        .route("/:id", delete(delete_handler))
}
