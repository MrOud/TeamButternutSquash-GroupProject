import express from "express";
import townCtrl from "../controllers/town.controller.js";
import authCtrl from "../controllers/auth.controller.js";
import authController from "../controllers/auth.controller.js";

const router = express.Router();

router.route("/api/town").get(townCtrl.list).post(townCtrl.create);

router
  .route("/api/town/:townById")
  .get(authCtrl.requireSignin, townCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, townCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, townCtrl.remove);

router.param("townById", townCtrl.townByID);

export default router;
