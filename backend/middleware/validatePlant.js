const validatePlant = (req, res, next) => {
  const { name, waterInterval } = req.body;

  if (!name || name.trim() === "") {
    return res.status(400).json({
      message: "Plant name is required",
    });
  }

  if (waterInterval && waterInterval < 1) {
    return res.status(400).json({
      message: "Water interval must be greater than 0",
    });
  }

  next();
};

module.exports = validatePlant;