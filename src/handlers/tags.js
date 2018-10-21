import { Case } from "../models/case";
import { removeAllListeners } from "cluster";

const index = async (req, res) => {
  const allCases = await Case.find();
  return res.status(200).send({ success: true, data: { cases: allCases } });
};

const create = (req, res) => {
  const { tag, lat, lng, img } = req.body;

  let newCase = new Case({
    lat,
    lng,
    make: "VW",
    color: "Blue",
    tag,
    img
  });

  newCase.save();

  return res.status(204).send();
};

export default { index, create };
