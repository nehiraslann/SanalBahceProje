const validatePlant = (req, res, next) => {
  const { name, waterInterval } = req.body;

  if (name !== undefined && typeof name === "string" && name.trim() === "") {
    return res.status(400).json({
      message: "Bitki adı boş olamaz",
    });
  }

  if (
    waterInterval !== undefined &&
    Number(waterInterval) < 1
  ) {
    return res.status(400).json({
      message: "Sulama günü 0'dan büyük olmalı",
    });
  }

  next();
};

module.exports = validatePlant;