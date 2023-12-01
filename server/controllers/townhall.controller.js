import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const getData = async (req, res) => {
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

  return res.json(buildingInfo);
};

const makeDonation = async (req, res) => {
  const ObjectId = mongoose.Types.ObjectId;
  const user_id = new ObjectId(req.body.user);
  const player = await mongoose.connection.db
    .collection("players")
    .find({ user_id: user_id })
    .toArray(function (err, results) {
      return JSON.parse(results);
    });

  const building = req.body.building;
  const amount = Number(req.body.amount);
  try {
    console.log(amount, player[0].gold);
    if (amount <= player[0].gold) {
      if (building == "weapon") {
        //Update building donations
        await mongoose.connection.db
          .collection("towns")
          .updateOne(
            { name: "The Weapon Smith's" },
            { $inc: { donations: amount } }
          );
        //Updtae players gold
        await mongoose.connection.db
          .collection("players")
          .updateOne({ _id: player[0]._id }, { $inc: { gold: -amount } });

        const buildingInfo = await mongoose.connection.db
          .collection("towns")
          .find({ name: "The Weapon Smith's" })
          .toArray(function (err, results) {
            return JSON.parse(results);
          });

        return res.json({
          buildingLvl: buildingInfo[0].level,
          buildingDonation: buildingInfo[0].donations,
          gold: player[0].gold - amount,
        });
      }
    } else {
      return res.json({ message: "No" });
    }
  } catch (err) {
    console.log(err);
  }
};

export default { getData, makeDonation };
