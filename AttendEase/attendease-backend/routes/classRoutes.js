import express from "express";
import { prisma } from "../prismaClient.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Get all classes for a faculty
router.get("/faculty/:facultyId/classes", async (req, res) => {
  try {
    const { facultyId } = req.params;
    const classes = await prisma.class.findMany({
      where: { facultyId }
    });
    res.json(classes);
  } catch (error) {
    console.error("❌ Database Error:", error);
    res.status(500).json({ message: "Failed to retrieve classes" });
  }
});

// Create a new class
router.post("/faculty/:facultyId/classes", async (req, res) => {
  try {
    const { facultyId } = req.params;
    const { name, code, schedule, room } = req.body;

    // Validate required fields
    if (!name || !code || !schedule || !room) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create the class
    const newClass = await prisma.class.create({
      data: {
        name,
        code,
        schedule,
        room,
        facultyId
      }
    });

    res.status(201).json(newClass);
  } catch (error) {
    console.error("❌ Database Error:", error);
    res.status(500).json({ message: "Failed to create class" });
  }
});

// Delete a class
router.delete("/faculty/:facultyId/classes/:classId", async (req, res) => {
  try {
    const { classId, facultyId } = req.params;

    // Check if class exists and belongs to faculty
    const existingClass = await prisma.class.findFirst({
      where: { id: classId, facultyId }
    });

    if (!existingClass) {
      return res.status(404).json({ message: "Class not found" });
    }

    // Delete the class
    await prisma.class.delete({
      where: { id: classId }
    });

    res.json({ message: "Class deleted successfully" });
  } catch (error) {
    console.error("❌ Database Error:", error);
    res.status(500).json({ message: "Failed to delete class" });
  }
});

// Update a class
router.put("/faculty/:facultyId/classes/:classId", async (req, res) => {
  try {
    const { classId, facultyId } = req.params;
    const { name, code, schedule, room } = req.body;

    // Check if class exists and belongs to faculty
    const existingClass = await prisma.class.findFirst({
      where: { id: classId, facultyId }
    });

    if (!existingClass) {
      return res.status(404).json({ message: "Class not found" });
    }

    // Update the class
    const updatedClass = await prisma.class.update({
      where: { id: classId },
      data: {
        name,
        code,
        schedule,
        room
      }
    });

    res.json(updatedClass);
  } catch (error) {
    console.error("❌ Database Error:", error);
    res.status(500).json({ message: "Failed to update class" });
  }
});

export default router;