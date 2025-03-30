import express from "express";
import prisma from "../prismaClient.js"; // Ensure this path is correct

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    console.log("🔵 API HIT: /api/classes");

    const classes = await prisma.Class.findMany(); // Adjust based on your schema
    res.json(classes);
  } catch (error) {
    console.error("❌ Database Error:", error);
    res.status(500).json({ message: "Failed to retrieve classes" });
  }
});

export default router;