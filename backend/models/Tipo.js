const {Schema, model} = require("mongoose")

const tipoSchema = new Schema({
    nombre: {
        type: String,
        enum: ["Pelicula", "Serie", "Documental", "Cortometraje", "Anime", "Animación", "Videojuego"],
        required: [true, "El nombre del tipo es obligatorio"],
        unique: true,
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
    descripcion: {
        type: String,
        trim: true
    }
})

module.exports = model("Tipo", tipoSchema)