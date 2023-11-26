import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const buyWeapons = async (req, res) => {
  return res.json({ message: "ok" });
};

const listWeapons = async (req, res) => {
  //Get the current level of the weapon smith's shop
  const buildingLevel = await mongoose.connection.db
    .collection("towns")
    .find({ name: "The Weapon Smith's" })
    .toArray(function (err, results) {
      return JSON.parse(results);
    });

  //Get a list of all unlocked weapons
  const weaponList = await mongoose.connection.db
    .collection("weapons")
    .find({ buildLevel: { $gt: 0, $lte: buildingLevel[0].level } })
    .toArray(function (err, results) {
      return JSON.parse(results);
    });
  return res.json({ weaponList });
};

const buyArmor = async (req, res) => {
  console.log(req);
  return res.json({ message: "ok" });
};

const listArmor = async (req, res) => {
  const armorList = await mongoose.connection.db
    .collection("armor")
    .find()
    .toArray(function (err, results) {
      return JSON.parse(results);
    });
  return res.json({ list: armorList });
};

export default { buyWeapons, listWeapons, buyArmor, listArmor };
