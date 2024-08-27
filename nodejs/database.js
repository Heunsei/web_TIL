const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: process.env.PORT,
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "express",
});

module.exports = connection;
