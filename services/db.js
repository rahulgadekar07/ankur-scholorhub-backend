const pool = require('../config/db.config');

async function query(sql, params) {
  try {
    const [rows] = await pool.query(sql, params);
    return rows;
  } catch (err) {
    // If connection was reset, try once more
    if (err.code === 'ECONNRESET') {
      console.warn('⚠️ ECONNRESET detected, retrying query...');
      try {
        const [rows] = await pool.query(sql, params);
        return rows;
      } catch (retryErr) {
        console.error('❌ Retry failed:', retryErr.message);
        throw retryErr;
      }
    }
    throw err;
  }
}

module.exports = { query };
