
# Diagrama de Classe

O **Diagrama de Classe** é uma aplicação web desenvolvida com **Next.js**, **TypeScript** e **Tailwind CSS**, que tem como objetivo fornecer uma plataforma interativa para visualização, geração e organização de **diagramas de classes**, além de oferecer funcionalidades avançadas como relatórios, notificações, assistente com IA e gestão de usuários.

O projeto foi pensado para oferecer uma experiência intuitiva, escalável e moderna, utilizando uma arquitetura baseada em componentes reutilizáveis e tecnologias de ponta.

---

## 🎯 Funcionalidades

### 🗺️ Dashboard Interativo
- Um painel completo que organiza as principais funcionalidades da aplicação.
- Navegação entre diferentes abas temáticas:
  - **Software**: Apresenta diagramas e informações relacionadas a desenvolvimento de software.
  - **Banco de Dados**: Focado em estruturas de banco de dados, suas conexões e entidades.
  - **Hardware**: Diagramas e componentes físicos da arquitetura de computadores.
  - **Redes**: Estruturas e topologias de redes.

### 📊 Visualização de Diagramas
- Geração dinâmica de **diagramas de classe** utilizando a biblioteca **Mermaid.js**.
- Suporte para renderização de diagramas diretamente no navegador.
- Estilo responsivo e adaptado para diferentes dispositivos.

### 🔔 Sistema de Notificações
- Centro de notificações integrado.
- Suporte a **alertas**, **toasts** e **notificações contextuais**.
- Sistema de feedback em tempo real para ações do usuário.

### 🧠 Integração com Inteligência Artificial
- **Chatbot** integrado para auxílio dentro da plataforma.
- Sistema de **sugestões de melhorias** baseado em IA, que analisa o contexto dos diagramas e oferece otimizações.
- **Dashboard de automações**, permitindo que a IA ajude em tarefas repetitivas.

### 📑 Relatórios Avançados
- Geração de relatórios com análises detalhadas.
- Ferramentas para visualização de métricas e informações sobre os diagramas.

### ⚙️ Configurações e Gestão
- Painel de **configurações do sistema** onde é possível personalizar aspectos da interface e funcionamento.
- Módulo de **gestão de usuários**, permitindo administração de permissões, perfis e dados dos usuários da plataforma.

---

## 🗂️ Estrutura do Projeto

### 📁 `/app`
- Contém as páginas principais da aplicação, incluindo o layout global e rotas.
- Arquivos importantes:
  - `layout.tsx`: Define o layout padrão da aplicação.
  - `page.tsx`: Página inicial.
  - `/dashboard/page.tsx`: Página principal do dashboard.

### 📁 `/components`
- Componentes reutilizáveis organizados por funcionalidade:
  - `/ui`: Biblioteca de componentes de interface (botões, cards, tabelas, inputs, sliders, etc.).
  - `/dashboard`: Componentes específicos do painel, como header, shell e overview.
  - `/notifications`: Sistema de notificações (alertas, toasts e centro de notificações).
  - `/ai`: Integrações com IA, incluindo chatbot e sugestões inteligentes.
  - `/reports`: Componentes de geração de relatórios.
  - `/settings`: Configurações do sistema.
  - `/users`: Gestão de usuários.
  - `/tabs`: Componentes das abas temáticas (software, redes, banco de dados e hardware).
  - `mermaid.tsx`: Componente responsável pela renderização dos diagramas de classe usando Mermaid.
  - `theme-provider.tsx`: Gerenciamento de temas (claro/escuro).

### 📁 `/hooks`
- Hooks customizados para funcionalidades específicas, como:
  - `use-mobile`: Detecta se o dispositivo é mobile.
  - `use-toast`: Gerencia notificações rápidas (toasts).

### 📁 `/lib`
- Funções utilitárias que são usadas em diferentes partes do projeto.

### 📁 `/public`
- Arquivos estáticos como imagens, logos e placeholders.

### 📁 `/styles`
- Arquivos CSS globais, com configurações gerais de estilo, além do suporte ao Tailwind CSS.

### 📄 Arquivos de configuração
- `.gitignore`: Arquivos e pastas ignoradas pelo Git.
- `next.config.mjs`: Configurações específicas do Next.js.
- `package.json`: Dependências e scripts do projeto.
- `tailwind.config.ts`: Configurações do Tailwind CSS.
- `tsconfig.json`: Configurações de TypeScript.
- `pnpm-lock.yaml`: Controle de versão das dependências (PNPM).
- `postcss.config.mjs`: Configurações do PostCSS.

---

## 🚀 Tecnologias Utilizadas

- **Next.js** – Framework React para aplicações full stack.
- **TypeScript** – Tipagem estática para JavaScript.
- **Tailwind CSS** – Framework utilitário para estilização.
- **Mermaid.js** – Geração de diagramas baseados em texto.
- **Shadcn UI** – Componentização de interfaces acessíveis e modernas.
- **Framer Motion** – Animações fluidas na interface.
- **React** – Biblioteca principal de construção da UI.

---

## 🧠 Objetivos do Projeto

- Fornecer uma ferramenta visual e interativa para geração de diagramas de classe.
- Tornar o aprendizado e a organização de sistemas mais intuitiva.
- Oferecer suporte a IA para aumentar a produtividade.
- Facilitar a colaboração e o entendimento entre equipes de desenvolvimento, engenharia de software, redes e banco de dados.
