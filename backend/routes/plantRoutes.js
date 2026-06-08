const express = require("express");
const router = express.Router();

const {
    createPlant,
    getPlants,
    updatePlant,
    deletePlant
} = require("../controllers/plantController");

const { verifyToken } = require("../middleware/authMiddleware");

router.post("/", verifyToken, createPlant);
router.get("/", verifyToken, getPlants);
router.put("/:id", verifyToken, updatePlant);
router.delete("/:id", verifyToken, deletePlant);

module.exports = router;