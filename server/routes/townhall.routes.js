import express from "express";
import townhallCtrl from "../controllers/townhall.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

router
  .route("/api/townhall")
  .get(townhallCtrl.getData)
  .post(authCtrl.confirmAuthorization, townhallCtrl.makeDonation);

export default router;
