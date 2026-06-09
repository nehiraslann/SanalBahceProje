const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Kullanıcı adı boş bırakılamaz"],
      minlength: [3, "Kullanıcı adı en az 3 karakter olmalı"],
      maxlength: [30, "Kullanıcı adı 30 karakterden fazla olamaz"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email boş bırakılamaz"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\S+@\S+\.\S+$/,
        "Geçerli bir mail adresi giriniz",
      ],
    },

    password: {
      type: String,
      required: [true, "Şifre boş bırakılamaz"],
      minlength: [6, "Şifre en az 6 karakter olmalı"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);