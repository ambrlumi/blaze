import { Case } from "../models/case";
import base64 from "base64-img";
import uuid from "uuid/v1";
import { removeAllListeners } from "cluster";
import sitehound from "../services/sitehound";
import fs from "fs";
import path from "path";

const TMP_DIR = path.resolve("/tmp");

const index = async (req, res) => {
  const allCases = await Case.find();
  return res.status(200).send({ success: true, data: { cases: allCases } });
};

const create = async (req, res) => {
  const { tag, lat, lng, img } = req.body;

  try {
    const imagePayload = await sitehound.read({ image: img });

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
    let readStream = fs.createReadStream(path);

    const imagePayload = await sitehound.readFromStream(readStream);
    console.log({imagePayload});

    return res.status(200).send(imagePayload);
  } catch (e) {
    console.log(e);
    return res.status(400).send({ e });
  }
};

export default { index, create, check };
