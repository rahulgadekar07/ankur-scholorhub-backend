// db.js
const pool = require('../config/db.config');

async function query(sql, params) {
  const [rows] = await pool.query(sql, params);
  return rows;
}

module.exports = { query };
