import * as mongoose from "mongoose";
var Schema = mongoose.Schema;

const caseSchema = new Schema({
  lat: String,
  lng: String,
  make: String,
  color: String,
  tag: String
});

let Case = mongoose.model("Case", caseSchema);

export { Case };
