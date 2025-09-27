// controllers/adminController.js
const adminService = require("../services/adminService");

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
    await adminService.updateUserStatus(id, false);
    res.status(200).json({ success: true, message: "User blocked successfully" });
  } catch (error) {
    console.error("Block user error:", error);
    res.status(500).json({ success: false, message: "Failed to block user" });
  }
};

// Unblock user
const unblockUser = async (req, res) => {
  try {
    const { id } = req.params;
    await adminService.updateUserStatus(id, true);
    res.status(200).json({ success: true, message: "User unblocked successfully" });
  } catch (error) {
    console.error("Unblock user error:", error);
    res.status(500).json({ success: false, message: "Failed to unblock user" });
  }
};

module.exports = { getAllUsers, blockUser, unblockUser };