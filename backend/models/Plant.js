const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Bitki adı boş olamaz"],
      minlength: [2, "Bitki adı en az 2 karakter olmalı"],
      maxlength: [50, "Bitki adı 50 karakterden uzun olamaz"],
      trim: true,
    },

    type: {
      type: String,
      trim: true,
      maxlength: [30, "Bitki türü 30 karakterden uzun olamaz"],
    },

    waterInterval: {
      type: Number,
      default: 3,
      min: [1, "Sulama en az 1 gün olmalı"],
      max: [365, "Sulama 365 günden fazla olamaz"],
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Plant", plantSchema);