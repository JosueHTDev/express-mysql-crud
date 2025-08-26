// Este archivo maneja la conexión a la base de datos MySQL
const mysql = require("mysql2/promise"); // Importamos mysql2 (con soporte promesas
// Creamos un pool de conexiones (mejor que una sola conexión fija)
const pool = mysql.createPool({
    host: "localhost", // Servidor MySQL
    user: "root", // Usuario MySQL
    password: "", // Contraseña (cambiar según tu config)
    database: "api_jwt_demo" // Nombre de la BD que creamos
});
// Exportamos el pool para usarlo en otros archivos
module.exports = pool;
