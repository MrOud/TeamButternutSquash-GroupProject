import mongoose from "mongoose";
import Player from "../models/player.model.js";
import extend from "lodash/extend.js";

const create = async (req, res) => {
  console.log(req.body);
  const player = new Player(req.body);

  // check for user_id
  if (!player.user_id) {
    return res.status(400).json({
      error: "User ID is required",
    });
  }

  // validate incoming player
  if (!player.name || player.name.length < 3) {
    return res.status(400).json({
      error: "Name is required",
    });
  }

  const stats = [
    player.stats.strength,
    player.stats.dexterity,
    player.stats.intelligence,
  ];

  // validate incoming stats
  if (stats.reduce((a, b) => a + b, 0) !== 10) {
    return res.status(400).json({
      error: "Total stats must equal 10",
    });
  }
  if (
    player.stats.strength < 0 ||
    player.stats.dexterity < 0 ||
    player.stats.intelligence < 0
  ) {
    return res.status(400).json({
      error: "Stats must be greater than 0",
    });
  }
  if (
    player.stats.strength > 5 ||
    player.stats.dexterity > 5 ||
    player.stats.intelligence > 5
  ) {
    return res.status(400).json({
      error: "Stats must be less than 5",
    });
  }

  try {
    await player.save();
    console.log("Player added!");
    await mongoose.connection.db.collection("news").insertOne({
      playerRef: null,
      message: "[" + player.name + "]" + " has entered the realm!",
      eventDate: new Date().toISOString(),
    });
    return res.status(200).json({
      message: "Player added!",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Could not create player",
    });
  }
};

const list = async (req, res) => {
  try {
    let player = await Player.find();
    res.json(player);
  } catch (err) {
    return res.status(400).json({
      error: "Could not retrieve players",
    });
  }
};

const playerByID = async (req, res, next, id) => {
  try {
    let player = await Player.findById(id);
    if (!player)
      return res.status("400").json({
        error: "Player not found",
      });
    req.profile = player;
    next();
  } catch (err) {
    return res.status("400").json({
      error: "Could not retrieve player",
    });
  }
};

const playerByUserID = async (req, res) => {
  try {
    let player = await Player.findOne({ user_id: req.params.userId });
    if (!player)
      return res.status("400").json({
        error: "Player not found",
      });
    req.profile = player;
    res.json(player);
  } catch (err) {
    return res.status("400").json({
      error: "Could not retrieve player",
    });
  }
};

const update = async (req, res) => {
  try {
    let player = req.profile;
    player = extend(player, req.body);
    player.updated = Date.now();
    await player.save();
    res.json(player);
  } catch (err) {
    return res.status(400).json({
      error: "Could not update player",
    });
  }
};

const remove = async (req, res) => {
  try {
    let player = req.profile;
    let deletedPlayer = await player.remove();
    deletedPlayer.hashed_password = undefined;
    deletedPlayer.salt = undefined;
    res.json(deletedPlayer);
  } catch (err) {
    return res.status(400).json({
      error: "Could not delete player",
    });
  }
};

const read = async (req, res) => {
  try {
    return res.json();
  } catch (err) {
    return res.status(400).json({
      error: "Could not update user",
    });
  }
};

const getGold = async (req, res) => {
  const ObjectId = mongoose.Types.ObjectId;
  const user_id = new ObjectId(req.body.user);
  try {
    const player = await mongoose.connection.db
      .collection("players")
      .find({ user_id: user_id })
      .toArray(function (err, results) {
        return JSON.parse(results);
      });
    return res.json({ gold: player[0].gold });
  } catch (err) {
    return res.json({ message: "Error" });
  }
};

export default {
  create,
  playerByID,
  list,
  remove,
  update,
  read,
  playerByUserID,
  getGold,
};
