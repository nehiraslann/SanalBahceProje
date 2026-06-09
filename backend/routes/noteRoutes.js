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

// Not ekle
router.post("/", verifyToken, validateNote, createNote);

// Bitkiye ait notları getir
router.get("/:plantId", verifyToken, getNotesByPlant);

// Not güncelle
router.put("/:id", verifyToken, validateNote, updateNote);

// Not sil
router.delete("/:id", verifyToken, deleteNote);

module.exports = router;