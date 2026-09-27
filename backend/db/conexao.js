const mysql = require("mysql2/promise"); // permite trabalhar com promisse no sql (bem melhor)

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "aplicacao",
});

return (module.exports = db);
