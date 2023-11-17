import Player from "../models/player.model.js";
import extend from "lodash/extend.js";

const create = async (req, res) => {
  console.log(req.body);
  const player = new Player(req.body);
  try {
    await player.save();
    return res.status(200).json({
      message: "Player added!",
    });
  } catch (err) {
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

export default { create, playerByID, list, remove, update, read };
