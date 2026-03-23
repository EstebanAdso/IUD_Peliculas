const {Schema, model} = require("mongoose")

const productoraSchema = new Schema({
    nombre: {
        type: String,
        required: [true, "El nombre de la productora es obligatorio"],
        unique: true,
        trim: true
    },
    estado: {
        type: String,
        required: [true, "El estado de la productora es obligatorio"],
        enum: ["Activo", "Inactivo"],
        default: "Activo"
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
    slogan: {
        type: String,
        trim: true
    },
    descripcion: {
        type: String,
        trim: true
    }
})

module.exports = model("Productora", productoraSchema)