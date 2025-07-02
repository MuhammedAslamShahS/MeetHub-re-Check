// routes/adminAuth.js
import express from "express";
const router = express.Router();

const ADMIN_EMAIL = "admin@meethub.com";
const ADMIN_PASSWORD = "admin123"; // 🔐 You can hash this later if needed

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return res.status(200).json({ token: "secure_admin_token" });
  }

  return res.status(401).json({ message: "Invalid admin credentials" });
});

export default router;
