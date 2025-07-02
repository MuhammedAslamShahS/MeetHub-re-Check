import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { sendOtpEmail } from "../utils/sendMail.js";
import { sendStatusEmail } from "../utils/sendStatusEmail.js";

const router = express.Router();

// Generate 6-digit OTP
const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();


// ✅ SIGNUP with OTP
router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = generateOTP();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    const newUser = await new User({
      fullName,
      email,
      password: hashedPassword,
      otp,
      otpExpiresAt,
      isVerified: false,
    }).save();

    await sendOtpEmail(email, otp);

    console.log(`📧 OTP sent to ${email}: ${otp}`);

    res.status(201).json({
      message: "Signup successful. Please verify OTP sent to your email.",
      userId: newUser._id,
    });
  } catch (err) {
    console.error("❌ Signup error:", err);
    res.status(500).json({ message: "Server error during signup" });
  }
});

// ✅ VERIFY OTP
router.post("/verify-otp", async (req, res) => {
  const { userId, otp } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Normalize OTPs
    const inputOtp = otp?.toString().trim();
    const storedOtp = user.otp?.toString().trim();

    if (storedOtp !== inputOtp || new Date() > user.otpExpiresAt) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiresAt = null;
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      message: "Email verified successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        subscriptionPlan: user.subscriptionPlan, // ✅ add this line
      },
      token,
    });
  } catch (err) {
    console.error("❌ OTP verification error:", err);
    res.status(500).json({ message: "Error verifying OTP" });
  }
});

// ✅ RESEND OTP
router.post("/resend-otp", async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.isVerified)
      return res.status(400).json({ message: "User already verified." });

    const newOtp = generateOTP();
    const newExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min from now

    user.otp = newOtp;
    user.otpExpiresAt = newExpiry;
    await user.save();

    await sendOtpEmail(user.email, newOtp);

    console.log(`📧 New OTP resent to ${user.email}: ${newOtp}`);

    res.status(200).json({ message: "OTP resent successfully." });
  } catch (err) {
    console.error("❌ Resend OTP error:", err);
    res.status(500).json({ message: "Failed to resend OTP." });
  }
});

// ✅ LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    if (!user.isVerified)
      return res
        .status(403)
        .json({ message: "Please verify your email first." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        subscriptionPlan: user.subscriptionPlan, // ✅ Important line
      },
      token,
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
});

router.put("/approve/:id", async (req, res) => {
  try {
    const updated = await Event.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );

    if (updated?.hostedBy) {
      await sendStatusEmail(
        updated.hostedBy,
        "✅ Your Event Has Been Approved!",
        `Your event <strong>"${updated.title}"</strong> has been approved and is now live on MeetHub.`
      );
    }

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to approve event" });
  }
});

router.delete("/reject/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    await event.deleteOne();

    if (event?.hostedBy) {
      try {
        await sendStatusEmail(
          event.hostedBy,
          "❌ Your Event Was Rejected",
          `Sorry, your event <strong>"${event.title}"</strong> was not approved on MeetHub.`
        );
        console.log("✅ Rejection mail sent to:", event.hostedBy);
      } catch (err) {
        console.error("❌ Failed to send rejection mail:", err);
      }
    }

    res.status(200).json({ message: "Event rejected and deleted." });
  } catch (err) {
    console.error("Error rejecting event:", err);
    res.status(500).json({ message: "Something went wrong." });
  }
});

// Request Password Reset OTP
router.post("/request-password-reset", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min
    await user.save();

    await sendOtpEmail(email, otp);
    res.status(200).json({ message: "OTP sent to your email." });
  } catch (err) {
    console.error("Error sending reset OTP:", err);
    res.status(500).json({ message: "Failed to send OTP" });
  }
});

// Verify OTP & Reset Password
router.post("/reset-password", async (req, res) => {
  const { email, otp, newPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.otp !== otp || new Date() > user.otpExpiresAt) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.otp = null;
    user.otpExpiresAt = null;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Password reset error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
