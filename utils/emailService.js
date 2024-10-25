const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendAlertEmail = async (subject, message) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ALERT_EMAIL, // Uses ALERT_EMAIL from .env
    subject: subject,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Alert email sent to:", process.env.ALERT_EMAIL);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
