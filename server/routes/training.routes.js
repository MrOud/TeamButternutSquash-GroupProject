import express from "express";
import trainingCtrl from "../controllers/training.controller.js"
import authCtrl from "../controllers/auth.controller.js";


const router = express.Router();

router
.route("/api/training/levelup")
.post(authCtrl.confirmAuthorization, trainingCtrl.levelUp)

export default router;
