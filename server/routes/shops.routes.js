import express from "express";
import shopsCtrl from "../controllers/shops.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

router
  .route("/api/shops/weapon")
  .get(shopsCtrl.listWeapons)
  .post(authCtrl.confirmAuthorization, shopsCtrl.buyWeapons);

router
  .route("/api/shops/armor")
  .get(shopsCtrl.listArmor)
  .post(authCtrl.requireSignin, shopsCtrl.buyArmor);

export default router;
