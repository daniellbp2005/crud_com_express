# CRUD com Express

Projeto de estudo desenvolvido para praticar a criação de uma API REST utilizando **Node.js, Express e MySQL**.

O objetivo foi aprender a estruturar uma aplicação back-end, trabalhar com rotas e controllers e realizar operações CRUD conectadas a um banco de dados relacional.

## Tecnologias utilizadas

- Node.js
- Express 5
- MySQL
- mysql2
- dotenv
- JavaScript (CommonJS)

## Funcionalidades

- Listagem de produtos e suas categorias.
- Cadastro de produtos.
- Atualização de produtos.
- Exclusão de produtos.
- Relacionamento entre produtos e categorias utilizando `INNER JOIN`.
- Consultas ao banco de dados com parâmetros.

## Estrutura do projeto

```text
crud_com_express/
└── backend/
    ├── controllers/
    │   └── produtosController.js
    ├── db/
    │   └── conexao.js
    ├── routes/
    │   └── produtos.js
    ├── server.js
    └── package.json
```

### Organização

- **routes:** define os endpoints da API.
- **controllers:** concentra a lógica das operações.
- **db:** configura a conexão com o MySQL.
- **server.js:** configura e inicia o servidor Express.

## Como executar

### Pré-requisitos

- Node.js e npm.
- MySQL instalado e em execução.

### 1. Instalar dependências

Entre na pasta do back-end:

```bash
cd backend
npm install
```

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env` dentro da pasta `backend`:

```env
HOST=localhost
USER=seu_usuario
PASSWORD=sua_senha
DB_NAME=nome_do_banco
```

Substitua os valores pelos dados da sua instalação do MySQL.

### 3. Preparar o banco de dados

A aplicação utiliza duas tabelas:

- `produtos`: id, nome, preco, estoque e categoria_id.
- `categorias`: id e nome.

O campo `categoria_id` relaciona os produtos às suas respectivas categorias.

O banco e as tabelas precisam estar criados antes de iniciar a API.

### 4. Iniciar o servidor

Ainda dentro da pasta `backend`:

```bash
npm start
```

O servidor será iniciado na porta `3000`.

## Endpoints

Rota base: `http://localhost:3000/api/produtos`

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/api/produtos/` | Lista os produtos e suas categorias |
| POST | `/api/produtos/` | Cadastra um produto |
| PUT | `/api/produtos/:id` | Atualiza um produto |
| DELETE | `/api/produtos/:id` | Exclui um produto |

### Exemplo de cadastro

```json
{
  "nome": "Teclado",
  "preco": 120,
  "categoria_id": 1,
  "estoque": 10
}
```

## Sobre o projeto

Este projeto foi desenvolvido individualmente como parte dos meus estudos de back-end.

Foi uma oportunidade de praticar a construção de APIs com Express, a separação entre rotas e controllers, consultas SQL e integração com MySQL.

O código representa uma etapa de aprendizado e pode receber melhorias, especialmente na validação dos dados e no tratamento das respostas da API.
