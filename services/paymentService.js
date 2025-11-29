const db = require("../config/db.config");

// Save new order
exports.saveOrder = async (orderData) => {
  const { order_id, amount, currency, name, email, status } = orderData;
  const sql = `
    INSERT INTO payments (order_id, amount, currency, name, email, status)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  await db.query(sql, [order_id, amount, currency, name, email, status]);
};

// Update payment status and return order details
exports.updatePaymentStatus = async (order_id, status) => {
  try {
    // Update payment status
    const updateSql = `UPDATE payments SET status = ? WHERE order_id = ?`;
    await db.query(updateSql, [status, order_id]);

    // Fetch donor info for email
    const selectSql = `SELECT name, email, amount FROM payments WHERE order_id = ?`;
    const [rows] = await db.query(selectSql, [order_id]);

    return rows && rows.length ? rows[0] : null;
  } catch (error) {
    console.error("❌ Error updating payment status:", error);
    throw error;
  }
};
