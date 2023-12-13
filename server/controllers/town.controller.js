import Town from "../models/town.model.js";
import extend from "lodash/extend.js";

const create = async (req, res) => {
  console.log(req.body);
  const town = new Town(req.body);
  console.log(town);
  try {
    await town.save();
    return res.status(200).json({
      message: "Town successfully added ",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Can not create town",
    });
  }
};

const list = async (req, res) => {
  try {
    let town = await Town.find();
    res.json(town);
  } catch (err) {
    return res.status(400).json({
      error: "can not find town",
    });
  }
};

const townByID = async (req, res, next, id) => {
  try {
    let town = await Town.findById(id);
    if (!town)
      return res.status(400).json({
        error: "town not found",
      });
    req.profile = town;
    next();
  } catch (err) {
    return res.status(400).json({
      error: "Could not retrieve town",
    });
  }
};

const update = async (req, res) => {
  try {
    let town = req.profile;
    town = extend(town, req.body);
    town.updated = Date.now();
    await town.save();
    res.json(town);
  } catch (err) {
    return res.status(400).json({
      error: "Could not update town",
    });
  }
};

const remove = async (req, res) => {
  try {
    let town = req.profile;
    let deletedTown = await town.remove();
    res.json(deletedUser);
  } catch (err) {
    return res.status(400).json({
      error: "Could not delete town",
    });
  }
};

const read = async (req, res) => {
  try {
    return res.json();
  } catch (err) {
    return res.status(400).json({
      error: "Could not read town",
    });
  }
};

export default { create, list, townByID, remove, update, read };
