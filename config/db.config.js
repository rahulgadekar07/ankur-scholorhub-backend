const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    rejectUnauthorized: true   // ✅ add if your DB host requires SSL
  }
});

// Test connection once on startup
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Connected to MySQL DB!');
    connection.release();
  } catch (err) {
    console.error('❌ MySQL connection error:', err);
  }
})();

// 🔄 Keep-alive ping every 30 seconds
setInterval(async () => {
  try {
    await pool.query("SELECT 1");
    console.log("✅ MySQL keep-alive ping");
  } catch (err) {
    console.error("❌ Keep-alive ping failed:", err.message);
  }
}, 30000);

module.exports = pool;
