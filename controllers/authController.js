const authService = require("../services/authService");
const emailService = require("../services/emailService");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const signup = async (req, res) => {
  try {
    const existingUser = await authService.getUserByEmail(req.body.email);

    if (existingUser.length > 0) {
      return res
        .status(409)
        .json({ message: "User with this email already exists" });
    }

    const profileImagePath = req.file
      ? `/uploads/profile_images/${req.file.filename}`
      : "https://i.ibb.co/sample-profile.jpg"; // fallback image

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const userData = {
      ...req.body,
      password: hashedPassword,
      profile_image: profileImagePath,
    };

    await authService.signup(userData);

    await emailService.sendWelcomeEmail(userData.email, userData.full_name);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userResult = await authService.getUserByEmail(email);

    if (userResult.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = userResult[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const existingUser = await authService.getUserById(userId);
    if (!existingUser || existingUser.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    const userRecord = existingUser[0];

    // Handle image
    let profileImagePath = existingUser.profile_image;
    if (req.file) {
      // Remove old file if stored locally
      if (profileImagePath && profileImagePath.startsWith("/uploads/")) {
        const oldImagePath = path.join(
          __dirname,
          "..",
          profileImagePath.replace(/^\//, "")
        );
        fs.unlink(oldImagePath, (err) => {
          if (err) console.error("Error deleting old image:", err);
        });
      }
      profileImagePath = `/uploads/profile_images/${req.file.filename}`;
    }

    const updatedData = {
      ...req.body,
      profile_image: profileImagePath,
    };

    await authService.updateUser(userId, updatedData);

    const updatedUser = await authService.getUserById(userId);
    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const logout = (req, res) => {
  res.status(200).json({ message: "User logged out successfully" });
};

module.exports = {
  signup,
  login,
  logout,
  updateUser,
};
