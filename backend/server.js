const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB bağlantısı
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB bağlandı"))
  .catch((err) => console.log(err));

// Test route
app.get("/", (req, res) => {
  res.send("Sanal Bahçem API çalışıyor");
});

// Routes
const authRoutes = require("./routes/authRoutes");
const plantRoutes = require("./routes/plantRoutes");
const noteRoutes = require("./routes/noteRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/plants", plantRoutes);
app.use("/api/notes", noteRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route bulunamadı",
  });
});

// Error middleware 
const errorHandler = require("./middleware/errorMiddleware");
app.use(errorHandler);

// Server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server çalışıyor: " + PORT);
});