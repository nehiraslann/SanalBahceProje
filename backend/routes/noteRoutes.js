const express = require("express");
const router = express.Router();

const {
  createNote,
  getNotesByPlant,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");

const { verifyToken } = require("../middleware/authMiddleware");
const validateNote = require("../middleware/validateNote");

router.post("/", verifyToken, validateNote, createNote);

router.get("/:plantId", verifyToken, getNotesByPlant);

router.put("/:id", verifyToken, validateNote, updateNote);

router.delete("/:id", verifyToken, deleteNote);

module.exports = router;