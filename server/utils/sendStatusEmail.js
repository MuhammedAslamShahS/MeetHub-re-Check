// utils/sendStatusEmail.js
import nodemailer from "nodemailer";

export const sendStatusEmail = async (toEmail, subject, message) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"MeetHub" <${process.env.MAIL_USER}>`,
    to: toEmail,
    subject,
    html: `
      <div style="font-family: sans-serif; background: #fff; padding: 20px; border-radius: 10px;">
        <h2>${subject}</h2>
        <p>${message}</p>
        <br />
        <small>If you believe this was a mistake, please contact support@meethub.gg</small>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
