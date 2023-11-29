import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const buyWeapons = async (req, res) => {
  const ObjectId = mongoose.Types.ObjectId;
  const user_id = new ObjectId(req.body.user);
  const wep_id = req.body.purchase;

  //Get player data
  const player = await mongoose.connection.db
    .collection("players")
    .find({ user_id: user_id })
    .toArray(function (err, results) {
      return JSON.parse(results);
    });
  //Get the weapon data
  const weapon = await mongoose.connection.db
    .collection("weapons")
    .find({ _id: wep_id })
    .toArray(function (err, results) {
      return JSON.parse(results);
    });
  console.log(player, weapon);
  //Is the economically viable?
  if (player[0].gold >= weapon[0].price) {
    //Affordable branch

    //Is the player's current weapon already better?
    if (player[0].weapon >= weapon[0]._id) {
      return res.json({ message: "PurchaseDown" });
    }
    //Update player's weapon & Deduct player's gold
    await mongoose.connection.db
      .collection("players")
      .updateOne(
        { user_id: user_id },
        { $set: { weapon: wep_id, gold: player[0].gold - weapon[0].price } }
      );

    return res.json({ message: "PurchaseComplete" });
  } else {
    //Can't afford branch
    return res.json({ message: "PurchaseDenied" });
  }
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
  const ObjectId = mongoose.Types.ObjectId;
  const user_id = new ObjectId(req.body.user);
  const arm_id = req.body.purchase;

  //Get player data
  const player = await mongoose.connection.db
    .collection("players")
    .find({ user_id: user_id })
    .toArray(function (err, results) {
      return JSON.parse(results);
    });
  //Get the weapon data
  const armor = await mongoose.connection.db
    .collection("armor")
    .find({ _id: arm_id })
    .toArray(function (err, results) {
      return JSON.parse(results);
    });

  //Is the economically viable?
  if (player[0].gold >= armor[0].price) {
    //Affordable branch

    //Is the player's current weapon already better?
    if (player[0].armor >= armor[0]._id) {
      return res.json({ message: "PurchaseDown" });
    }
    //Update player's weapon & Deduct player's gold
    await mongoose.connection.db
      .collection("players")
      .updateOne(
        { user_id: user_id },
        { $set: { armor: arm_id, gold: player[0].gold - armor[0].price } }
      );

    return res.json({ message: "PurchaseComplete" });
  } else {
    //Can't afford branch
    return res.json({ message: "PurchaseDenied" });
  }
};

const listArmor = async (req, res) => {
  //Get the current level of the armor shop
  const buildingLevel = await mongoose.connection.db
    .collection("towns")
    .find({ name: "The Armorer's" })
    .toArray(function (err, results) {
      return JSON.parse(results);
    });

  //Get a list of all unlocked weapons
  const armorList = await mongoose.connection.db
    .collection("armor")
    .find({ buildLevel: { $gt: 0, $lte: buildingLevel[0].level } })
    .toArray(function (err, results) {
      return JSON.parse(results);
    });
  return res.json({ armorList });
};

export default { buyWeapons, listWeapons, buyArmor, listArmor };
