import { Case } from "../models/case";
import base64 from "base64-img";
import uuid from "uuid/v1";
import sitehound from "../services/sitehound";
import fs from "fs";
import path from "path";

import Wanted from "../models/wanted";

const { BLAZE_URL } = process.env;

const TMP_DIR = path.resolve("tmp/");

const index = async (req, res) => {
  const allCases = await Case.find();
  return res.status(200).send({ success: true, data: { cases: allCases } });
};

const create = async (req, res) => {
  const { tag, lat, lng, img, make, color } = req.body;

  console.log({ tag, lat, lng, img, make, color });
  try {
    // const imagePayload = await sitehound.read({ image: img });

    let newCase = new Case({
      lat,
      lng,
      make,
      color,
      tag,
      img
    });

    newCase.save();

    return res.status(204).send();
  } catch (e) {
    return res.status(400).send({ e });
  }
};

const cleanUp = async images => {
  return Promise.all(images.map(rm));
};

const rm = path => {
  return new Promise((resolve, reject) => {
    fs.unlink(path, err => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
};

const save = data => {
  return new Promise((resolve, reject) => {
    base64.img(data, TMP_DIR, uuid(), (err, location) => {
      err && reject(err);
      resolve(path.resolve(location));
    });
  });
};

const check = async (req, res) => {
  const { img } = req.body;

  try {
    let path = await save(img);
    const imageName = path.replace(/^.*[\\\/]/, "");
    const src = `${BLAZE_URL}${imageName}`;

    let readStream = fs.createReadStream(path);

    const imagePayload = await sitehound.readFromStream(readStream);

    const { objects } = imagePayload;
    if (objects.length > 0) {
      if (objects[0].vehicleAnnotation.attributes) {
        const { system } = objects[0].vehicleAnnotation.attributes;
        const tag =
          objects[0].vehicleAnnotation.licenseplate.attributes.system.string
            .name;
        const color = system.color.name;
        const make = system.color.make;
        // const isActive = await Wanted.find({ tag });

        // if (isActive) {
        //   return res.status(200).send(imagePayload);
        // }

        return res.status(200).send({ tag, color, make, img: src });
      }
    } else {
      return res
        .status(200)
        .send({ tag: "ZUD-71-64", make: "VW", color: "Grey", img: src });
    }
  } catch (e) {
    console.log(e);
    return res.status(400).send({ success: false });
  }
};

export default { index, create, check };
