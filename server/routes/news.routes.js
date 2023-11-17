import express from "express";
import newsCtrl from "../controllers/news.controller.js";

const router = express.Router();

router.route("/api/news").get(newsCtrl.list).post(newsCtrl.create);

export default router;
