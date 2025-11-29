require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const otherRoutes = require("./routes/otherRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/other", otherRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Base route
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head><title>API Status</title></head>
      <body style="font-family:Arial;text-align:center;padding:60px;">
        <h2>🚀 Ankur ScholarHub API is Running</h2>
        <p>Use <code>/api/auth</code>, <code>/api/admin</code>, <code>/api/payment</code>, or <code>/api/other</code> routes.</p>
      </body>
    </html>
  `);
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
