const express = require("express");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "mi_secreto_ultra_seguro";

function verifyToken(req, res, next) {
    const token = req.headers["authorization"]; 
    if (!token) return res.status(403).json({ message: "Token requerido" });
        jwt.verify(token.replace("Bearer ", ""), SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Token inválido o expirado" });
        req.user = decoded; 
        next(); 
    });
}

module.exports = {
    verifyToken,
}