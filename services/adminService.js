// services/adminService.js
const db = require("../config/db.config");

// Get all users
const getAllUsers = async () => {
  const [rows] = await db.query("SELECT id, full_name, email, role, is_active, created_at FROM users");
  return rows;
};

// Update user status (block/unblock)
const updateUserStatus = async (id, isActive) => {
  await db.query("UPDATE users SET is_active = ? WHERE id = ?", [isActive, id]);
};

module.exports = { getAllUsers, updateUserStatus };