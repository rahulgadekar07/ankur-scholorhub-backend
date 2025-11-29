const otherService = require("../services/otherService");
const emailService = require("../services/emailService");

exports.submitFeedback = async (req, res) => {
  console.log("➡️ Received feedback:", req.body);

  try {
    const { user_id = null, name, email, mobile, message } = req.body || {};
    console.log("✅ Step 1: Input parsed");

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    await otherService.saveFeedback({ user_id, name, email, mobile, message });
    console.log("✅ Step 2: Saved to DB");

    await emailService.sendFeedbackAcknowledgement(email, name);

    return res.status(200).json({ success: true, message: "Feedback submitted successfully!" });
  } catch (error) {
    console.error("❌ Error in submitFeedback:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


exports.getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await otherService.fetchAllFeedbacks();
    res.status(200).json({
      success: true,
      message: "Feedbacks retrieved successfully",
      data: feedbacks,
    });
  } catch (error) {
    console.error("❌ Error retrieving feedbacks:", error);
    res.status(500).json({
      success: false,
      message: "Error retrieving feedbacks",
      error: error.message,
    });
  }
};
