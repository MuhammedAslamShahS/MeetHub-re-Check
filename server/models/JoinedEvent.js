import mongoose from "mongoose";

const joinedEventSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true }, // ✅ Fix type
  registeredAt: { type: Date, default: Date.now },
});

const JoinedEvent = mongoose.model("JoinedEvent", joinedEventSchema);

export default JoinedEvent;
