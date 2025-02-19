const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Access Denied. No token provided or invalid format." });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: err.name === "TokenExpiredError" ? "Token expired. Please log in again." : "Invalid token.",
      });
    }
    req.user = decoded;
    next();
  });
};

// 🔹 Authorize multiple roles: e.g., ["admin", "faculty"]
const authorizeRole = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role.toLowerCase())) {
    return res.status(403).json({ success: false, message: "Access Forbidden: Insufficient Permissions." });
  }
  next();
};

module.exports = { authenticateToken, authorizeRole };
