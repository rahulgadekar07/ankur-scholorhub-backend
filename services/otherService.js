// services/otherService.js
const db = require("../config/db.config");

// Save feedback/contact message
exports.saveFeedback = async (feedbackData) => {
  try {
    if (!feedbackData) {
      console.error("❌ saveFeedback called without data!");
      return;
    }

    const { user_id = null, name, email, mobile, message } = feedbackData;

    const sql = `
      INSERT INTO feedbacks (user_id, name, email, mobile, message)
      VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = await db.query(sql, [user_id, name, email, mobile, message]);
    return result;
  } catch (error) {
    console.error("❌ Error saving feedback:", error);
    throw new Error("Database error while saving feedback");
  }
};

// Fetch all feedbacks
exports.fetchAllFeedbacks = async () => {
  try {
    const [feedbacks] = await db.query(`SELECT * FROM feedbacks ORDER BY datetime DESC`);
    return feedbacks;
  } catch (error) {
    console.error("❌ Error fetching feedbacks:", error);
    throw new Error("Database error while fetching feedbacks");
  }
};
