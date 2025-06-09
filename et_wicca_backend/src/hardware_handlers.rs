// src/hardware_handlers.rs
use crate::models::{CreateHardware, Hardware};
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
    Json(payload): Json<CreateHardware>,
) -> Result<Json<Hardware>, StatusCode> {
    let result = sqlx::query_as!(
        Hardware,
        "INSERT INTO hardware (tipo, modelo, serial, status, departamento, aquisicao) VALUES (?, ?, ?, ?, ?, ?) RETURNING *",
        payload.tipo, payload.modelo, payload.serial, payload.status, payload.departamento, payload.aquisicao
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
) -> Result<Json<Vec<Hardware>>, StatusCode> {
    let result = sqlx::query_as!(Hardware, "SELECT * FROM hardware")
        .fetch_all(&state.db_pool)
        .await;

    match result {
        Ok(list) => Ok(Json(list)),
        Err(_) => Err(StatusCode::INTERNAL_SERVER_ERROR),
    }
}

async fn delete_handler(State(state): State<Arc<AppState>>, Path(id): Path<i64>) -> StatusCode {
    let result = sqlx::query!("DELETE FROM hardware WHERE id = ?", id)
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
