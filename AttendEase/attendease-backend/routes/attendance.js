import { prisma } from "../prismaClient.js";
import express from "express";

const router = express.Router();

router.post("/mark-attendance", async (req, res) => {
  const { sessionToken, studentId } = req.body;

  if (!sessionToken || !studentId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Find session
  const session = await prisma.session.findUnique({
    where: { sessionToken },
  });

  if (!session || session.status !== "active") {
    return res.status(400).json({ error: "Invalid or expired session" });
  }

  // Check if student already marked attendance
  const existingAttendance = await prisma.attendance.findFirst({
    where: { sessionId: session.id, studentId },
  });

  if (existingAttendance) {
    return res.status(400).json({ error: "Attendance already marked" });
  }

  // Mark attendance
  await prisma.attendance.create({
    data: { sessionId: session.id, studentId },
  });

  res.json({ message: "Attendance marked successfully!" });
});

export default router;
