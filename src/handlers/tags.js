import { Case } from "../models/case";
import { removeAllListeners } from "cluster";

const index = (req, res) => {
  const data = {
    cases: [
      {
        lat: "81.2354",
        lng: "-25.4244",
        make: "VW",
        color: "Blue",
        tag: "XXX234"
      },
      {
        lat: "81.2354",
        lng: "-25.4244",
        make: "VW",
        color: "Blue",
        tag: "XXX234"
      }
    ]
  };

  return res.status(200).send({ success: true, data: data });
};

const create = (req, res) => {
  let testCase = new Case({
    lat: "81.2354",
    lng: "-25.4244",
    make: "VW",
    color: "Blue",
    tag: "XXX234"
  });

  testCase.save();

  return res.status(204).send();
};

export default { index, create };
