import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import joinedRoutes from "./routes/joinedRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import hostedRoutes from "./routes/hostedEvents.js";
import adminAuthRoutes from "./routes/adminAuth.js";
import contactRoutes from './routes/contactRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'

// import checkSubscription from "./middleware/checkSubscription.js";
// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/joined", joinedRoutes);
app.use("/api/events/hosted", hostedRoutes);
app.use("/api/admin", adminAuthRoutes);
app.use("/api/contact", contactRoutes);

// payment
app.use("/api/payment", paymentRoutes);

// Routes
app.use("/api/auth", authRoutes);      // Login, Signup
app.use("/api/events", eventRoutes);   // Host Event, Get All Events


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.log("❌ MongoDB connection error:", err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
