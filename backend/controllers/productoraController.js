const Productora = require("../models/Productora");

const getProductoras = async (req, res) => {
    try {
        const productoras = await Productora.find();
        if (productoras.length === 0) {
            return res.status(404).json({ msg: "No se encontraron productoras" });
        }
        res.status(200).json(productoras);
    } catch (error) {
        console.log(`Error al obtener las productoras: ${error}`);
        res.status(500).json({ msg: "Error al obtener las productoras" });
    }
}

const getProductoraById = async (req, res) => {
    try {
        const { id } = req.params;
        const productora = await Productora.findById(id);
        if (!productora) {
            return res.status(404).json({ msg: "Productora no encontrada" });
        }
        res.status(200).json(productora);
    } catch (error) {
        console.log(`Error al obtener la productora: ${error}`);
        res.status(500).json({ msg: "Error al obtener la productora" });
    }
}


const createProductora = async (req, res) => {
    try {
        const { nombre, estado, slogan, descripcion } = req.body;
        const productoraExists = await Productora.findOne({ nombre });
        if (productoraExists) {
            return res.status(400).json({ msg: "La productora ya existe" });
        }
        const nuevaProductora = new Productora({ nombre, estado, slogan, descripcion });
        await nuevaProductora.save();
        res.status(201).json({ msg: "Productora creada exitosamente", productora: nuevaProductora });
    } catch (error) {
        console.log(`Error al crear la productora: ${error}`);
        res.status(500).json({ msg: "Error al crear la productora" });
    }
}

const updateProductora = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, estado, slogan, descripcion } = req.body;
        const productora = await Productora.findById(id);
        if (!productora) {
            return res.status(404).json({ msg: "Productora no encontrada" });
        }
        if (estado !== 'Activo' && estado !== 'Inactivo') {
            return res.status(400).json({ msg: "El estado de la productora debe ser 'Activo' o 'Inactivo'" });
        }
        if (nombre) productora.nombre = nombre;
        if (estado) productora.estado = estado;
        if (slogan) productora.slogan = slogan;
        if (descripcion) productora.descripcion = descripcion;
        productora.fechaActualizacion = Date.now();
        await productora.save();
        res.status(200).json({ msg: "Productora actualizada exitosamente", productora });
    } catch (error) {
        console.log(`Error al actualizar la productora: ${error}`);
        res.status(500).json({ msg: "Error al actualizar la productora" });
    }
}

const deleteProductora = async (req, res) => {
    try {
        const { id } = req.params;
        const productora = await Productora.findByIdAndDelete(id);
        if (!productora) {
            return res.status(404).json({ msg: "Productora no encontrada" });
        }
        res.status(200).json({ msg: "Productora eliminada exitosamente", productora });
    } catch (error) {
        console.log(`Error al eliminar la productora: ${error}`);
        res.status(500).json({ msg: "Error al eliminar la productora" });
    }
}

module.exports = {
    getProductoras,
    getProductoraById,
    createProductora,
    updateProductora,
    deleteProductora
}