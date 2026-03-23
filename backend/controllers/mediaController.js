const Media = require("../models/Media");
const { v4: uuidv4 } = require("uuid");
const validarMedia = require("../utils/functions");

const getMedias = async (req, res) => {
    try {
        const medias = await Media.find().populate('directorPrincipal').populate('generoPrincipal').populate('productora').populate('tipo');
        if (medias.length === 0) {
            return res.status(404).json({ msg: "No se encontraron medias" });
        }
        res.status(200).json(medias);
    } catch (error) {
        console.log(`Error al obtener los medias: ${error}`);
        res.status(500).json({ msg: "Error al obtener los medias" });
    }
}

const getMediaById = async (req, res) => {
    try {
        const { id } = req.params;
        const media = await Media.findById(id).populate('directorPrincipal').populate('generoPrincipal').populate('productora').populate('tipo');
        if (!media) {
            return res.status(404).json({ msg: "Media no encontrada" });
        }
        res.status(200).json(media);
    } catch (error) {
        console.log(`Error al obtener la media: ${error}`);
        res.status(500).json({ msg: "Error al obtener la media" });
    }
}

const createMedia = async (req, res) => {
    try {
        let {
            titulo,
            sinopsis,
            anioEstreno,
            generoPrincipal,
            directorPrincipal,
            productora,
            tipo,
            url,
            imagen
        } = req.body;

        await validarMedia(directorPrincipal, generoPrincipal, productora, tipo);
        if (!imagen) {
             imagen = `${titulo.replace(/\s+/g, "-").toLowerCase()}.jpg`;
        }
        if (!url) {
             url = `https://www.iudMedias.com/${productora}/${titulo.replace(/\s+/g, "-").toLowerCase()}`;
        }
        const serial = uuidv4();
        const nuevoMedia = new Media({ titulo, sinopsis, anioEstreno, generoPrincipal, directorPrincipal, productora, tipo, imagen, url, serial });
        await nuevoMedia.save();
        res.status(201).json({ msg: "Media creada exitosamente", media: nuevoMedia });
    } catch (error) {
        console.log(`Error al crear la media: ${error}`);
        res.status(500).json({ msg: error.message || "Error al crear la media" });
    }
}


const updateMedia = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, sinopsis, anioEstreno, generoPrincipal, directorPrincipal, productora, tipo, url, imagen } = req.body;
        const media = await Media.findById(id);
        if (!media) {
            return res.status(404).json({ msg: "Media no encontrada" });
        }

        await validarMedia(directorPrincipal, generoPrincipal, productora, tipo);
        if (titulo) media.titulo = titulo;
        if (sinopsis !== undefined) media.sinopsis = sinopsis;
        if (anioEstreno) media.anioEstreno = anioEstreno;
        if (generoPrincipal) media.generoPrincipal = generoPrincipal;
        if (directorPrincipal) media.directorPrincipal = directorPrincipal;
        if (productora) media.productora = productora;
        if (tipo) media.tipo = tipo;
        if (url) media.url = url;
        if (imagen) media.imagen = imagen;
        media.fechaActualizacion = Date.now();

        await media.save();
        res.status(200).json({ msg: "Media actualizada exitosamente", media });
    } catch (error) {
        console.log(`Error al actualizar la media: ${error}`);
        res.status(404).json({ msg: error.message || "Error al actualizar la media" });
    }
}

const deleteMedia = async (req, res) => {
    try {
        const { id } = req.params;
        const media = await Media.findByIdAndDelete(id);
        if (!media) {
            return res.status(404).json({ msg: "Media no encontrada" });
        }
        res.status(200).json({ msg: "Media eliminada exitosamente", media });
    } catch (error) {
        console.log(`Error al eliminar la media: ${error}`);
        res.status(500).json({ msg: error.msg || "Error al eliminar la media" });
    }
}

const getMediasByGenero = async (req, res) => {
    try {
        const { genero } = req.params;
        const mediasGenero = await Media.find({ generoPrincipal: genero });
        if (mediasGenero.length === 0) {
            return res.status(404).json({ msg: "No se encontraron medias para el género especificado" });
        }
        res.status(200).json(mediasGenero);
    } catch (error) {
        console.log(`Error al obtener los medias por género: ${error}`);
        res.status(500).json({ msg: "Error al obtener los medias por género" });
    }
}

const getMediasByDirector = async (req, res) => {
    try {
        const { director } = req.params;
        const mediasDirector = await Media.find({ directorPrincipal: director });
        if (mediasDirector.length === 0) {
            return res.status(404).json({ msg: "No se encontraron medias para el director especificado" });
        }
        res.status(200).json(mediasDirector);
    } catch (error) {
        console.log(`Error al obtener los medias por director: ${error}`);
        res.status(500).json({ msg: "Error al obtener los medias por director" });
    }
}

const getMediasByProductora = async (req, res) => {
    try {
        const { productora } = req.params;
        const mediasProductora = await Media.find({ productora });
        if (mediasProductora.length === 0) {
            return res.status(404).json({ msg: "No se encontraron medias para la productora especificada" });
        }
        res.status(200).json(mediasProductora);
    } catch (error) {
        console.log(`Error al obtener los medias por productora: ${error}`);
        res.status(500).json({ msg: "Error al obtener los medias por productora" });
    }
}

const getMediasByTipo = async (req, res) => {
    try {
        const { tipo } = req.params;
        const mediasTipo = await Media.find({ tipo });
        if (mediasTipo.length === 0) {
            return res.status(404).json({ msg: "No se encontraron medias para el tipo especificado" });
        }
        res.status(200).json(mediasTipo);
    }
    catch (error) {
        console.log(`Error al obtener los medias por tipo: ${error}`);
        res.status(500).json({ msg: "Error al obtener los medias por tipo" });
    }   
}

module.exports = {
    getMedias,
    getMediaById,
    createMedia,
    updateMedia,
    deleteMedia,
    getMediasByGenero,
    getMediasByDirector,
    getMediasByProductora,
    getMediasByTipo
}
