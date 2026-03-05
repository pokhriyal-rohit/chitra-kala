const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const drawingRoutes = require("./routes/drawings");
const artistRoutes = require("./routes/artists");
const challengeRoutes = require("./routes/challenges");
const exploreRoutes = require("./routes/explore");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Mount Routes
app.use("/api/auth", authRoutes);
app.use("/api/drawings", drawingRoutes);
app.use("/api/artists", artistRoutes);
app.use("/api/challenges", challengeRoutes);
app.use("/api/explore", exploreRoutes);

// Error Handling
app.use((err, req, res, next) => {
  console.error("❌ GLOBAL ERROR LOG:", err.stack);
  res.status(500).json({ message: err.message || "Server Error" });
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
