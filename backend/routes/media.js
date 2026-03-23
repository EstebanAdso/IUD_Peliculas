const { Router } = require("express");
const {
    getMedias,
    getMediaById,
    createMedia,
    updateMedia,
    deleteMedia,
    getMediasByGenero,
    getMediasByDirector,
    getMediasByProductora,
    getMediasByTipo
} = require("../controllers/mediaController");

const router = Router();

router.get("/", getMedias);
router.get("/:id", getMediaById);
router.get("/genero/:genero", getMediasByGenero);
router.get("/director/:director", getMediasByDirector);
router.get("/productora/:productora", getMediasByProductora);
router.get("/tipo/:tipo", getMediasByTipo);
router.post("/", createMedia);
router.put("/:id", updateMedia);
router.delete("/:id", deleteMedia);

module.exports = router;