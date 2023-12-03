import jwt from "jsonwebtoken";
import mongoose, { mongo } from "mongoose";

const checkForJourney = async (req, res) => {
  const ObjectId = mongoose.Types.ObjectId;
  const user_id = new ObjectId(req.body.user);
  const player = await mongoose.connection.db
    .collection("players")
    .findOne({ user_id: user_id });
  const journey = await mongoose.connection.db
    .collection("journies")
    .findOne({ player_id: player._id });

  if (journey == null) {
    return res.json({ result: false });
  } else {
    return res.json({
      result: true,
      journey: journey,
      stam: player.stats.stamina,
      curStam: player.stats.curStamina,
    });
  }
};

const startJourney = async (req, res) => {
  const ObjectId = mongoose.Types.ObjectId;
  const user_id = new ObjectId(req.body.user);
  const player = await mongoose.connection.db
    .collection("players")
    .findOne({ user_id: user_id });

  let journey = await mongoose.connection.db
    .collection("journies")
    .findOne({ player_id: player._id });

  if (journey == null) {
    await mongoose.connection.db.collection("journies").insertOne({
      player_id: player._id,
      round: 0,
      hard: 1 + (Math.random() - 0.5),
      reward: 1 + (Math.random() - 0.5),
    });
  }

  journey = await mongoose.connection.db
    .collection("journies")
    .findOne({ player_id: player._id });

  const resObject = {};
  resObject.journey = journey;
  resObject.stam = player.stats.stamina;
  resObject.curStam = player.stats.curStamina;
  return res.json(resObject);
};

const journeyPhase = async (req, res) => {
  const ObjectId = mongoose.Types.ObjectId;
  const user_id = new ObjectId(req.body.user);
  const player = await mongoose.connection.db
    .collection("players")
    .findOne({ user_id: user_id });

  let journey = await mongoose.connection.db
    .collection("journies")
    .findOne({ player_id: player._id });

  if (req.body.phase == "reroll") {
    if (journey.round < 3) {
      await mongoose.connection.db
        .collection("players")
        .updateOne({ _id: player._id }, { $inc: { "stats.curStamina": -1 } });
      await mongoose.connection.db.collection("journies").updateOne(
        { player_id: player._id },
        {
          $inc: { round: 1 },
          $set: {
            hard: 1 + (Math.random() - 0.5),
            reward: 1 + (Math.random() - 0.5),
          },
        }
      );
    }
    journey = await mongoose.connection.db
      .collection("journies")
      .findOne({ player_id: player._id });

    const resObject = {};
    resObject.journey = journey;
    resObject.stam = player.stats.stamina;
    resObject.curStam = player.stats.curStamina;

    return res.json(resObject);
  } else if (req.body.phase == "abandon") {
    await mongoose.connection.db
      .collection("journies")
      .deleteOne({ player_id: player._id });
    return res.json({ message: "JourneyAbandoned" });
  }
};

const startFight = async (req, res) => {
  const ObjectId = mongoose.Types.ObjectId;
  const user_id = new ObjectId(req.body.user);
  const player = await mongoose.connection.db
    .collection("players")
    .findOne({ user_id: user_id });

  let journey = await mongoose.connection.db
    .collection("journies")
    .findOne({ player_id: player._id });

  if (journey == null) return res.json({ message: "Error: No journey" });

  //Set the journey round to recognize fight started
  await mongoose.connection.db
    .collection("journies")
    .updateOne({ player_id: player._id }, { $set: { round: 4 } });
  ////Build a fight to send back
  //Computer level
  const resObject = {};
  if (journey.hard >= 1.1) {
    resObject.monsterLvl = player.stats.level + 1;
  } else if (journey.hard <= 0.9) {
    resObject.monsterLvl = player.stats.level - 1;
  } else {
    resObject.monsterLvl = player.stats.level;
  }
  if (resObject.monsterLvl == 0) resObject.monsterLvl = 1; //Cover edge case

  //Build stats
  let totalStats = resObject.monsterLvl * 10 + 10;

  let statsLeft = totalStats;
  let maxStat = resObject.monsterLvl * 5;
  let rando = Math.random(); //One variable to hold any anonymous randoms needed
  //Assign stats favoring Str
  if (rando < 0.25) {
    resObject.monsterDex = maxStat;
    statsLeft -= maxStat;
    resObject.monsterStr = Math.ceil(Math.random() * statsLeft);
    resObject.monsterInt = statsLeft - resObject.monsterStr;
  } else if (rando > 0.75) {
    resObject.monsterInt = maxStat;
    statsLeft -= maxStat;
    resObject.monsterStr = Math.ceil(Math.random() * statsLeft);
    resObject.monsterDex = statsLeft - resObject.monsterStr;
  } else {
    resObject.monsterStr = maxStat;
    statsLeft -= maxStat;
    resObject.monsterDex = Math.ceil(Math.random() * statsLeft);
    resObject.monsterInt = statsLeft - resObject.monsterDex;
  }

  //Compute derived stats
  resObject.monsterHp = Math.ceil(
    resObject.monsterLvl * 20 +
      resObject.monsterLvl * 1.2 * resObject.monsterStr +
      resObject.monsterLvl * 0.6 * resObject.monsterDex * journey.hard
  );
  resObject.monsterCurHp = resObject.monsterHp;

  resObject.baseDmg = Math.ceil(
    3 +
      resObject.monsterStr +
      0.25 * resObject.monsterInt +
      0.25 * resObject.monsterDex +
      Math.random() * resObject.monsterLvl * 3 * journey.hard
  );

  resObject.baseArmor = Math.ceil(
    3 +
      resObject.monsterDex +
      0.25 * resObject.monsterInt +
      0.25 * resObject.monsterStr +
      Math.random() * resObject.monsterLvl * 3 * journey.hard
  );

  resObject.gold = Math.ceil(
    resObject.monsterLvl * (Math.random() * 40 + 10) * journey.reward
  );

  resObject.exp = Math.ceil(
    (resObject.monsterLvl * Math.sqrt(Math.pow(resObject.monsterLvl, 3)) * 15) /
      Math.ceil(Math.random() * 10)
  );

  //attach monster to the journey
  await mongoose.connection.db
    .collection("journies")
    .updateOne({ player_id: player._id }, { $set: { monster: resObject } });

  return res.json(resObject);
};

const attack = async (req, res) => {
  const ObjectId = mongoose.Types.ObjectId;

  //Get needed data
  const user_id = new ObjectId(req.body.user);
  let player = await mongoose.connection.db
    .collection("players")
    .findOne({ user_id: user_id });

  let journey = await mongoose.connection.db
    .collection("journies")
    .findOne({ player_id: player._id });

  const weapon = await mongoose.connection.db
    .collection("weapons")
    .findOne({ _id: player.weapon });

  const armor = await mongoose.connection.db
    .collection("weapons")
    .findOne({ _id: player.armor });

  const monster = journey.monster;

  const resObject = {}; //build response object

  //Calculate damages
  const playerDmg = player.stats.baseDamage + weapon.dmgMod;
  const playerDef = player.stats.baseArmor + armor.dmgMod;
  let playerDeals =
    Math.ceil(playerDmg * Math.random() + playerDmg / 3) -
    Math.floor(monster.baseArmor * Math.random() + monster.baseArmor / 5);
  if (playerDeals < 0) playerDeals = 0;

  let monsterDeals =
    Math.ceil(monster.baseDmg * Math.random() + monster.baseDmg / 5) -
    Math.floor(playerDef * Math.random() + playerDef / 3);
  if (monsterDeals < 0) monsterDeals = 0;

  const monHpLeft = monster.monsterCurHp - playerDeals;
  const playerHpLeft = player.stats.curHitpoints - monsterDeals;

  console.log("player def: " + playerDef + " playerDmg: " + playerDmg);
  console.log(
    "player cHP: " +
      player.stats.curHitpoints +
      " monsterDeals: " +
      monsterDeals
  );
  console.log("monster: " + monHpLeft + " player: " + playerHpLeft);
  if (monHpLeft <= 0) {
    resObject.status = "victory";
    resObject.message = `You stand victorious, earning ${monster.gold} gold and ${monster.exp} experience`;
    //add gold and exp to player
    await mongoose.connection.db
      .collection("players")
      .updateOne(
        { _id: player._id },
        { $inc: { gold: monster.gold, "stats.experience": monster.exp } }
      );
    //remove the journey as it's complete
    await mongoose.connection.db
      .collection("journies")
      .deleteOne({ player_id: player._id });
  } else if (playerHpLeft <= 0) {
    let goldLost = Math.floor(player.gold / 2);
    resObject.status = "lose";
    resObject.message = `The monster deals ${monsterDeals} damage. You feel oddly peaceful before the world goes black... You have lost ${goldLost} gold`;
    await mongoose.connection.db
      .collection("players")
      .updateOne(
        { _id: player._id },
        { $inc: { gold: -goldLost }, $set: { "stats.curHitpoints": 1 } }
      );
    //remove the journey as it's complete
    await mongoose.connection.db
      .collection("journies")
      .deleteOne({ player_id: player._id });
  } else {
    resObject.status = "fight";
    resObject.message = `You deal ${playerDeals} damage, the monster deals ${monsterDeals} damage to you`;
    await mongoose.connection.db
      .collection("players")
      .updateOne(
        { _id: player._id },
        { $inc: { "stats.curHitpoints": -monsterDeals } }
      );
    await mongoose.connection.db
      .collection("journies")
      .updateOne(
        { player_id: player._id },
        { $inc: { "monster.monsterCurHp": -playerDeals } }
      );
  }

  journey = await mongoose.connection.db
    .collection("journies")
    .findOne({ player_id: player._id });

  resObject.journey = journey;

  player = await mongoose.connection.db
    .collection("players")
    .findOne({ user_id: user_id });
  resObject.player = player;

  return res.json(resObject);
};

export default {
  checkForJourney,
  startJourney,
  journeyPhase,
  startFight,
  attack,
};
