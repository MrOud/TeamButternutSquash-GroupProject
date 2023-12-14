import mongoose from "mongoose";
import config from "./config/config.js";
import app from "./server/express.js";
import path from "path";

mongoose.Promise = global.Promise;

mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: "lore",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Connected to database`);
  });

mongoose.connection.on("error", (error) => {
  console.log(error);
  throw new Error(`Unable to connect to database!`);
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Marketplace." });
});

app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info(`Server started on port ${config.port}`);
});

console.log(process.cwd());
