const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    plantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plant",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    text: {
      type: String,
      required: [true, "Günlük notu boş eklenemez"],
      minlength: [3, "Günlük notu en az 3 karakter olmalı"],
      maxlength: [500, "Günlük notu 500 karakterden fazla olamaz"],
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);