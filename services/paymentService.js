const db = require("../config/db.config");

exports.saveOrder = async (orderData) => {
  const { order_id, amount, currency, name, email, status } = orderData;
  const sql = `
    INSERT INTO payments (order_id, amount, currency, name, email, status)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  await db.query(sql, [order_id, amount, currency, name, email, status]);
};

exports.updatePaymentStatus = async (order_id, status) => {
  const sql = `UPDATE payments SET status = ? WHERE order_id = ?`;
  await db.query(sql, [status, order_id]);
};
