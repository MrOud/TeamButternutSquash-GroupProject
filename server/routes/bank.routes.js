import express from "express";
import bankCtrl from "../controllers/bank.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

router
  .route("/api/bank/")
  .post(authCtrl.confirmAuthorization, bankCtrl.getBalance);

router
  .route("/api/bank/transact")
  .post(authCtrl.confirmAuthorization, bankCtrl.makeTransaction);

export default router;
