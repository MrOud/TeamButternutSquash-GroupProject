import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema({
  eventDate: {
    type: Date,
    trim: true,
    default: Date.now,
  },

  playerRef: {
    type: String,
    trim: true,
    required: "player ID required",
  },

  message: {
    type: String,
    trim: true,
    required: "message required",
  },
});

export default mongoose.model("News", NewsSchema);
