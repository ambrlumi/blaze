import * as mongoose from "mongoose";
import moment from "moment";
var Schema = mongoose.Schema;

const currentDate = moment().format("MMMM Do YYYY, h:mm:ss a");

const caseSchema = new Schema({
  lat: Number,
  lng: Number,
  make: String,
  color: String,
  tag: String,
  img: String,
  date: { type: String, default: currentDate }
});

let Case = mongoose.model("Case", caseSchema);

export { Case };
