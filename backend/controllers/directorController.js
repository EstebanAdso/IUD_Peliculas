const Director = require("../models/Director");

const getDirectores = async (req, res) => {
    try {
        const directores = await Director.find();
        if (directores.length === 0) {
            return res.status(404).json({ msg: "No se encontraron directores" });
        }
        res.status(200).json(directores);
    } catch (error) {
        console.log(`Error al obtener los directores: ${error}`);
        res.status(500).json({ msg: "Error al obtener los directores" });
    }
}

const getDirectorById = async (req, res) => {
    try {
        const { id } = req.params;
        const director = await Director.findById(id);
        if (!director) {
            return res.status(404).json({ msg: "Director no encontrado" });
        }
        res.status(200).json(director);
    } catch (error) {
        console.log(`Error al obtener el director: ${error}`);
        res.status(500).json({ msg: "Error al obtener el director" });
    }
}

const createDirector = async (req, res) => {
    try {
        const { nombre, estado } = req.body;
        const directorExists = await Director.findOne({ nombre });
        if (directorExists) {
            return res.status(400).json({ msg: "El director ya existe" });
        }
        const nuevoDirector = new Director({ nombre, estado });
        await nuevoDirector.save();
        res.status(201).json({ msg: "Director creado exitosamente", director: nuevoDirector });
    } catch (error) {
        console.log(`Error al crear el director: ${error}`);
        res.status(500).json({ msg: "Error al crear el director" });
    }
}

const updateDirector = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;
        const director = await Director.findById(id);
        if (estado === director.estado) {
            return res.status(400).json({ msg: "El estado del director no ha cambiado" });
        }
        if (estado !== 'Activo' && estado !== 'Inactivo') {
            return res.status(400).json({ msg: "El estado del director debe ser 'Activo' o 'Inactivo'" });
        }
        director.estado = estado;
        await director.save();
        res.status(200).json({ msg: "Director actualizado exitosamente", director });
    } catch (error) {
        console.log(`Error al actualizar el director: ${error}`);
        res.status(500).json({ msg: "Error al actualizar el director" });
    }
}

const deleteDirector = async (req, res) => {
    try {
        const { id } = req.params;
        const director = await Director.findByIdAndDelete(id);
        if (!director) {
            return res.status(404).json({ msg: "Director no encontrado" });
        }
        res.status(200).json({ msg: "Director eliminado exitosamente", director });
    } catch (error) {
        console.log(`Error al eliminar el director: ${error}`);
        res.status(500).json({ msg: "Error al eliminar el director" });
    }
}
module.exports = {
    getDirectores,
    getDirectorById,
    createDirector,
    updateDirector,
    deleteDirector
}
