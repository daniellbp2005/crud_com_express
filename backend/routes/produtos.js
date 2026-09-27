const express = require("express");
const db = require("../db/conexao.js");

const router = express.Router();
const { listarProdutos } = require("../controllers/produtosController.js");
const { criarProduto } = require("../controllers/produtosController.js");
const { atualizarProduto } = require("../controllers/produtosController.js");
const { deletarProduto } = require("../controllers/produtosController.js");

router.get("/", listarProdutos);

router.post("/", criarProduto);

router.put("/:id", atualizarProduto);

router.delete("/:id", deletarProduto);

module.exports = router;
