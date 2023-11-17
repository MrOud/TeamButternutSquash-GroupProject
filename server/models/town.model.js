import mongoose from "mongoose";

const TownSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  level: {
    type: Number,
    default: 1,
  },
  donations: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("Town", TownSchema);
