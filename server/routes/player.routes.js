import express from "express";
import playerCtrl from "../controllers/player.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

router.route("/api/player").get(playerCtrl.list).post(playerCtrl.create);

router
  .route("/api/player/:playerById")
  .get(authCtrl.requireSignin, playerCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, playerCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, playerCtrl.remove);

router
  .route("/api/player/getGold")
  .post(authCtrl.confirmAuthorization, playerCtrl.getGold);

router
  .route("/api/player/getProfile")
  .post(authCtrl.confirmAuthorization, playerCtrl.getProfileStats);

router.param("playerId", playerCtrl.playerByID);

export default router;
