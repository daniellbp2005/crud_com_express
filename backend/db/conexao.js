require("dotenv").config();

console.log(JSON.stringify(process.env.HOST));

const mysql = require("mysql2/promise"); // permite trabalhar com promisse no sql (bem melhor)

const db = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB_NAME,
});

return (module.exports = db);
