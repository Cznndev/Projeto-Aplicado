# ET & WICCA - Sistema de Gestão de TI

Uma plataforma completa e moderna para gestão de ativos de tecnologia da informação (TI), desenvolvida com um backend robusto em **Rust (Axum)** e um frontend interativo em **Next.js**. O sistema oferece uma solução centralizada para monitorar e gerenciar hardware, software, redes, bancos de dados, usuários e muito mais.

## 🌟 Funcionalidades Principais

  * **🗺️ Dashboard Interativo:** Um painel completo que organiza as principais funcionalidades da aplicação, com cards e métricas que se adaptam ao perfil do usuário (`Admin`, `TI`, `Gestor`).
  * **🗂️ Gestão de Ativos de TI:** Módulos dedicados para o inventário e gerenciamento de:
      * **Hardware**: Equipamentos como servidores, laptops e desktops.
      * **Software**: Controle de licenças, versões e validades.
      * **Rede**: Dispositivos como switches, roteadores e firewalls.
      * **Banco de Dados**: Gerenciamento de instâncias e servidores.
  * **🔔 Sistema de Notificações e Alertas:**
      * Centro de notificações integrado.
      * Suporte a **alertas**, **toasts** e **notificações contextuais**.
      * Criação de regras de alerta personalizadas para monitorar métricas (CPU, disco, rede) e receber alertas baseados em severidade.
  * **🧠 Integração com Inteligência Artificial:**
      * **Chatbot** integrado para auxílio dentro da plataforma.
      * Sistema de **sugestões de melhorias** baseado em IA, que analisa o contexto dos diagramas e oferece otimizações.
      * **Dashboard de automações**, permitindo que a IA ajude em tarefas repetitivas.
  * **📑 Relatórios Avançados:**
      * Geração de relatórios com análises detalhadas.
      * Ferramentas para visualização de métricas e informações sobre os diagramas.
  * **⚙️ Configurações e Gestão de Usuários:**
      * Painel de **configurações do sistema** onde é possível personalizar aspectos da interface e funcionamento.
      * Módulo de **gestão de usuários**, permitindo administração de permissões, perfis e dados dos usuários da plataforma.

## 🛠️ Tecnologias Utilizadas

O projeto é estruturado como um monorepo, separando claramente o frontend do backend.

### **Frontend**

  * **Framework**: [Next.js](https://nextjs.org/)
  * **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
  * **Estilização**: [Tailwind CSS](https://tailwindcss.com/)
  * **Componentes UI**: [Shadcn/UI](https://ui.shadcn.com/)
  * **Diagramas**: [Mermaid.js](https://mermaid.js.org/)

### **Backend**

  * **Linguagem**: [Rust](https://www.rust-lang.org/)
  * **Framework Web**: [Axum](https://github.com/tokio-rs/axum)
  * **Assíncrono**: [Tokio](https://tokio.rs/)
  * **Acesso ao Banco de Dados**: [SQLx](https://github.com/launchbadge/sqlx)
  * **Autenticação**: JWT (JSON Web Tokens) com hashing de senha via Argon2.

### **Banco de Dados**

  * [SQLite](https://www.sqlite.org/index.html)

-----

## 🗂️ Estrutura do Projeto

  * **`/` (raiz)**: Contém toda a aplicação frontend em Next.js.
      * **`/app`**: Páginas e layouts da aplicação.
      * **`/components`**: Componentes React reutilizáveis, organizados por funcionalidade (UI, dashboard, abas, etc.).
  * **`/et_wicca_backend`**: Contém toda a API backend desenvolvida em Rust.
      * **`/src`**: Código-fonte do servidor, incluindo os *handlers* de rotas, modelos de dados e lógica de negócio.
      * **`/migrations`**: Arquivos de migração SQL para criar a estrutura do banco de dados.

-----

## 🚀 Como Executar o Projeto

Siga os passos abaixo para configurar e rodar o ambiente de desenvolvimento localmente.

### **Pré-requisitos**

  * [Node.js](https://nodejs.org/) (versão 22 ou superior)
  * [pnpm](https://pnpm.io/)
  * [Rust](https://www.rust-lang.org/tools/install) e `cargo`
  * `sqlx-cli` (`cargo install sqlx-cli`)

### **1. Configuração do Backend (Rust)**

```bash
# Navegue até a pasta do backend
cd et_wicca_backend

# Crie um arquivo .env na raiz de /et_wicca_backend e adicione suas variáveis.
# O arquivo de banco de dados do SQLite será criado automaticamente.
# Exemplo de conteúdo para o arquivo .env:
# DATABASE_URL="sqlite:et_wicca.db"
# JWT_SECRET="um-segredo-muito-forte-aqui"

# Compile as dependências
cargo build

# Execute as migrações para criar o arquivo de banco de dados e as tabelas
sqlx migrate run

# Inicie o servidor do backend
cargo run
```

O servidor backend estará rodando em `http://127.0.0.1:8080`.

### **2. Configuração do Frontend (Next.js)**

```bash
# Em um novo terminal, navegue até a raiz do projeto
# (um nível acima da pasta do backend)
cd .. 

# Instale as dependências do frontend
pnpm install

# Inicie o servidor de desenvolvimento
pnpm dev
```

A aplicação estará acessível em `http://localhost:3000`.

### **3. Acesso ao Sistema**

Use as seguintes credenciais de demonstração para fazer login com diferentes perfis:

  * **Administrador:**
      * **Email:** `admin@etwicca.com`
      * **Senha:** `admin123`
  * **Técnico de TI:**
      * **Email:** `ti@etwicca.com`
      * **Senha:** `ti123`
  * **Gestor:**
      * **Email:** `gestor@etwicca.com`
      * **Senha:** `gestor123`

-----

## 💻 Desenvolvido Por

  * **[Cznndev](https://github.com/Cznndev)**
  * **[OmgGass](https://github.com/OmgGass)**
-----

  * **TODOS OS DADOS SÃO FICTICIOS:**

