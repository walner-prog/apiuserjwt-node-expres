const mysql = require('mysql2'); // Importa la versión de promesa de mysql2

require('dotenv').config();

// Obtener variables de entorno
const { MYSQL_ADDON_HOST, MYSQL_ADDON_PORT, MYSQL_ADDON_USER, MYSQL_ADDON_PASSWORD, MYSQL_ADDON_DB } = process.env;

const connection = mysql.createConnection({
  host: MYSQL_ADDON_HOST,
  port: MYSQL_ADDON_PORT,
  user: MYSQL_ADDON_USER,
  password: MYSQL_ADDON_PASSWORD,
  database: MYSQL_ADDON_DB
});

module.exports = connection;
