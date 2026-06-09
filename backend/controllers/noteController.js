const Note = require("../models/Note");

exports.createNote = async (req, res) => {
  try {
    const { plantId, text } = req.body;

    const note = await Note.create({
      plantId,
      userId: req.user.id,
      text,
    });

    res.status(201).json(note);
  } catch (err) {
    console.log("CREATE NOTE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};


exports.getNotesByPlant = async (req, res) => {
  try {
    const notes = await Note.find({
      plantId: req.params.plantId,
      userId: req.user.id,
    })
      .populate("userId", "username email")
      .populate("plantId", "name type")
      .sort({ createdAt: -1 });

    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const { text } = req.body;

    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    if (note.userId.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    note.text = text;

    await note.save();

    res.json(note);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Günlük not bulunamadı" });
    }

    if (note.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await note.deleteOne();

    res.json({ message: "Günlük not silindi" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};