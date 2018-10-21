import mongoose from "mongoose";
var Schema = mongoose.Schema;

const wantedSchema = new Schema({
  make: String,
  color: String,
  tag: String,
  img: String
});

let Wanted = mongoose.model("Wanted", wantedSchema);

export { Wanted };
