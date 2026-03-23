const { Router } = require("express");
const {
    getGeneros,
    getGeneroById,
    createGenero,
    updateGenero,
    deleteGenero
} = require("../controllers/generoController");

const router = Router()

router.get("/", getGeneros)
router.get("/:id", getGeneroById)
router.post("/", createGenero)
router.put("/:id", updateGenero)
router.delete("/:id", deleteGenero)

module.exports = router