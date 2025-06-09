use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Deserialize)]
pub struct LoginRequest {
    pub email: String,
    pub password: String,
}

#[derive(Serialize)]
pub struct LoginResponse {
    pub token: String,
    pub user: User,
}

#[derive(Serialize, FromRow, Debug, Clone)]
pub struct User {
    pub id: i64,
    pub name: String,
    pub email: String,
    pub role: String,
}

#[derive(Deserialize)]
pub struct CreateUser {
    pub name: String,
    pub email: String,
    pub password: String,
    pub role: String,
}

#[derive(Serialize, FromRow, Debug)]
pub struct Hardware {
    pub id: i64,
    pub tipo: String,
    pub modelo: String,
    pub serial: String,
    pub status: String,
    pub departamento: Option<String>,
    pub aquisicao: Option<String>,
}

#[derive(Deserialize, Debug)]
pub struct CreateHardware {
    pub tipo: String,
    pub modelo: String,
    pub serial: String,
    pub status: String,
    pub departamento: Option<String>,
    pub aquisicao: Option<String>,
}

#[derive(Serialize, FromRow, Debug)]
pub struct Software {
    pub id: i64,
    pub nome: String,
    pub tipo: String,
    pub licenca: String,
    pub validade: Option<String>,
    pub usuarios: i64,
    pub status: String,
}

#[derive(Deserialize, Debug)]
pub struct CreateSoftware {
    pub nome: String,
    pub tipo: String,
    pub licenca: String,
    pub validade: Option<String>,
    pub usuarios: i64,
    pub status: String,
}

#[derive(Serialize, FromRow, Debug)]
pub struct NetworkDevice {
    pub id: i64,
    pub nome: String,
    pub tipo: String,
    pub ip: String,
    pub local: Option<String>,
    pub fabricante: Option<String>,
    pub modelo: String,
    pub status: String,
}

#[derive(Deserialize, Debug)]
pub struct CreateNetworkDevice {
    pub nome: String,
    pub tipo: String,
    pub ip: String,
    pub local: Option<String>,
    pub fabricante: Option<String>,
    pub modelo: String,
    pub status: String,
}

#[derive(Serialize, FromRow, Debug)]
pub struct Database {
    pub id: i64,
    pub nome: String,
    pub tipo: String,
    pub servidor: String,
    pub versao: Option<String>,
    pub tamanho: Option<String>,
    pub status: String,
}

#[derive(Deserialize, Debug)]
pub struct CreateDatabase {
    pub nome: String,
    pub tipo: String,
    pub servidor: String,
    pub versao: Option<String>,
    pub tamanho: Option<String>,
    pub status: String,
}
