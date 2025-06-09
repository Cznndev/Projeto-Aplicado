use crate::models::{CreateSoftware, Software};
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
    Json(payload): Json<CreateSoftware>,
) -> Result<Json<Software>, StatusCode> {
    let result = sqlx::query_as!(
        Software,
        "INSERT INTO software (nome, tipo, licenca, validade, usuarios, status) VALUES (?, ?, ?, ?, ?, ?) RETURNING *",
        payload.nome,
        payload.tipo,
        payload.licenca,
        payload.validade,
        payload.usuarios,
        payload.status
    )
    .fetch_one(&state.db_pool)
    .await;

    match result {
        Ok(software) => {
            tracing::info!("Novo software criado com ID: {}", software.id);
            Ok(Json(software))
        }
        Err(e) => {
            tracing::error!("Erro ao criar software: {:?}", e);
            Err(StatusCode::INTERNAL_SERVER_ERROR)
        }
    }
}

async fn get_all_handler(
    State(state): State<Arc<AppState>>,
) -> Result<Json<Vec<Software>>, StatusCode> {
    let result = sqlx::query_as!(Software, "SELECT * FROM software")
        .fetch_all(&state.db_pool)
        .await;

    match result {
        Ok(software_list) => Ok(Json(software_list)),
        Err(e) => {
            tracing::error!("Erro ao buscar softwares: {:?}", e);
            Err(StatusCode::INTERNAL_SERVER_ERROR)
        }
    }
}

async fn delete_handler(State(state): State<Arc<AppState>>, Path(id): Path<i64>) -> StatusCode {
    let result = sqlx::query!("DELETE FROM software WHERE id = ?", id)
        .execute(&state.db_pool)
        .await;

    match result {
        Ok(res) if res.rows_affected() > 0 => {
            tracing::info!("Software com ID: {} deletado", id);
            StatusCode::NO_CONTENT
        }
        Ok(_) => {
            tracing::warn!(
                "Tentativa de deletar software com ID: {} não encontrado",
                id
            );
            StatusCode::NOT_FOUND
        }
        Err(e) => {
            tracing::error!("Erro ao deletar software: {:?}", e);
            StatusCode::INTERNAL_SERVER_ERROR
        }
    }
}

pub fn routes() -> Router<Arc<AppState>> {
    Router::new()
        .route("/", get(get_all_handler).post(create_handler))
        .route("/:id", delete(delete_handler))
}
