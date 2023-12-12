import { response } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

function computeDerivedStats(player) {
    let derivedStats = {}; //Empty object to hold all our fields

    derivedStats.hitpoints = Math.ceil(
        player.stats.level * 20 +
        player.stats.level * 1.2 * player.stats.strength +
        player.stats.level * 0.6 * player.stats.dexterity
    );

    derivedStats.stamina = Math.ceil(
        player.stats.level * 20 +
        player.stats.level * 1.2 * player.stats.dexterity +
        player.stats.level * 0.3 * player.stats.strength +
        player.stats.level * 0.3 * player.stats.intelligence
    );

    derivedStats.skillPoints = Math.ceil(
        0.8 * player.stats.strength +
        1.2 * player.stats.intelligence +
        0.8 * player.stats.dexterity
    );

    derivedStats.baseDmg = Math.ceil(
        5 +
        player.stats.strength +
        0.25 * player.stats.intelligence +
        0.25 * player.stats.dexterity
    );

    derivedStats.baseArmor = Math.ceil(
        5 +
        player.stats.dexterity +
        0.25 * player.stats.intelligence +
        0.25 * player.stats.strength
    );

    return derivedStats;
}

const levelUp = async (req, res) => {
    const ObjectId = mongoose.Types.ObjectId;
    const user_id = new ObjectId(req.body.user);

    //Get player data
    const player = await mongoose.connection.db
        .collection("players")
        .findOne({ user_id: user_id });

    const playerNextLvl = Math.ceil(
        5000 * (player.stats.level * Math.sqrt(Math.pow(player.stats.level, 3)))
    )
    const resObject = {}
    if (player.stats.experience >= playerNextLvl) {
        //player can level up 
        resObject.status = "Success"
        await mongoose.connection.db
            .collection("players")
            .updateOne(
                { user_id: user_id },
                { $inc: { "stats.level": 1 } }
            );

    } else {
        resObject.status = "Failure"
    }

    return res.json(resObject)
}


const buyStat = async (req, res) => {
    const ObjectId = mongoose.Types.ObjectId;
    const user_id = new ObjectId(req.body.user);

    //Get player data

    let player = await mongoose.connection.db
        .collection("players")
        .findOne({ user_id: user_id });


    let canUpgrade = true

    const statWanted = req.body.stat
    if (statWanted == "str") {
        //check if the player can efford upgrade
        if (player.stats.strength >= player.stats.level * 5) canUpgrade = false
        if (player.gold < player.stats.strength * player.stats.level * 500) canUpgrade = false
        if (player.stats.experience < player.stats.strength * player.stats.level * 50) canUpgrade = false

        if (canUpgrade) {
            await mongoose.connection.db
                .collection("players")
                .updateOne({ _id: player._id }, {
                    $inc: {
                        gold: -(player.stats.strength * player.stats.level * 500),
                        "stats.experience": -(player.stats.strength * player.stats.level * 50),
                        "stats.strength": 1
                    }
                });
        }
    }

    else if (statWanted == "dex") {
        if (player.stats.dexterity >= player.stats.level * 5) canUpgrade = false
        if (player.gold < player.stats.dexterity * player.stats.level * 500) canUpgrade = false
        if (player.stats.experience < player.stats.dexterity * player.stats.level * 50) canUpgrade = false

        if (canUpgrade) {
            await mongoose.connection.db
                .collection("players")
                .updateOne({ _id: player._id }, {
                    $inc: {
                        gold: -(player.stats.dexterity * player.stats.level * 500),
                        "stats.experience": -(player.stats.dexterity * player.stats.level * 50),
                        "stats.dexterity": 1
                    }
                });
        }
    }
    else if (statWanted == "int") {
        if (player.stats.intelligence >= player.stats.level * 5) canUpgrade = false
        if (player.gold < player.stats.intelligence * player.stats.level * 500) canUpgrade = false
        if (player.stats.experience < player.stats.intelligence * player.stats.level * 50) canUpgrade = false

        if (canUpgrade) {
            await mongoose.connection.db
                .collection("players")
                .updateOne({ _id: player._id }, {
                    $inc: {
                        gold: -(player.stats.intelligence * player.stats.level * 500),
                        "stats.experience": -(player.stats.intelligence * player.stats.level * 50),
                        "stats.intelligence": 1
                    }
                });
        }
    }
    if (!canUpgrade) {
        return res.json({ message: "denied" })
    }

    player = await mongoose.connection.db
        .collection("players")
        .findOne({ user_id: user_id });

    const derivedStats = computeDerivedStats(player)
    if (canUpgrade) {

        await mongoose.connection.db
            .collection("players")
            .updateOne({ _id: player._id }, {
                $set: {
                    "stats.hitpoints": derivedStats.hitpoints,
                    "stats.curHitpoints": derivedStats.hitpoints,
                    "stats.stamina": derivedStats.stamina,
                    "stats.curStamina": derivedStats.stamina,
                    "stats.skillPoints": derivedStats.skillPoints,
                    "stats.curSkillPoints": derivedStats.skillPoints,
                    "stats.baseDamage": derivedStats.baseDmg,
                    "stats.baseArmor": derivedStats.baseArmor,
                },

            });
        }

    return res.json({message: "success"})
}







export default { levelUp, buyStat }