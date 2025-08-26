const pool = require("./db");

// Extraer datos
const getCategoriaDB = async() => {
    try {
        const [rows] = await pool.query('SELECT * FROM categorias');
        res.json(rows);
    } catch (error) {
        console.error("Error en getTaskDB:", error.message);
        throw new Error("Error al obtener categorias");
    }
}

//Agregar una nueva categoria
const createCategoriaDB = async(categoriaData) => {
    const { nombre } = categoriaData;
    try {
        const [result] = await pool.query('INSERT INTO categorias (nombre) VALUES (?)', [nombre]);
        return {
            id: result.insertId,
            nombre
        };
    } catch (error) {
        console.error("Error en createCategoriaDB:", error.message);
        throw new Error("Error al crear categoría");
    }
};


// Actualizar categoría
const updateCategoria = async(categoriaData) => {
    const { id, nombreCategoria } = categoriaData
    try {
        const [nombre] = await pool.query(
            "SELECT nombre FROM categoria WHERE idCategoria = ? AND nombre = ?",
        [id, nombreCategoria]
        );
        if(nombre.length==0){
            throw new Error("Categoria no encontrada");
        }
        await pool.query('UPDATE categorias SET nombre = ? WHERE id = ?', [nombreCategoria, id]);
        return {
            id: result.insertId,
            nombre
        };
    } catch (error) {
        console.error("Error en updateCategoria:", error.message);
        throw new Error("Error al crear categoría");
    }
};

// Eliminar categoría
const deliteCategoria = async(idCategoria) => {
    try {
        await pool.query('DELETE FROM categorias WHERE id = ?', [idCategoria]);
        return {
            id: result.insertId
        }
    } catch (err) {
        console.error("Error en deliteCategoria:", error.message);
        throw new Error("Error al eliminar categoria");
    }
};

module.exports = {
    getCategoriaDB,
    createCategoriaDB,
    updateCategoria,
    deliteCategoria
}