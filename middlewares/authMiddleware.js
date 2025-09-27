const jwt = require("jsonwebtoken");
const db = require("../config/db.config");

// Verify token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach decoded user payload
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token" });
  }
};

// Check if user is admin
const isAdmin = async (req, res, next) => {
  try {
    const [rows] = await db.query("SELECT role FROM users WHERE id = ?", [
      req.user.userId, // 👈 from your JWT payload
    ]);

    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    if (rows[0].role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admin only." });
    }

    next();
  } catch (err) {
    console.error("isAdmin middleware error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { verifyToken, isAdmin };
