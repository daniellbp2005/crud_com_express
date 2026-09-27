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
