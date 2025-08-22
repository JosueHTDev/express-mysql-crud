const express = require('express');
const router = express.Router();
const db = require('../db');
// Obtener todos los productos con su categoría y la primera imagen
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT p.id, p.nombre, p.precio, c.nombre AS categoria,
                   (SELECT url FROM imagenes_productos i WHERE i.producto_id = p.id LIMIT 1) AS imagen
            FROM productos p
            LEFT JOIN categorias c ON p.categoria_id = c.id
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Obtener productos por categoría
router.get('/categoria/:categoria_id', async (req, res) => {
    const { categoria_id } = req.params;
    try {
        const [rows] = await db.query(`
            SELECT p.id, p.nombre, p.precio, c.nombre AS categoria
            FROM productos p
            LEFT JOIN categorias c ON p.categoria_id = c.id
            WHERE p.categoria_id = ?
        `, [categoria_id]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Obtener detalle de producto con todas sus imágenes
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [producto] = await db.query(`
            SELECT p.id, p.nombre, p.precio, c.nombre AS categoria
            FROM productos p
            LEFT JOIN categorias c ON p.categoria_id = c.id
            WHERE p.id = ?
        `, [id]);

        if (producto.length === 0) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }

        const [imagenes] = await db.query(`
            SELECT id, url FROM imagenes_productos WHERE producto_id = ?
        `, [id]);

        res.json({ ...producto[0], imagenes });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Crear producto
router.post('/', async (req, res) => {
    const { nombre, precio, categoria_id } = req.body;
    try {
        const [result] = await db.query(
        'INSERT INTO productos (nombre, precio, categoria_id) VALUES (?, ?, ?)',
        [nombre, precio, categoria_id]
        );
        res.json({ id: result.insertId, nombre, precio, categoria_id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Actualizar producto
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, precio, categoria_id } = req.body;
    try {
        await db.query(
        'UPDATE productos SET nombre = ?, precio = ?, categoria_id = ? WHERE id = ?',
        [nombre, precio, categoria_id, id]
        );
        res.json({ id, nombre, precio, categoria_id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Eliminar producto
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM productos WHERE id = ?', [id]);
        res.json({ mensaje: 'Producto eliminado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
module.exports = router;