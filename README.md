Com certeza\! Analisei a estrutura completa do seu projeto, incluindo o backend em Rust, e atualizei seu `README.md` para ser mais preciso e completo.

A nova versão corrige a descrição do projeto para refletir seu propósito real como um **Sistema de Gestão de TI** (e não apenas uma ferramenta de diagrama de classe), e adiciona seções cruciais sobre as tecnologias do backend e as instruções detalhadas para executar tanto o frontend quanto o backend.

Pode substituir o conteúdo do seu `README.md` por este:

-----

# ET & WICCA - Sistema de Gestão de TI

Uma plataforma completa e moderna para gestão de ativos de tecnologia da informação (TI), desenvolvida com um backend robusto em **Rust (Axum)** e um frontend interativo em **Next.js**. O sistema oferece uma solução centralizada para monitorar e gerenciar hardware, software, redes, bancos de dados e usuários em um ambiente coeso e intuitivo.

## 🎯 Funcionalidades

  * **🗺️ Dashboard Interativo:** Um painel completo que organiza as principais funcionalidades da aplicação, com cards e métricas que se adaptam ao perfil do usuário (`Admin`, `TI`, `Gestor`).
  * **🗂️ Gestão de Ativos de TI:** Módulos dedicados para o inventário e gerenciamento de:
      * **Hardware**: Equipamentos como servidores, laptops e desktops.
      * **Software**: Controle de licenças, versões e validades.
      * **Rede**: Dispositivos como switches, roteadores e firewalls.
      * **Banco de Dados**: Gerenciamento de instâncias e servidores.
  * **🔔 Sistema de Notificações e Alertas:**
      * Centro de notificações integrado com filtros e gerenciamento.
      * Criação de regras de alerta personalizadas para monitorar métricas (CPU, disco, etc.) com diferentes níveis de severidade.
      * Notificações de sistema em tempo real (toasts).
  * **🧠 Integração com Inteligência Artificial:**
      * **Chatbot** integrado para suporte técnico e auxílio dentro da plataforma.
      * Dashboard de automações para detecção de anomalias, manutenção preditiva e sugestões de otimização.
  * **📑 Relatórios Avançados:** Geração, agendamento e exportação de relatórios detalhados sobre inventário, performance, custos e conformidade.
  * **⚙️ Configurações e Gestão de Usuários:**
      * Painel completo para **gestão de usuários**, perfis e permissões detalhadas por módulo.
      * Módulo de **configurações do sistema** para personalizar aspectos da interface, segurança, notificações e integrações.

## 🛠️ Tecnologias Utilizadas

O projeto é estruturado como um monorepo, separando claramente o frontend do backend.

### **Frontend**

  * **Framework**: [Next.js](https://nextjs.org/)
  * **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
  * **Estilização**: [Tailwind CSS](https://tailwindcss.com/)
  * **Componentes UI**: [Shadcn/UI](https://ui.shadcn.com/)
  * **Diagramas**: [Mermaid.js](https://mermaid.js.org/) (para visualizações específicas)

### **Backend**

  * **Linguagem**: [Rust](https://www.rust-lang.org/)
  * **Framework Web**: [Axum](https://github.com/tokio-rs/axum)
  * **Assíncrono**: [Tokio](https://tokio.rs/)
  * **Acesso ao Banco de Dados**: [SQLx](https://github.com/launchbadge/sqlx)
  * **Autenticação**: JWT (JSON Web Tokens) com hashing de senha via Argon2.

### **Banco de Dados**

  * [MySQL](https://www.mysql.com/)

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
  * [MySQL Server](https://www.mysql.com/)
  * `sqlx-cli` (`cargo install sqlx-cli`)

### **1. Configuração do Backend (Rust)**

```bash
# Navegue até a pasta do backend
cd et_wicca_backend

# Crie um arquivo .env na raiz de /et_wicca_backend e adicione suas variáveis.
# Certifique-se de que o banco 'et_wicca_db' já foi criado no seu MySQL.
# Exemplo de conteúdo para o arquivo .env:
# DATABASE_URL="mysql://root:sua_senha@localhost:3306/et_wicca_db"
# JWT_SECRET="um-segredo-muito-forte-aqui"

# Compile as dependências
cargo build

# Execute as migrações para criar as tabelas no banco de dados
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
