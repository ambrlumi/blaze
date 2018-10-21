import "./env";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import * as mongoose from "mongoose";
import path from "path";
import { apiRouter } from "./routes";

const { PORT = 3000 } = process.env;

const app = express();
const { DB_URL } = process.env;

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
app.use(express.static(path.resolve("tmp")));

app.use("/api", apiRouter);

var db = mongoose
  .connect(
    DB_URL,
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
