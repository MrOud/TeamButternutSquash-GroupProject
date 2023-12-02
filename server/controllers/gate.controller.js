import jwt from "jsonwebtoken";
import mongoose, { mongo } from "mongoose";

const checkForJourney = async (req, res) => {
  const ObjectId = mongoose.Types.ObjectId;
  const user_id = new ObjectId(req.body.user);
  const player = await mongoose.connection.db
    .collection("players")
    .findOne({ user_id: user_id });
  const journey = await mongoose.connection.db
    .collection("journies")
    .findOne({ player_id: player._id });

  if (journey == null) {
    return res.json({ result: false });
  } else {
    return res.json({ result: true, journey: journey });
  }
};

const startJourney = async (req, res) => {
  const ObjectId = mongoose.Types.ObjectId;
  const user_id = new ObjectId(req.body.user);
  const player = await mongoose.connection.db
    .collection("players")
    .findOne({ user_id: user_id });

  let journey = await mongoose.connection.db
    .collection("journies")
    .findOne({ player_id: player._id });

  if (journey == null) {
    await mongoose.connection.db.collection("journies").insertOne({
      player_id: player._id,
      round: 0,
      hard: 1 + (Math.random() - 0.5),
      reward: 1 + (Math.random() - 0.5),
    });
  }

  journey = await mongoose.connection.db
    .collection("journies")
    .findOne({ player_id: player._id });

  return res.json(journey);
};

const journeyPhase = async (req, res) => {
  const ObjectId = mongoose.Types.ObjectId;
  const user_id = new ObjectId(req.body.user);
  const player = await mongoose.connection.db
    .collection("players")
    .findOne({ user_id: user_id });

  let journey = await mongoose.connection.db
    .collection("journies")
    .findOne({ player_id: player._id });

  console.log(journey);
  if (journey.round < 3) {
    await mongoose.connection.db
      .collection("players")
      .updateOne({ _id: player._id }, { $inc: { "stats.curStamina": -1 } });
    await mongoose.connection.db.collection("journies").updateOne(
      { player_id: player._id },
      {
        $inc: { round: 1 },
        $set: {
          hard: 1 + (Math.random() - 0.5),
          reward: 1 + (Math.random() - 0.5),
        },
      }
    );
  }

  journey = await mongoose.connection.db
    .collection("journies")
    .findOne({ player_id: player._id });

  const resObject = {};
  resObject.journey = journey;

  return res.json(resObject);
};

const startFight = async (req, res) => {
  return res.json({ message: "FIGHT!" });
};

export default { checkForJourney, startJourney, journeyPhase, startFight };
