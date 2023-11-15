import mongoose from 'mongoose';

const BuildingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  level: {
    type: Number,
    default: 1,
  },
  donations: [
    {
      player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
      },
      amount: {
        type: Number,
        default: 0,
      },
    },
  ],
});

const TownSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  buildings: [BuildingSchema],
});

export default mongoose.model('Town', TownSchema);
