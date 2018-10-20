import * as mongoose from "mongoose";
var Schema = mongoose.Schema;

const caseSchema = new Schema({
  lat: Number,
  lng: Number,
  make: String,
  color: String,
  tag: String
});

let Case = mongoose.model("Case", caseSchema);

export { Case };
