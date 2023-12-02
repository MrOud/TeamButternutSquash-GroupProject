import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const getBalance = async (req, res) => {
  const ObjectId = mongoose.Types.ObjectId;
  const user_id = new ObjectId(req.body.user);
  const player = await mongoose.connection.db
    .collection("players")
    .findOne({ user_id: user_id });
  const bankAccount = await mongoose.connection.db
    .collection("bankAccounts")
    .findOne({ player_id: player._id });

  if (bankAccount.length == 0) {
    //If a player has no account, create an account
    await mongoose.connection.db.collection("bankAccounts").insertOne({
      player_id: player._id,
      balance: 0,
    });
    return res.json({ goldOnHand: player.gold, goldAccount: 0 });
  } else {
    return res.json({
      goldOnHand: player.gold,
      goldAccount: bankAccount.balance,
    });
  }
  //console.log(player[0], bankAccount.length)
};

const makeTransaction = async (req, res) => {
  const ObjectId = mongoose.Types.ObjectId;
  const user_id = new ObjectId(req.body.user);
  const player = await mongoose.connection.db
    .collection("players")
    .findOne({ user_id: user_id });
  const bankAccount = await mongoose.connection.db
    .collection("bankAccounts")
    .findOne({ player_id: player._id });

  //get the amount
  const amount = Number(req.body.amount);
  try {
    if (req.body.action == "deposit") {
      if (amount <= player.gold) {
        await mongoose.connection.db
          .collection("bankAccounts")
          .updateOne({ player_id: player._id }, { $inc: { balance: amount } });
        await mongoose.connection.db
          .collection("players")
          .updateOne({ _id: player._id }, { $inc: { gold: -amount } });

        return res.json({
          message: "success",
          goldOnHand: player.gold - amount,
          goldAccount: bankAccount.balance + amount,
          shopMessage:
            'The teller takes the gold and slips it into a bag which disappears beneath the table. "We\'ll keep it safe and sound"',
        });
      } else {
        return res.json({
          message: "failure",
          goldOnHand: player.gold,
          goldAccount: bankAccount.balance,
          shopMessage:
            'The teller seems unamused, "To deposit an amount... one must have that of gold, you see."',
        });
      }
    } else if (req.body.action == "withdrawl") {
      if (amount <= bankAccount.balance) {
        await mongoose.connection.db
          .collection("bankAccounts")
          .updateOne({ player_id: player._id }, { $inc: { balance: -amount } });
        await mongoose.connection.db
          .collection("players")
          .updateOne({ _id: player._id }, { $inc: { gold: amount } });

        return res.json({
          message: "success",
          goldOnHand: player.gold + amount,
          goldAccount: bankAccount.balance - amount,
          shopMessage:
            'The teller disappears into the back room before returning with a small locking chest, they place the chest on the table and open it. "Here you are"',
        });
      } else {
        return res.json({
          message: "failure",
          goldOnHand: player.gold,
          goldAccount: bankAccount.balance,
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
