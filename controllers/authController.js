// controllers/authController.js
const authService = require('../services/authService');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const emailService = require('../services/emailService');

const signup = async (req, res) => {
  try {
    const profileImagePath = req.file ? `/uploads/profile_images/${req.file.filename}` : null;

    const userData = {
      ...req.body,
      profile_image: profileImagePath,
    };

    await authService.signup(userData);

    // Send welcome email after successful signup
    await emailService.sendWelcomeEmail(userData.email, userData.full_name);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const users = await authService.getUserByEmail(email);

    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({ token, user });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
};

module.exports = { signup, login, logout };
