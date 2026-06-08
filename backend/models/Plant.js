const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String },
    waterInterval: { type: Number, default: 3 }, // gün
    lastWatered: { type: Date, default: Date.now },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

module.exports = mongoose.model("Plant", plantSchema);