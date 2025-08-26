const { getCategoriaDB, createCategoriaDB, updateCategoria, deliteCategoria } = require('../models/categorias')

const getCategoria = async(req, res ) => {
    try {
        const {id} = req.getCategoria
        const categorias = await getCategoriaDB(id)

        if(categorias.length === 0){
            return res.status(404).json({message: "No existen la categoria"});
        }

        res.json({
            categorias
        })

    } catch (error) {
        console.error('Error en getCategoria: ', error);
        res.status(500).json({ message: "Error en el servidor" })
    }
}

const postCategoria = async(req, res) => {
    try {
        if(!req.body.categoria || isNaN(parseFloat(req.body.categoria))  || !req.body.nombre){
            return res.status(400).json({error: "Datos no completos o invalidos"});
        }

        const newCategoria = await createCategoriaDB(req.body);

        res.status(201).json({
            message: "Categoria registrada correctamente",
            newCategoria
        })

    } catch (error) {
        console.error("Error en postCategoria:", error);
        res.status(500).json({ error: "Error al crear categoria" });
    }
}

module.exports = {
    getCategoria,
    postCategoria, 

}