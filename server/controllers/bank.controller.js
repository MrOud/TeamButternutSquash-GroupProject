import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const getBalance = async (req, res) => {
  const ObjectId = mongoose.Types.ObjectId;
  const user_id = new ObjectId(req.body.user);
  const player = await mongoose.connection.db
    .collection("players")
    .find({ user_id: user_id })
    .toArray(function (err, results) {
      return JSON.parse(results);
    });
  const bankAccount = await mongoose.connection.db
    .collection("bankAccounts")
    .find({ player_id: player[0]._id })
    .toArray(function (err, results) {
      return JSON.parse(results);
    });

  if (bankAccount.length == 0) {
    //If a player has no account, create an account
    await mongoose.connection.db.collection("bankAccounts").insertOne({
      player_id: player[0]._id,
      balance: 0,
    });
    return res.json({ goldOnHand: player[0].gold, goldAccount: 0 });
  } else {
    return res.json({
      goldOnHand: player[0].gold,
      goldAccount: bankAccount[0].balance,
    });
  }
  //console.log(player[0], bankAccount.length)
};

const makeTransaction = async (req, res) => {
  const ObjectId = mongoose.Types.ObjectId;
  const user_id = new ObjectId(req.body.user);
  const player = await mongoose.connection.db
    .collection("players")
    .find({ user_id: user_id })
    .toArray(function (err, results) {
      return JSON.parse(results);
    });
  const bankAccount = await mongoose.connection.db
    .collection("bankAccounts")
    .find({ player_id: player[0]._id })
    .toArray(function (err, results) {
      return JSON.parse(results);
    });

  //get the amount
  const amount = Number(req.body.amount);
  try {
    if (req.body.action == "deposit") {
      if (amount <= player[0].gold) {
        await mongoose.connection.db
          .collection("bankAccounts")
          .updateOne(
            { player_id: player[0]._id },
            { $inc: { balance: amount } }
          );
        await mongoose.connection.db
          .collection("players")
          .updateOne({ _id: player[0]._id }, { $inc: { gold: -amount } });

        return res.json({
          message: "success",
          goldOnHand: player[0].gold - amount,
          goldAccount: bankAccount[0].balance + amount,
          shopMessage:
            'The teller takes the gold and slips it into a bag which disappears beneath the table. "We\'ll keep it safe and sound"',
        });
      } else {
        return res.json({
          message: "failure",
          goldOnHand: player[0].gold,
          goldAccount: bankAccount[0].balance,
          shopMessage:
            'The teller seems unamused, "To deposit an amount... one must have that of gold, you see."',
        });
      }
    } else if (req.body.action == "withdrawl") {
      if (amount <= bankAccount[0].balance) {
        await mongoose.connection.db
          .collection("bankAccounts")
          .updateOne(
            { player_id: player[0]._id },
            { $inc: { balance: -amount } }
          );
        await mongoose.connection.db
          .collection("players")
          .updateOne({ _id: player[0]._id }, { $inc: { gold: amount } });

        return res.json({
          message: "success",
          goldOnHand: player[0].gold + amount,
          goldAccount: bankAccount[0].balance - amount,
          shopMessage:
            'The teller disappears into the back room before returning with a small locking chest, they place the chest on the table and open it. "Here you are"',
        });
      } else {
        return res.json({
          message: "failure",
          goldOnHand: player[0].gold,
          goldAccount: bankAccount[0].balance,
          shopMessage:
            'The teller looks over their ledger before giving frowning, "I\'m afraid that isn\'t possible... unless you intend to rob us". The guard perks up at the mention of the word "rob"',
        });
      }
    }
  } catch (err) {
    console.log(err);
    return res.json({ message: "could not complete" });
  }
};

export default { getBalance, makeTransaction };
