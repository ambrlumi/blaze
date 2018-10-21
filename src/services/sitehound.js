import axios from "axios";

const SITEHOUND_URL = "https://dev.sighthoundapi.com/v1";
const { SITEHOUND_TOKEN } = process.env;

const si = axios.create({
  baseURL: SITEHOUND_URL,
  headers: {
    "Content-Type": "application/json",
    "X-Access-Token": SITEHOUND_TOKEN
  }
});

const read = image =>
  new Promise(async (resolve, reject) => {
    try {
      const { data } = await si.post(
        "/recognition?objectType=vehicle,licenseplate",
        JSON.stringify(image)
      );

      resolve(data.objects);
    } catch (e) {
      reject(e);
    }
  });

export default { read };
