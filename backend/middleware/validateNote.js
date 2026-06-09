const validateNote = (req, res, next) => {
  const { text } = req.body;

  if (!text || text.trim().length < 3) {
    return res.status(400).json({
      message: "Not en az 3 karakter olmalı",
    });
  }

  next();
};

module.exports = validateNote;