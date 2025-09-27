// authRoutes.js
const express = require("express");
const upload = require("../config/multer.config");

const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/signup", upload.single("profile_image"), authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

// Fix: Use authMiddleware.verifyToken instead of authMiddleware
router.get("/me", authMiddleware.verifyToken, authController.getCurrentUser);

router.put(
  "/update/:id",
  upload.single("profile_image"),
  authController.updateUser
);
router.put(
  "/update-profile-picture/:id",
  authMiddleware.verifyToken, // Also update this route if you want authentication
  upload.single("profile_image"),
  authController.updateProfileImage
);

module.exports = router;