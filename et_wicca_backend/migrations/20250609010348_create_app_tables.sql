-- Cria a tabela para os registros de Hardware
CREATE TABLE IF NOT EXISTS hardware (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tipo TEXT NOT NULL,
    modelo TEXT NOT NULL,
    serial TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL,
    departamento TEXT,
    aquisicao TEXT
);

-- Cria a tabela para os registros de Software
CREATE TABLE IF NOT EXISTS software (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    tipo TEXT NOT NULL,
    licenca TEXT NOT NULL,
    validade TEXT,
    usuarios INTEGER NOT NULL,
    status TEXT NOT NULL
);

-- Cria a tabela para os Dispositivos de Rede
CREATE TABLE IF NOT EXISTS network_devices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    tipo TEXT NOT NULL,
    ip TEXT NOT NULL,
    local TEXT,
    fabricante TEXT,
    modelo TEXT NOT NULL,
    status TEXT NOT NULL
);

-- Cria a tabela para os Bancos de Dados
CREATE TABLE IF NOT EXISTS databases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    tipo TEXT NOT NULL,
    servidor TEXT NOT NULL,
    versao TEXT,
    tamanho TEXT,
    status TEXT NOT NULL
);
