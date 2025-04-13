import express from "express";
import QRCode from "qrcode";
import { prisma } from "../prismaClient.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Apply authentication middleware
router.use(authenticateToken);

// Generate QR code for a specific class
router.post("/faculty/:facultyId/classes/:classId/qr", async (req, res) => {
  console.log("📥 Received QR code generation request:", {
    params: req.params,
    body: req.body
  });

  const { facultyId, classId } = req.params;
  const { duration = 15 } = req.body; // Default duration is 15 minutes

  try {
    // Verify the class exists and belongs to the faculty
    const classRecord = await prisma.class.findFirst({
      where: {
        id: classId,
        facultyId
      }
    });

    if (!classRecord) {
      return res.status(404).json({
        error: "Class not found or does not belong to this faculty"
      });
    }

    // Create a session token that expires after the specified duration
    const sessionToken = `${facultyId}-${classId}-${Date.now()}`;
    const expiryTime = new Date(Date.now() + duration * 60 * 1000); // Convert minutes to milliseconds

    // Create a session record
    const session = await prisma.session.create({
      data: {
        facultyId,
        courseId: classId, // Using classId as courseId since they represent the same thing
        sessionTime: expiryTime,
        sessionToken,
        status: "active"
      }
    });

    // Generate QR Code with session information
    const qrData = JSON.stringify({
      sessionToken,
      classId,
      facultyId,
      expiryTime: expiryTime.toISOString()
    });

    const qrCodeUrl = await QRCode.toDataURL(qrData);

    console.log("✅ QR Code generated successfully for class:", classId);

    res.json({
      message: "QR Code generated successfully!",
      qrCodeUrl,
      sessionId: session.id,
      expiryTime: expiryTime.toISOString()
    });
  } catch (error) {
    console.error("❌ QR Code Generation Error:", error);
    res.status(500).json({ error: "Failed to generate QR code" });
  }
});

export default router;
