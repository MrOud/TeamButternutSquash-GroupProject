import mongoose from "mongoose";

const PlayerSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Name is required",
    unique: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: "Character must be linked to a player",
    unique: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
  stats: {
    strength: {
      type: Number,
      default: 0,
    },
    dexterity: {
      type: Number,
      default: 0,
    },
    intelligence: {
      type: Number,
      default: 0,
    },
    hitpoints: {
      type: Number,
      default: 100,
    },
    stamina: {
      type: Number,
      default: 100,
    },
    skillPoints: {
      type: Number,
      default: 0,
    },
    baseDamage: {
      type: Number,
      default: 10,
    },
    baseArmor: {
      type: Number,
      default: 5,
    },
    luck: {
      type: Number,
      default: 0,
    },
    experience: {
      type: Number,
      default: 0,
    },
    level: {
      type: Number,
      default: 1,
    },
  },
  weapon: {
    type: Number,
    default: 1000,
  },
  armor: {
    type: Number,
    default: 1000,
  },
  gold: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("Player", PlayerSchema);
