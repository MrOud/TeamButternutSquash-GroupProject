import User from "../models/user.model.js";
import Player from "../models/player.model.js";
import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";
import config from "./../../config/config.js";
import mongoose from "mongoose";

const signin = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    let player = await Player.findOne({ user_id: user._id });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    if (!user.authenticate(req.body.password)) {
      return res.status(401).json({ error: "Could not sign in" });
    }
    const token = jwt.sign({ _id: user._id }, config.jwtSecret);
    res.cookie("t", token, { expire: new Date() + 1 });
    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        player: player ? player : null,
      },
    });
  } catch (err) {
    return res.status("401").json({ error: "Could not sign in" });
  }
};

const signout = (req, res) => {
  res.clearCookie("t");
  return res.status(200).json({
    message: "signed out",
  });
};

const requireSignin = expressjwt({
  secret: config.jwtSecret,
  algorithms: ["HS256"],
  userProperty: "auth",
});

const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!authorized) {
    return res.status(403).json({
      error: "User not authorized",
    });
  }
  next();
};

const confirmAuthorization = (req, res, next) => {
  //console.log(req.headers.authorization.split(" ")[1]);

  const verifiedID = jwt.verify(
    req.headers.authorization.split(" ")[1],
    config.jwtSecret
  )._id;
  const authorized = req.body.user == verifiedID;
  if (!authorized) {
    return res.status(403).json({
      error: "User not authorized",
    });
  }

  next();
};

export default {
  signin,
  signout,
  requireSignin,
  hasAuthorization,
  confirmAuthorization,
};
