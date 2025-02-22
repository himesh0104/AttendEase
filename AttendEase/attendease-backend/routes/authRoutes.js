const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const { authenticateToken, authorizeRole } = require("../middleware/authMiddleware");

const prisma = new PrismaClient();
const router = express.Router();

/**
 * ✅ User Signup (Faculty/Student)
 */
router.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ success: false, msg: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in database
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, role },
    });

    res.status(201).json({ success: true, msg: "User registered successfully", user });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
});

/**
 * ✅ User Login (Faculty/Student)
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user in database
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ success: false, msg: "Invalid email or password" });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, msg: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ success: true, token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
});

/**
 * ✅ Protected Route - Accessible to Any Authenticated User
 */
router.get("/protected", authenticateToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    res.json({ success: true, msg: "You have accessed a protected route", user });
  } catch (err) {
    console.error("Protected Route Error:", err);
    res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
});

/**
 * ✅ Faculty-Only Route
 */
router.get("/faculty-dashboard", authenticateToken, authorizeRole("FACULTY"), async (req, res) => {
  try {
    res.json({ success: true, msg: "Welcome to Faculty Dashboard" });
  } catch (error) {
    console.error("Faculty Dashboard Error:", error);
    res.status(500).json({ success: false, msg: "Server Error" });
  }
});

/**
 * ✅ Admin-Only Route
 */
router.get("/admin", authenticateToken, authorizeRole("ADMIN"), async (req, res) => {
  res.json({ success: true, msg: "Welcome, Admin!" });
});

module.exports = router;
