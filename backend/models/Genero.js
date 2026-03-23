const { Schema, model } = require("mongoose")

const generoSchema = new Schema({
    nombre: {
        type: String,
        required: [true, "El nombre del género es obligatorio"],
        unique: true,
        trim: true
    },
    estado: {
        type: String,
        required: [true, "El estado del género es obligatorio"],
        enum: ["Activo", "Inactivo"],
        default: "Activo"
    },
    descripcion: {
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
    }
});

module.exports = model("Genero", generoSchema)