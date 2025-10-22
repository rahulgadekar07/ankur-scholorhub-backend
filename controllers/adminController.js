// controllers/adminController.js
const adminService = require("../services/adminService");
const authService = require("../services/authService");

const emailService = require("../services/emailService");

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await adminService.getAllUsers();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch users" });
  }
};

// Block user
const blockUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await authService.getUserById(id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    await adminService.updateUserStatus(id, false);
    await emailService.sendAccountBlockedEmail(user.email, user.full_name);

    res
      .status(200)
      .json({ success: true, message: "User blocked and notified" });
  } catch (error) {
    console.error("Block user error:", error);
    res.status(500).json({ success: false, message: "Failed to block user" });
  }
};

// Unblock user
const unblockUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await authService.getUserById(id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    await adminService.updateUserStatus(id, true);
    await emailService.sendAccountUnblockedEmail(user.email, user.full_name);

    res
      .status(200)
      .json({ success: true, message: "User unblocked and notified" });
  } catch (error) {
    console.error("Unblock user error:", error);
    res.status(500).json({ success: false, message: "Failed to unblock user" });
  }
};

module.exports = { getAllUsers, blockUser, unblockUser };
