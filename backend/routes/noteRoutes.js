const express = require("express");
const router = express.Router();

const {
    createNote,
    getNotesByPlant,
    deleteNote
} = require("../controllers/noteController");

const { verifyToken } = require("../middleware/authMiddleware");

router.post("/", verifyToken, createNote);
router.get("/:plantId", verifyToken, getNotesByPlant);
router.delete("/:id", verifyToken, deleteNote);

module.exports = router;