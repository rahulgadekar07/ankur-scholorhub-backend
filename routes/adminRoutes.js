// routes/adminRoutes.js
const express = require("express");
const adminController = require("../controllers/adminController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/users", authMiddleware.verifyToken, authMiddleware.isAdmin, adminController.getAllUsers);
router.put("/block/:id", authMiddleware.verifyToken, authMiddleware.isAdmin, adminController.blockUser);
router.put("/unblock/:id", authMiddleware.verifyToken, authMiddleware.isAdmin, adminController.unblockUser);

module.exports = router;