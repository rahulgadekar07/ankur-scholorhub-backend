//  emailService.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,     // your Gmail
    pass: process.env.EMAIL_PASS      // app password
  }
});
exports.sendWelcomeEmail = async (toEmail, fullName) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: "Welcome to ScholarHub!",
    html: `<p>Dear ${fullName},</p><p>Welcome to Ankur ScholarHub! We're excited to have you on board.</p>`
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully to", toEmail);
    return result;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

