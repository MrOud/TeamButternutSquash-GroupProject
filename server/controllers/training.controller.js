import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const levelUp = async (req, res) => {
    const ObjectId = mongoose.Types.ObjectId;
  const user_id = new ObjectId(req.body.user);

  //Get player data
  const player = await mongoose.connection.db
    .collection("players")
    .findOne({ user_id: user_id });

    const playerNextLvl =  Math.ceil(
        5000 * (player.stats.level * Math.sqrt(Math.pow(player.stats.level, 3)))
     )
     const resObject = {}
     if (player.stats.experience >= playerNextLvl)
     {
        //player can level up 
        resObject.status = "Success"
        await mongoose.connection.db
        .collection("players")
        .updateOne(
          { user_id: user_id },
          { $inc: { "stats.level": 1} }
        );

     } else {
        resObject.status = "Failure"
     }

    return res.json(resObject)
}



export default { levelUp}