//authRoutes.js
const express = require('express');
const upload = require('../config/multer.config');

const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', upload.single('profile_image'), authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.put(
  '/update/:id',
  upload.single('profile_image'),
  authController.updateUser
);

module.exports = router;
