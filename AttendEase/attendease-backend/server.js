import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import qrcodeRoutes from "./routes/qrcode.js";
import classRoutes from "./routes/classRoutes.js";
import { authenticateToken } from "./middleware/authMiddleware.js";

dotenv.config(); // ✅ Load environment variables

const app = express();

// ✅ Middleware setup
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/qrcode", qrcodeRoutes);
app.use("/api/classes", classRoutes);

// ✅ Health check endpoint
app.get("/", (req, res) => {
  res.send("AttendEase Backend Running...");
});

// ✅ Protected route example
app.get("/api/protected", authenticateToken, (req, res) => {
  res.json({ message: "Access granted to protected route!", user: req.user });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
