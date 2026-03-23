const Tipo = require("../models/Tipo");

const getTipos = async (req, res) => {
    try {
        const tipos = await Tipo.find();
        if (tipos.length === 0) {
            return res.status(404).json({ msg: "No se encontraron tipos" });
        }
        res.status(200).json(tipos);
    } catch (error) {
        console.log(`Error al obtener los tipos: ${error}`);
        res.status(500).json({ msg: "Error al obtener los tipos" });
    }
}

const getTipoById = async (req, res) => {
    try {
        const { id } = req.params;
        const tipo = await Tipo.findById(id);
        if (!tipo) {
            return res.status(404).json({ msg: "Tipo no encontrado" });
        }
        res.status(200).json(tipo);
    } catch (error) {
        console.log(`Error al obtener el tipo: ${error}`);
        res.status(500).json({ msg: "Error al obtener el tipo" });
    }
}

const createTipo = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        const tipoExists = await Tipo.findOne({ nombre });
        if (tipoExists) {
            return res.status(400).json({ msg: "El tipo ya existe" });
        }

        // validar enum
        const enumValores = Tipo.schema.path("nombre").enumValues;
        if (!enumValores.includes(nombre)) {
            return res.status(400).json({
                msg: `El tipo debe ser uno de: ${enumValores.join(", ")}`
            });
        }
        const nuevoTipo = new Tipo({ nombre, descripcion });
        await nuevoTipo.save();
        res.status(201).json({ msg: "Tipo creado exitosamente", tipo: nuevoTipo });
    } catch (error) {
        console.log(`Error al crear el tipo: ${error}`);
        res.status(500).json({ msg: "Error al crear el tipo" });
    }
}

// solo actualizar la descripcion.
const updateTipo = async (req, res) => {
    try {
        const { id } = req.params;
        const { descripcion } = req.body;
        const tipo = await Tipo.findById(id);
        if (!tipo) {
            return res.status(404).json({ msg: "Tipo no encontrado" });
        }
        if (descripcion) tipo.descripcion = descripcion;
        tipo.fechaActualizacion = Date.now();
        await tipo.save();
        res.status(200).json({ msg: "Tipo actualizado exitosamente", tipo });
    } catch (error) {
        console.log(`Error al actualizar el tipo: ${error}`);
        res.status(500).json({ msg: "Error al actualizar el tipo" });
    }
}

const deleteTipo = async (req, res) => {
    try {
        const { id } = req.params;
        const tipo = await Tipo.findByIdAndDelete(id);
        if (!tipo) {
            return res.status(404).json({ msg: "Tipo no encontrado" });
        }
        res.status(200).json({ msg: "Tipo eliminado exitosamente", tipo });
    } catch (error) {
        console.log(`Error al eliminar el tipo: ${error}`);
        res.status(500).json({ msg: "Error al eliminar el tipo" });

    }
}

module.exports = {
    getTipos,
    getTipoById,
    createTipo,
    updateTipo,
    deleteTipo
}