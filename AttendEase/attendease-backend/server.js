import 'dotenv/config';
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import qrcodeRoutes from "./routes/qrcode.js";
import classRoutes from "./routes/classRoutes.js";
import { authenticateToken } from "./middleware/authMiddleware.js";

const app = express();

// ✅ Middleware setup
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api", qrcodeRoutes); // Mount at /api to support /api/faculty/:facultyId/classes/:classId/qr
app.use("/api", classRoutes);

// ✅ Health check endpoint
app.get("/", (req, res) => {
  res.send("AttendEase Backend Running...");
});

// ✅ Protected route example
app.get("/api/protected", authenticateToken, (req, res) => {
  res.json({ message: "Access granted to protected route!", user: req.user });
});

// ✅ Error handling middleware
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);
  res.status(500).json({ message: "Internal server error" });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log('📝 Available endpoints:');
  console.log('  - POST /api/faculty/:facultyId/classes/:classId/qr');
  console.log('  - GET /api/faculty/:facultyId/classes');
  console.log('  - POST /api/faculty/:facultyId/classes');
});
