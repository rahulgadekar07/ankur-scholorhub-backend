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

module.exports = {
  signup,
  getUserByEmail
};
