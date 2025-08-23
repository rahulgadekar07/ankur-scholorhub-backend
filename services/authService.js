// services/authService.js
const db = require('../config/db.config');

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
    organization
  } = userData;

  const sql = `
    INSERT INTO users (
      full_name, email, password, role,
      phone, profile_image, address, dob,
      gender, bio, organization
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    full_name, email, password, role,
    phone || null, profile_image || null, address || null, dob || null,
    gender || null, bio || null, organization || null
  ];

  await db.query(sql, values);
};

const getUserByEmail = async (email) => {
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    console.log("Email query result:", rows);
    return rows; // <-- return just the rows
  } catch (error) {
    console.error("Error in getUserByEmail:", error);
    throw error;
  }
};


const getUserById = async (id) => {
  const rows = await db.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0];
};

const updateUser = async (id, userData) => {
  const fields = [];
  const values = [];

  for (const [key, value] of Object.entries(userData)) {
    fields.push(`${key} = ?`);
    values.push(value);
  }

  const sql = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;
  values.push(id);

  await db.query(sql, values);
};

module.exports = {
  signup,
  getUserByEmail,
  getUserById,
  updateUser
};
