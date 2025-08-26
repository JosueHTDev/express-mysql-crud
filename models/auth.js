const express = require("express");
const jwt = require("jsonwebtoken");
const pool = require("./db");

const router = express.Router();

const SECRET_KEY = "mi_secreto_ultra_seguro";

// logear un nuevo usuario
router.post("/login", async (req, res) => {

    const { usuario, password } = req.body;
    try {
        const [rows] = await pool.query(
        "SELECT * FROM usuarios WHERE usuario = ? AND password = MD5(?)",
        [usuario, password]
        );
        if (rows.length === 0) {
            return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
        }
        const user = rows[0]; 
        const token = jwt.sign({ id: user.id, usuario:
            user.usuario }, SECRET_KEY, {
            expiresIn: "1h"
        });
        res.json({ message: "Login exitoso", token });
    } catch (err) {
        console.error(err);
    res.status(500).json({ message: "Error en el servidor" });
    }
});

// Autenticación de usuario
router.get("/profile", verifyToken, async (req, res) => {
    try {
        const [rows] = await pool.query(
            "SELECT id, usuario FROM usuarios WHERE id = ?",
            [req.user.id]
        );
        res.json({ message: "Acceso autorizado", user: rows[0] });
    } catch (err) {
        res.status(500).json({ message: "Error al obtener datos" });
    }
});
module.exports = router;