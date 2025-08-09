// services/authService.js
const db = require('../config/db.config');
const util = require('util');

const query = util.promisify(db.query).bind(db);

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

  await query(sql, values);
};

const getUserByEmail = async (email) => {
  const result = await query('SELECT * FROM users WHERE email = ?', [email]);
  return result;
};

const getUserById = async (id) => {
  const result = await query('SELECT * FROM users WHERE id = ?', [id]);
  return result[0];
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

  await query(sql, values);
};

module.exports = {
  signup,
  getUserByEmail,
  getUserById,
  updateUser
};
