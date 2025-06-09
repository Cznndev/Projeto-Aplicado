use axum::{Router, routing::get};
use sqlx::sqlite::SqlitePool;
use std::env;
use std::net::SocketAddr;
use std::sync::Arc;
use tokio::net::TcpListener;
use tower_http::cors::{Any, CorsLayer};
use tracing::info;

mod auth;
mod auth_handlers;
mod database_handlers;
mod hardware_handlers;
mod models;
mod network_handlers;
mod software_handlers;
mod state;

use state::AppState;

async fn root_handler() -> &'static str {
    "API do Projeto Aplicado ET & WICCA está online."
}

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt()
        .with_target(false)
        .compact()
        .init();

    dotenv::dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let db_pool = SqlitePool::connect(&database_url)
        .await
        .expect("Failed to create db pool");

    info!("Pool de conexões com o banco de dados criado com sucesso.");

    let app_state = Arc::new(AppState { db_pool });

    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);

    let app = Router::new()
        .route("/", get(root_handler))
        .nest("/api/auth", auth_handlers::auth_routes())
        .nest("/api/hardware", hardware_handlers::routes())
        .nest("/api/software", software_handlers::routes())
        .nest("/api/network", network_handlers::routes())
        .nest("/api/databases", database_handlers::routes())
        .layer(cors)
        .with_state(app_state);

    let addr = SocketAddr::from(([127, 0, 0, 1], 8080));
    info!("🚀 Servidor escutando em http://{}", addr);

    let listener = TcpListener::bind(addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
