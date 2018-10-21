import { Case } from "../models/case";
import { removeAllListeners } from "cluster";
import sitehound from "../services/sitehound";

const index = async (req, res) => {
  const allCases = await Case.find();
  return res.status(200).send({ success: true, data: { cases: allCases } });
};

const create = async (req, res) => {
  const { tag, lat, lng, img } = req.body;

  try {
    const imagePayload = await sitehound.read({ image: img });

    console.log(imagePayload);

    // let newCase = new Case({
    //   lat,
    //   lng,
    //   make: "VW",
    //   color: "Blue",
    //   tag,
    //   img
    // });

    // newCase.save();

    return res.status(204).send();
  } catch (e) {
    return res.status(400).send({ e });
  }
};

export default { index, create };
