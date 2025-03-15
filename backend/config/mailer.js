import nodemailer from "nodemailer";

import dotenv from "dotenv";
dotenv.config();

// + Create a transporter object
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// + Function to send a welcome email
const sendWelcomeEmail = async (toEmail) => {
  console.log("toEmail", toEmail);
  console.log("process.env.EMAIL_USER", process.env.EMAIL_USER);

  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: toEmail,
      subject: "Welcome to Our Platform 🎉",
      html: `
          <h2>Welcome, ${toEmail}!</h2>
          <p>We're excited to have you on board. Enjoy exploring our platform.</p>
          <br/>
          <p>Best regards,</p>
          <p><b>Team XYZ</b></p>
        `,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Welcome email sent successfully!");
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};

export default sendWelcomeEmail;
