// routes/otherRoutes.js
const express = require("express");
const router = express.Router();
const otherController = require("../controllers/otherController");
const authMiddleware = require("../middlewares/authMiddleware");

// Public route (no token required)
router.post("/submit-feedback", otherController.submitFeedback);

// Protected route (admin view)
router.get("/get-feedbacks", authMiddleware.verifyToken, otherController.getFeedbacks);

module.exports = router;
