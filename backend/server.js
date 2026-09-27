const express = require("express");
const produtosRoutes = require("./routes/produtos.js");
const app = express();
const port = 3000;

app.use(express.json());

app.use("/api/produtos/", produtosRoutes);

app.use((e, req, res, next) => {
  console.error("Erro: ", e.message);
  res.status(500).json({
    mensagem: "Falha interna do servidor",
  });
});

app.listen(port, () => {
  console.log(`Server rodadando em http://localhost:${port}`);
});
