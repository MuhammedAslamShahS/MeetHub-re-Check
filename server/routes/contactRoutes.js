import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: email, // sender’s email
      to: "ahaddesgins@gmail.com", // ✅ your receiving email
      subject: `📩 New Contact Form Message from ${name}`,
      html: `
        <h2>You've got a new message via MeetHub Contact</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Message sent successfully!" });
  } catch (err) {
    console.error("Nodemailer error:", err);
    res.status(500).json({ message: "Failed to send message." });
  }
});

export default router;
