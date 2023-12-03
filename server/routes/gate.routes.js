import express from "express";
import gateCtrl from "../controllers/gate.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

router
  .route("/api/gate/journey/")
  .post(authCtrl.confirmAuthorization, gateCtrl.checkForJourney);

router
  .route("/api/gate/start/")
  .post(authCtrl.confirmAuthorization, gateCtrl.startJourney);

router
  .route("/api/gate/nextPhase")
  .post(authCtrl.confirmAuthorization, gateCtrl.journeyPhase);

router
  .route("/api/gate/startFight")
  .post(authCtrl.confirmAuthorization, gateCtrl.startFight);

router
  .route("/api/gate/attack")
  .post(authCtrl.confirmAuthorization, gateCtrl.attack);

export default router;
