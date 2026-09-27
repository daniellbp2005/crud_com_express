const db = require("../db/conexao.js");

async function listarProdutos(req, res, next) {
  try {
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

    const [resultados] = await db.query(sql);
    res.json(resultados);
  } catch (e) {
    next(e);
  }
}

async function criarProduto(req, res, next) {
  try {
    const { nome, preco, categoria_id, estoque } = req.body;

    if (nome.trim() === "") {
      return res
        .status(404)
        .json({ mensagem: " Preencha corretamente os dados do produto" });
    }

    if (typeof nome != "string") {
      return res.status(404).json({ mensagem: "nome deve ser string" });
    }

    if (nome.length < 2) {
      return res
        .status(404)
        .json({ mensagem: "nome deve pelo menos dois caracters" });
    }

    if (preco < 0 || estoque < 0 || categoria_id < 0) {
      return res.status(404).json({ mensagem: "deve ser maior q zero" });
    }

    if (typeof preco != "number") {
      return res.status(404).json({ mensagem: "preco deve ser numerico" });
    }

    if (!Number.isFinite(preco)) {
      return res.status(404).json({ mensagem: "preco deve ser finito" });
    }

    if (typeof estoque != "number") {
      return res.status(404).json({ mensagem: "estoque deve ser numerico" });
    }

    if (estoque.length > 0) {
      return res
        .status(404)
        .json({ mensagem: "estoque deve ser maior q zero" });
    }

    if (!Number.isInteger(estoque)) {
      return res.status(404).json({ mensagem: "estoque deve ser inteiro" });
    }

    if (typeof categoria_id != "number") {
      return res.status(404).json({ mensagem: "id deve ser numerico" });
    }

    if (categoria_id.length <= 1) {
      return res.status(404).json({ mensagem: "id deve ser maior q zero" });
    }

    const sql =
      "INSERT INTO produtos ( nome, preco, categoria_id, estoque) values ( ?, ?, ?, ?)";
    const valores = [nome, preco, categoria_id, estoque];

    const [resultados] = await db.query(sql, valores); // uso valores, qnd vou enviar os dados ? no banco
    res.json({
      mensagem: "Produto criado com sucesso",
      resultado: resultados.insertId,
    });
  } catch (e) {
    next(e);
  }
}

async function atualizarProduto(req, res, next) {
  try {
    const id = Number(req.params.id);
    const { nome, preco, categoria_id, estoque } = req.body;

    if (!Number.isInteger(id) || id < 0 || !Number.isFinite(id)) {
      return res.status(404).json({ mensagem: "Id inválido" });
    }

    if (nome.trim() === "") {
      return res
        .status(404)
        .json({ mensagem: " Preencha corretamente os dados do produto" });
    }

    if (typeof nome != "string") {
      return res.status(404).json({ mensagem: "nome deve ser string" });
    }

    if (nome.length < 2) {
      return res
        .status(404)
        .json({ mensagem: "nome deve pelo menos dois caracters" });
    }

    if (preco < 0 || estoque < 0 || categoria_id < 0) {
      return res.status(404).json({ mensagem: "deve ser maior q zero" });
    }

    if (typeof preco != "number") {
      return res.status(404).json({ mensagem: "preco deve ser numerico" });
    }

    if (!Number.isFinite(preco)) {
      return res.status(404).json({ mensagem: "preco deve ser finito" });
    }

    if (typeof estoque != "number") {
      return res.status(404).json({ mensagem: "estoque deve ser numerico" });
    }

    if (estoque.length > 0) {
      return res
        .status(404)
        .json({ mensagem: "estoque deve ser maior q zero" });
    }

    if (!Number.isInteger(estoque)) {
      return res.status(404).json({ mensagem: "estoque deve ser inteiro" });
    }

    if (typeof categoria_id != "number") {
      return res.status(404).json({ mensagem: "id deve ser numerico" });
    }

    if (categoria_id.length <= 1) {
      return res.status(404).json({ mensagem: "id deve ser maior q zero" });
    }

    const sql = `UPDATE produtos 
    SET nome = ?, preco = ?, estoque = ?, categoria_id = ? 
    WHERE id = ?`;
    const valores = [nome, preco, estoque, categoria_id, id];

    const [resultados] = await db.query(sql, valores);
    res.json({
      mensagem: "Produto atualizado com sucesso",
    });
  } catch (e) {
    next(e);
  }
}

async function deletarProduto(req, res, next) {
  try {
    const id = Number(req.params.id);
    const sql = `DELETE FROM produtos
  WHERE id = ?`;

    if (
      !Number.isInteger(id) ||
      id < 0 ||
      !Number.isFinite(id) ||
      id === undefined ||
      typeof id !== "number"
    ) {
      return res.status(404).json({ mensagem: "Id inválido" });
    }

    const [resultado] = await db.query(sql, id);
    res.json({
      mensagem: "Produto removido com sucesso",
    });
  } catch (e) {
    next(e);
  }
}

module.exports = {
  listarProdutos,
  criarProduto,
  atualizarProduto,
  deletarProduto,
};
