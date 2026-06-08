const express = require("express");
const router = express.Router();

const {
  login,
  register,
  getMe,
  updateUsername,
  changePassword,
  deleteUser   
} = require("../controllers/authController");

const { verifyToken } = require("../middleware/authMiddleware");

// Auth routes
router.post("/register", register);
router.post("/login", login);

// User info
router.get("/me", verifyToken, getMe);

// Profil update
router.put("/update-username", verifyToken, updateUsername);
router.put("/change-password", verifyToken, changePassword);


router.delete("/delete-account", verifyToken, deleteUser);

module.exports = router;