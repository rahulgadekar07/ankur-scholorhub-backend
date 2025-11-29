// services/emailService.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,  // your Gmail
    pass: process.env.EMAIL_PASS,  // your app password
  },
});

// ✅ Generic reusable sender
const sendEmail = async (toEmail, subject, html) => {
  const mailOptions = {
    from: `"Ankur ScholarHub" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject,
    html,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log(`📧 Email sent successfully to ${toEmail}`);
    return result;
  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw error;
  }
};

// 📨 Welcome Email
exports.sendWelcomeEmail = async (toEmail, fullName) => {
  const subject = "Welcome to ScholarHub!";
  const html = `
    <p>Dear ${fullName},</p>
    <p>Welcome to <strong>Ankur ScholarHub</strong>! We're excited to have you on board.</p>
    <p>Start exploring the platform and make the most of your experience.</p>
    <p>Warm regards,<br/>Team Ankur ScholarHub</p>
  `;
  return sendEmail(toEmail, subject, html);
};

// 🛑 Account Blocked
exports.sendAccountBlockedEmail = async (toEmail, fullName) => {
  const subject = "Your ScholarHub Account Has Been Deactivated";
  const html = `
    <p>Dear ${fullName},</p>
    <p>We wanted to inform you that your ScholarHub account has been <strong>temporarily deactivated</strong> by our administrators.</p>
    <p>If you believe this was a mistake, please contact our support team for assistance.</p>
    <br/>
    <p>Thank you for your understanding,<br/>Team Ankur ScholarHub</p>
  `;
  return sendEmail(toEmail, subject, html);
};

// ✅ Account Unblocked
exports.sendAccountUnblockedEmail = async (toEmail, fullName) => {
  const subject = "Your ScholarHub Account Has Been Reactivated";
  const html = `
    <p>Dear ${fullName},</p>
    <p>Good news — your account has been <strong>reactivated</strong> by our admin team.</p>
    <p>You can now log in and continue using ScholarHub as usual.</p>
    <p>We’re happy to have you back,<br/>Team Ankur ScholarHub</p>
  `;
  return sendEmail(toEmail, subject, html);
};
// ✅ Feedback Acknowledgement Email
exports.sendFeedbackAcknowledgement = async (toEmail, fullName) => {
  const subject = "Thanks for contacting Ankur ScholarHub!";
  const html = `
    <p>Dear ${fullName},</p>
    <p>Thank you for reaching out to us. We have received your message and our team will get back to you shortly.</p>
    <p>Your feedback is valuable to us and helps us serve you better.</p>
    <br/>
    <p>Warm regards,<br/><strong>Team Ankur ScholarHub</strong></p>
  `;
  return sendEmail(toEmail, subject, html);
};
// ✅ Donation Confirmation Email
exports.sendDonationConfirmation = async (toEmail, donorName, amount) => {
  const subject = "Thank You for Your Donation to Ankur ScholarHub!";
  const html = `
    <p>Dear ${donorName},</p>
    <p>We sincerely thank you for your generous donation of <strong>₹${amount}</strong>.</p>
    <p>Your support helps us continue empowering students through scholarships, resources, and learning opportunities.</p>
    <p>We truly appreciate your kindness and contribution.</p>
    <br/>
    <p>Warm regards,<br/><strong>Team Ankur ScholarHub</strong></p>
  `;
  return sendEmail(toEmail, subject, html);
};
