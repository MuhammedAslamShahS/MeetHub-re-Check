// routes/paymentRoutes.js
import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import User from "../models/User.js"; // to update plan
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

router.post("/create-order", async (req, res) => {
  const options = {
    amount: 100, // ₹199 in paise
    currency: "INR",
    receipt: "receipt_order_meethub_" + Date.now(),
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error("Razorpay Order Error:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
});

router.post("/verify-upgrade", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { subscriptionPlan: "pro" },
        { new: true }
      );
      return res.status(200).json({ success: true, user: updatedUser });
      
    } catch (err) {
      console.error("User update error:", err);
      return res.status(500).json({ error: "Could not update user plan" });
    }
  } else {
    return res.status(400).json({ error: "Invalid payment signature" });
  }
});

export default router;
