import mongoose from 'mongoose';

const PlayerSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Name is required',
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
  },
});

export default mongoose.model('Player', PlayerSchema);