const Plant = require("../models/Plant");

exports.createPlant = async (req, res) => {
  try {
    const { name, type, waterInterval } = req.body;

    const plant = await Plant.create({
      name,
      type,
      waterInterval,
      userId: req.user.id
    });

    res.status(201).json(plant);

  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getPlants = async (req, res) => {
  try {
    const plants = await Plant.find({ userId: req.user.id });
    res.json(plants);

  } catch (err) {
    res.status(500).json(err);
  }
};


exports.updatePlant = async (req, res) => {
  try {
    const plant = await Plant.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id
      },
      req.body,
      { new: true }
    );

    if (!plant) {
      return res.status(404).json({ message: "Plant not found" });
    }

    res.json(plant);

  } catch (err) {
    res.status(500).json(err);
  }
};


exports.deletePlant = async (req, res) => {
  try {
    const plant = await Plant.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!plant) {
      return res.status(404).json({ message: "Plant not found" });
    }

    res.json({ message: "Plant deleted" });

  } catch (err) {
    res.status(500).json(err);
  }
};