const { Schema, model } = require("mongoose")

const mediaSchema = new Schema({
    serial: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    titulo: {
        type: String,
        required: [true, "El título de la media es obligatorio"],
        trim: true
    },
    sinopsis: {
        type: String,
        trim: true
    },
    url: {
        type: String,
        trim: true,
        unique: true,
        required: [true, "La URL de la media es obligatoria"]
    },
    imagen: {
        type: String,
        trim: true
    },
    fechaCreacion: {
        type: Date,
        required: [true, "La fecha de creación es obligatoria"],
        default: Date.now
    },
    fechaActualizacion: {
        type: Date,
        required: [true, "La fecha de actualización es obligatoria"],
        default: Date.now
    },
    anioEstreno: {
        type: Number,
        required: [true, "El año de estreno es obligatorio"],
        max: [new Date().getFullYear(), "El año de estreno no puede ser posterior al año actual"]
    },
    // solo debe permitir generos activos
    generoPrincipal: {
        type: Schema.Types.ObjectId,
        ref: "Genero",
        required: [true, "El género principal es obligatorio"]
    },
    // solo debe permitir directores activos
    directorPrincipal: {
        type: Schema.Types.ObjectId,
        ref: "Director",
        required: [true, "El director principal es obligatorio"]
    },
    // solo debe permitir productoras activas
    productora: {
        type: Schema.Types.ObjectId,
        ref: "Productora",
        required: [true, "La productora es obligatoria"]
    },
    tipo: {
        type: Schema.Types.ObjectId,
        ref: "Tipo",
        required: [true, "El tipo es obligatorio"]
    }
})

module.exports = model("Media", mediaSchema)