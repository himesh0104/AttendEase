import express from "express";
import QRCode from "qrcode";
import prisma from "../prismaClient.js";

const router = express.Router();

router.post("/generate", async (req, res) => {
  console.log("📥 Received request body:", req.body); // Debugging log

  const { classId, facultyId, courseId, sessionTime } = req.body;

  // ✅ Validate required fields
  if (!classId || !facultyId) {
    console.error("❌ Missing required fields!", req.body);
    return res.status(400).json({
      error: "Missing required fields",
      receivedBody: req.body, // Send back received data for debugging
    });
  }

  try {
    let sessionToken = null;
    let sessionId = null;

    // 🔹 If session details are provided, create a session in the database
    if (courseId && sessionTime) {
      sessionToken = `${facultyId}-${courseId}-${Date.now()}`;

      const session = await prisma.session.create({
        data: {
          facultyId,
          courseId,
          sessionTime,
          sessionToken,
          status: "active",
        },
      });

      sessionId = session.id;
    }

    // 🔹 Generate QR Code
    const qrData = JSON.stringify({ sessionToken, classId, facultyId });
    const qrCodeUrl = await QRCode.toDataURL(qrData);

    console.log("✅ QR Code generated successfully!");

    res.json({
      message: "QR Code generated successfully!",
      qrCodeUrl,
      sessionId,
    });
  } catch (error) {
    console.error("❌ QR Code Generation Error:", error);
    res.status(500).json({ error: "Failed to generate QR code" });
  }
});

export default router;
