// services/authService.js
const db = require("../config/db.config");

const signup = async (userData) => {
  const {
    full_name,
    email,
    password,
    role,
    phone,
    profile_image,
    address,
    dob,
    gender,
    bio,
    organization,
  } = userData;

  const sql = `
    INSERT INTO users (
      full_name, email, password, role,
      phone, profile_image, address, dob,
      gender, bio, organization
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    full_name,
    email,
    password,
    role,
    phone || null,
    profile_image || null,
    address || null,
    dob || null,
    gender || null,
    bio || null,
    organization || null,
  ];

  await db.query(sql, values);
};

const getUserByEmail = async (email) => {
  const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  return rows;
};

const getUserById = async (id) => {
  const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
  return rows.length > 0 ? rows[0] : null; // always return a single object or null
};

const updateUser = async (id, userData) => {
  const fields = [];
  const values = [];

  for (const [key, value] of Object.entries(userData)) {
    fields.push(`${key} = ?`);
    values.push(value);
  }

  const sql = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;
  values.push(id);

  await db.query(sql, values);
};

const updateUserProfileImage = async (id, profileImagePath) => {
  const sql = "UPDATE users SET profile_image = ? WHERE id = ?";
  await db.query(sql, [profileImagePath, id]);
};

module.exports = {
  signup,
  getUserByEmail,
  getUserById,
  updateUser,
  updateUserProfileImage,
};
