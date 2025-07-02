// routes/eventRoutes.js
import express from "express";
import Event from "../models/Event.js"; // Your Event model
const router = express.Router();
import User from "../models/User.js";
// POST /api/events
router.post("/", async (req, res) => {
  try {
    const { title, description, date, gameImage, game, userId, hostedBy } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // 💡 Check if the user is on the free plan and has already hosted 2 events
    if (user.subscriptionPlan === "free" && user.eventCount >= 2) {
      return res.status(403).json({
        message: "Free plan limit reached. Please upgrade to Pro to host more events.",
        upgrade: true,
      });
    }

    // ✅ Create event
    const newEvent = new Event({
      title,
      description,
      date,
      gameImage,
      game,
      userId,
      hostedBy,
      isApproved: false,
    });

    await newEvent.save();

    // 💾 Increment user’s event count only if on free plan
    if (user.subscriptionPlan === "free") {
      user.eventCount += 1;
      await user.save();
    }

    res.status(201).json(newEvent);
  } catch (err) {
    console.error("Error creating event:", err);
    res.status(500).json({ message: "Error creating event" });
  }
});


// REJECT - Delete unapproved event by ID
router.delete("/reject/:id", async (req, res) => {
  try {
    const deleted = await Event.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event rejected and deleted." });
  } catch (err) {
    console.error("Reject error:", err);
    res.status(500).json({ message: "Failed to reject event." });
  }
});

router.get("/all", async (req, res) => {
  try {
    const allEvents = await Event.find();
    res.status(200).json(allEvents);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch all events" });
  }
});

// ✅ Approve event by ID (admin only)
router.put("/approve/:id", async (req, res) => {
  try {
    const updated = await Event.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to approve event" });
  }
});




// GET /api/events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch events" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete event" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update event" });
  }
});


// GET /api/events/:id — fetch single event
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch event" });
  }
})

router.get("/my-events/:userId", async (req, res) => {
  try {
    const events = await Event.find({ userId: req.params.userId });
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: "Error getting your events" });
  }
});

export default router;