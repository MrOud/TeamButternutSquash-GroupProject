import express from "express";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import Template from "./../template.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import newsRoutes from "./routes/news.routes.js";
import playerRoute from "./routes/player.routes.js";
import townRoutes from "./routes/town.routes.js";
import shopRoutes from "./routes/shops.routes.js";
import bankRoutes from "./routes/bank.routes.js";
import townhallRoutes from "./routes/townhall.routes.js";
import gateRoutes from "./routes/gate.routes.js";
import trainingRoutes from "./routes/training.routes.js";

const app = express();
const CURRENT_WORKING_DIR = process.cwd();

app.use(cors());
app.use(express.static(path.join(CURRENT_WORKING_DIR, "dist/app")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());

app.use("/", userRoutes);
app.use("/", authRoutes);
app.use("/", newsRoutes);
app.use("/", playerRoute);
app.use("/", townRoutes);
app.use("/", shopRoutes);
app.use("/", bankRoutes);
app.use("/", townhallRoutes);
app.use("/", gateRoutes);
app.use("/" , trainingRoutes);

// catchall
app.get('*', (req, res) => {
  res.sendFile(path.join(CURRENT_WORKING_DIR, 'dist/app', 'index.html'));
});

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ": " + err.message });
    console.log(err);
  }
});

export default app;
