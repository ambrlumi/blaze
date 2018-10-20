import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import * as mongoose from "mongoose";

import { apiRouter } from "./routes";

const { PORT = 3000 } = process.env;

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));

app.use("/api", apiRouter);

var db = mongoose
  .connect(
    "mongodb://root:example@localhost:27017/admin?readPreference=primary",
    { useNewUrlParser: true, dbName: "blaze" }
  )
  .then(() => {
    console.log("connected");
    startSever();
  })
  .catch(err => console.log(err));

const startSever = () => {
  app.listen(PORT, err => {
    err && console.log(err.message);
    console.log(`> API listening on port ${PORT}`);
  });
};

export default app;
