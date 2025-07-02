import express from "express";
import JoinedEvent from "../models/JoinedEvent.js";

const router = express.Router();

// POST - Join an event
router.post("/", async (req, res) => {
  const { userId, eventId } = req.body;

  try {
    const alreadyJoined = await JoinedEvent.findOne({ userId, eventId });
    if (alreadyJoined) {
      return res.status(409).json({ message: "Already joined" });
    }

    const joined = new JoinedEvent({ userId, eventId });
    await joined.save();
    res.status(201).json(joined);
  } catch (err) {
    res.status(500).json({ message: "Failed to join event" });
  }
});

// GET - Fetch joined event IDs for a user
// GET - Fetch joined events with full event details
router.get("/:userId", async (req, res) => {
  try {
    const joined = await JoinedEvent.find({ userId: req.params.userId }).populate("eventId");
    res.status(200).json(joined);
  } catch (err) {
    res.status(500).json({ message: "Error fetching joined events" });
  }
});

export default router;
