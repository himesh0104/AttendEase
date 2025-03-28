import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { authenticateToken, authorizeRole } from "../middleware/authMiddleware.js";

const prisma = new PrismaClient();
const router = express.Router();

// ✅ User Signup (Faculty/Student)
router.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ success: false, msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, role },
    });

    res.status(201).json({ success: true, msg: "User registered successfully", user });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
});

// ✅ User Login (Faculty/Student)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ success: false, msg: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ success: true, token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
});

// ✅ Get authenticated user details
router.get("/me", authenticateToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id }, select: { id: true, name: true, email: true, role: true } });
    if (!user) return res.status(404).json({ success: false, msg: "User not found" });
    res.json({ success: true, user });
  } catch (error) {
    console.error("Auth Error:", error);
    res.status(401).json({ success: false, msg: "Invalid token" });
  }
});

// ✅ Protected Route - Accessible to any authenticated user
router.get("/protected", authenticateToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user) return res.status(404).json({ success: false, msg: "User not found" });
    res.json({ success: true, msg: "You have accessed a protected route", user });
  } catch (err) {
    console.error("Protected Route Error:", err);
    res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
});

// ✅ Faculty-only Route
router.get("/faculty-dashboard", authenticateToken, authorizeRole("FACULTY"), (req, res) => {
  res.json({ success: true, msg: "Welcome to Faculty Dashboard" });
});

// ✅ Admin-only Route
router.get("/admin", authenticateToken, authorizeRole("ADMIN"), (req, res) => {
  res.json({ success: true, msg: "Welcome, Admin!" });
});

export default router;
