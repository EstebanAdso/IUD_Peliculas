const Director = require("../models/Director");
const genero = require("../models/Genero");
const Productora = require("../models/Productora");
const Tipo = require("../models/Tipo");

const validarMedia = async (directorPrincipal, generoPrincipal, productora, tipo) => {

    if (directorPrincipal) {
        const director = await Director.findById(directorPrincipal);
        if (!director) {
            throw new Error("Director no encontrado");
        }

        const verificarEstado = director.estado;
        if (verificarEstado === "Inactivo") {
            throw new Error("El director está inactivo");
        }
    }

    if (generoPrincipal) {
        const generoprincipal = await genero.findById(generoPrincipal);
        if (!generoprincipal) {
            throw new Error("Género no encontrado");
        }

        const verificarEstado = generoprincipal.estado;
        if (verificarEstado === "Inactivo") {
            throw new Error("El género está inactivo");
        }
    }

    if (productora) {
        const productoraExists = await Productora.findById(productora);
        if (!productoraExists) {
            throw new Error("Productora no encontrada");
        }
        const verificarEstado = productoraExists.estado;
        if (verificarEstado === "Inactivo") {
            throw new Error("La productora está inactiva");
        }
    }

    if (tipo) {
        const tipoExists = await Tipo.findById(tipo);
        if (!tipoExists) {
            throw new Error("Tipo no encontrado");
        }
        const verificarEstado = tipoExists.estado;
        if (verificarEstado === "Inactivo") {
            throw new Error("El tipo está inactivo");
        }
    }
}

module.exports = validarMedia;
