import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const getData = async (req, res) => {
  //Get the info for our buildings
  const buildingInfo = await mongoose.connection.db
    .collection("towns")
    .find({
      name: {
        $in: ["The Weapon Smith's", "The Armorer's", "The Training Fields"],
      },
    })
    .toArray(function (err, results) {
      return JSON.parse(results);
    });

  //Get the info for upgrade thresholds
  const buildingLevels = await mongoose.connection.db
    .collection("buildingLevels")
    .find({})
    .toArray(function (err, results) {
      return JSON.parse(results);
    });

  //build the response object
  let resObject = {};
  for (let i = 0; i < buildingInfo.length; i++) {
    if (buildingInfo[i].code == "weaponShop") {
      resObject.weaponLevel = buildingInfo[i].level;
      resObject.weaponDonation = buildingInfo[i].donations;
      resObject.weaponNextLevel =
        buildingLevels[
          buildingLevels.findIndex(
            (level) => level.level == buildingInfo[i].level + 1
          )
        ].price;
    } else if (buildingInfo[i].code == "armorShop") {
      resObject.armorLevel = buildingInfo[i].level;
      resObject.armorDonation = buildingInfo[i].donations;
      resObject.armorNextLevel =
        buildingLevels[
          buildingLevels.findIndex(
            (level) => level.level == buildingInfo[i].level + 1
          )
        ].price;
    } else if (buildingInfo[i].code == "training") {
      resObject.trainingLevel = buildingInfo[i].level;
      resObject.trainingDonation = buildingInfo[i].donations;
      resObject.trainingNextLevel =
        buildingLevels[
          buildingLevels.findIndex(
            (level) => level.level == buildingInfo[i].level + 1
          )
        ].price;
    }
  }

  return res.json(resObject);
};

const makeDonation = async (req, res) => {
  //Get player data
  const ObjectId = mongoose.Types.ObjectId;
  const user_id = new ObjectId(req.body.user);
  const player = await mongoose.connection.db
    .collection("players")
    .find({ user_id: user_id })
    .toArray(function (err, results) {
      return JSON.parse(results);
    });

  //Get building info
  const buildingCode = req.body.building;
  const buildingInfo = await mongoose.connection.db
    .collection("towns")
    .find({ code: buildingCode })
    .toArray(function (err, results) {
      return JSON.parse(results);
    });

  //Get build level Thresholds
  const buildingLevelThreshold = await mongoose.connection.db
    .collection("buildingLevels")
    .find({ level: buildingInfo[0].level + 1 })
    .toArray(function (err, results) {
      return JSON.parse(results);
    });

  //Get amount to donate
  const amount = Number(req.body.amount);

  try {
    if (amount <= player[0].gold && amount <= 100000) {
      await mongoose.connection.db
        .collection("towns")
        .updateOne({ code: buildingCode }, { $inc: { donations: amount } });
      if (
        buildingInfo[0].donations + amount >=
        buildingLevelThreshold[0].price
      ) {
        await mongoose.connection.db
          .collection("towns")
          .updateOne({ code: buildingCode }, { $inc: { level: 1 } });
        await mongoose.connection.db.collection("news").insertOne({
          playerRef: null,
          message:
            buildingInfo[0].name +
            " has been upgraded to level " +
            (buildingInfo[0].level + 1),
          eventDate: new Date().toISOString(),
        });
      }

      //Update players gold
      await mongoose.connection.db
        .collection("players")
        .updateOne({ _id: player[0]._id }, { $inc: { gold: -amount } });

      return res.json({
        message: "success",
        gold: player[0].gold - amount,
      });
    } else {
      return res.json({
        message: "failure",
        gold: player[0].gold,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export default { getData, makeDonation };
