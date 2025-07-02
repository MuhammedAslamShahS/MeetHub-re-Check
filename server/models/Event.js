import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  game: String,
  date: String,
  gameImage: String,
  hostedBy: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  isApproved: {
    type: Boolean,
    default: false, // default to not approved
  },
}, { timestamps: true });

export default mongoose.model("Event", eventSchema);
