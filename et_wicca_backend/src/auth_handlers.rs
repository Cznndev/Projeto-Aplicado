// src/auth_handlers.rs
use crate::{
    auth::{create_jwt, hash_password, verify_password},
    models::{CreateUser, LoginRequest, LoginResponse, User},
    state::AppState,
};
use axum::{Router, extract::State, http::StatusCode, response::Json, routing::post};
use std::sync::Arc;

async fn register_handler(
    State(state): State<Arc<AppState>>,
    Json(payload): Json<CreateUser>,
) -> Result<Json<User>, StatusCode> {
    let password_hash = match hash_password(&payload.password) {
        Ok(hash) => hash,
        Err(_) => return Err(StatusCode::INTERNAL_SERVER_ERROR),
    };

    let user_result = sqlx::query_as!(
        User,
        "INSERT INTO users (name, email, role, password_hash) VALUES (?, ?, ?, ?) RETURNING id, name, email, role",
        payload.name,
        payload.email,
        payload.role,
        password_hash,
    )
    .fetch_one(&state.db_pool)
    .await;

    match user_result {
        Ok(user) => Ok(Json(user)),
        Err(_) => Err(StatusCode::BAD_REQUEST),
    }
}

async fn login_handler(
    State(state): State<Arc<AppState>>,
    Json(payload): Json<LoginRequest>,
) -> Result<Json<LoginResponse>, StatusCode> {
    let user_record = sqlx::query!(
        "SELECT id, name, email, role, password_hash FROM users WHERE email = ?",
        payload.email
    )
    .fetch_optional(&state.db_pool)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    if let Some(record) = user_record {
        if verify_password(&record.password_hash, &payload.password).unwrap_or(false) {
            let user = User {
                id: record.id.expect("ID nao pode ser None"),
                name: record.name,
                email: record.email,
                role: record.role,
            };

            let token = create_jwt(&user).map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;
            Ok(Json(LoginResponse { token, user }))
        } else {
            Err(StatusCode::UNAUTHORIZED)
        }
    } else {
        Err(StatusCode::UNAUTHORIZED)
    }
}

pub fn auth_routes() -> Router<Arc<AppState>> {
    Router::new()
        .route("/login", post(login_handler))
        .route("/register", post(register_handler))
}
