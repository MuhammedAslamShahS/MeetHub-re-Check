import express from "express";
import Event from "../models/Event.js";

const router = express.Router();

// GET - Fetch hosted events for a user
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const hostedEvents = await Event.find({ userId: req.params.userId });
    res.status(200).json(hostedEvents);
  } catch (err) {
    console.error("Error fetching hosted events:", err);
    res.status(500).json({ message: "Failed to fetch hosted events" });
  }
});

export default router;
