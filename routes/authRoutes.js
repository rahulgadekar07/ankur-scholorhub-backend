//authRoutes.js
const express = require("express");
const upload = require("../config/multer.config");

const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware"); // 👈 ADD THIS

router.post("/signup", upload.single("profile_image"), authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/me", authMiddleware, authController.getCurrentUser);

router.put(
  "/update/:id",
  upload.single("profile_image"),
  authController.updateUser
);
router.put(
  "/update-profile-picture/:id",
  authMiddleware,
  upload.single("profile_image"),
  authController.updateProfileImage
);

module.exports = router;
