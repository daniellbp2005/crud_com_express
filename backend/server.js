const express = require("express");
const mysql = require("mysql2");

const app = express();
const port = 3000;

app.use(express.json()); // ler json

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "aplicacao",
});

db.connect((e) => {
  if (e) {
    console.log("Erro: ", e);
    return;
  }
  console.log("Conectado");
});

app.get("/api/produtos", (req, res) => {
  const sql = `SELECT
  produtos.id,
  produtos.nome,
  produtos.preco,
  produtos.estoque,
  categorias.nome AS categoria
  FROM produtos
  INNER JOIN categorias
    ON produtos.categoria_id = categorias.id;
  `;

  db.query(sql, (e, resultados) => {
    if (e) {
      return res.serverStatus(500).json({
        erro: "Erro ao buscar produtos",
      });
    }
    res.json(resultados);
  });
});

app.post("/api/produtos", (req, res) => {
  const { nome, preco, categoria_id, estoque } = req.body;
  const sql =
    "INSERT INTO produtos ( nome, preco, categoria_id, estoque) values ( ?, ?, ?, ?)";
  const valores = [nome, preco, categoria_id, estoque];
  db.query(sql, valores, (e, resultado) => {
    if (e) {
      return res.status(500).json({
        erro: "Erro ao criar o produto",
      });
    }
    res.status(201).json({
      mensagem: "Produto criado",
      id: resultado.insertId,
    });
  });
});

app.put("/api/produtos/:id", (req, res) => {
  const id = Number(req.params.id);

  const { nome, preco, categoria_id, estoque } = req.body;

  const sql = `UPDATE produtos 
    SET nome = ?, preco = ?, estoque = ?, categoria_id = ? 
    WHERE id = ?`;

  const valores = [nome, preco, estoque, categoria_id, id];

  db.query(sql, valores, (e, resultado) => {
    if (e) {
      return res.status(500).json({
        erro: "Erro ao atualizar o produto",
      });
    }

    res.json({
      mensagem: "atualizado com sucesso",
      id: id,
    });
  });
});

app.delete("/api/produtos/:id", (req, res) => {
  const id = Number(req.params.id);
  const sql = `DELETE FROM produtos
  WHERE id = ?`;

  db.query(sql, id, (e, resultado) => {
    if (e) {
      return res.status(500).json({
        erro: "Erro ao deletar o produto",
      });
    }

    res.json({
      mensagem: "deletado com sucesso",
      id: id,
    });
  });
});

app.listen(port, () => {
  console.log(`Server rodadando em http://localhost:${port}`);
});
