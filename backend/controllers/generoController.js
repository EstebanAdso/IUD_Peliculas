const Genero = require("../models/genero");

const getGeneros = async (req, res) => {
    try {
        const generos = await Genero.find();
        if (generos.length === 0) {
            return res.status(404).json({ msg: "No se encontraron géneros" });
        }
        res.status(200).json(generos);
    } catch (error) {
        console.log(`Error al obtener los géneros: ${error}`);
        res.status(500).json({ msg: "Error al obtener los géneros" });
    }
}

const getGeneroById = async (req, res) => {
    try {
        const { id } = req.params;
        const genero = await Genero.findById(id);
        if (!genero) {
            return res.status(404).json({ msg: "Género no encontrado" });
        }
        res.status(200).json(genero);
    } catch (error) {
        console.log(`Error al obtener el género: ${error}`);
        res.status(500).json({ msg: "Error al obtener el género" });
    }
}

const createGenero = async (req, res) => {
    try {
        const { nombre, descripcion, estado } = req.body;
        const generoExists = await Genero.findOne({ nombre });
        if (generoExists) {
            return res.status(400).json({ msg: "El género ya existe" });
        }
        const nuevoGenero = new Genero({ nombre, descripcion, estado });
        await nuevoGenero.save();
        res.status(201).json({ msg: "Género creado exitosamente", genero: nuevoGenero });
    } catch (error) {
        console.log(`Error al crear el género: ${error}`);
        res.status(500).json({ msg: "Error al crear el género" });
    }
}


const updateGenero = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, estado, descripcion } = req.body;
        const genero = await Genero.findById(id);
        if (!genero) {
            return res.status(404).json({ msg: "Género no encontrado" });
        }
        if (estado !== 'Activo' && estado !== 'Inactivo') {
            return res.status(400).json({ msg: "El estado del género debe ser 'Activo' o 'Inactivo'" });
        }
        if (nombre) genero.nombre = nombre;
        if (estado) genero.estado = estado;
        if (descripcion) genero.descripcion = descripcion;
        genero.fechaActualizacion = Date.now();
        await genero.save();
        res.status(200).json({ msg: "Género actualizado exitosamente", genero });
    } catch (error) {
        console.log(`Error al actualizar el género: ${error}`);
        res.status(500).json({ msg: "Error al actualizar el género" });
    }
}

const deleteGenero = async (req, res) => {
    try {
        const { id } = req.params;
        const genero = await Genero.findByIdAndDelete(id);
        if (!genero) {
            return res.status(404).json({ msg: "Género no encontrado" });
        }
        res.status(200).json({ msg: "Género eliminado exitosamente", genero });
    } catch (error) {
        console.log(`Error al eliminar el género: ${error}`);
        res.status(500).json({ msg: "Error al eliminar el género" });
    }
}

module.exports = {
    getGeneros,
    getGeneroById,
    createGenero,
    updateGenero,
    deleteGenero
}