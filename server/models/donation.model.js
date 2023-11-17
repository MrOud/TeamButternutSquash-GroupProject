const mongoose = require('mongoose');

// Define a schema for Player
const playerSchema = new mongoose.Schema({
  // Define fields relevant to Player, such as name, stats, etc.
  name: {
    type: String,
    required: true,
  },
  // Other player-related fields go here
});

// Define a schema for Donation
const donationSchema = new mongoose.Schema({
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  building: {
    type: String,
    required: true,
  },
});

// Create Player model
const Player = mongoose.model('Player', playerSchema);

// Create Donation model
const Donation = mongoose.model('Donation', donationSchema);

module.exports = { Player, Donation };
