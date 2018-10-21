import axios from "axios";

const SITEHOUND_URL = "https://dev.sighthoundapi.com/v1";
const { SITEHOUND_TOKEN } = process.env;

const si = axios.create({
  baseURL: SITEHOUND_URL
});

const read = image =>
  new Promise(async (resolve, reject) => {
    try {
      const { data } = await si.post(
        "/recognition?objectType=vehicle,licenseplate",
        JSON.stringify(image),
        {
          headers: {
            "Content-Type": "application/json",
            "X-Access-Token": SITEHOUND_TOKEN
          }
        }
      );

      resolve(data.objects);
    } catch (e) {
      reject(e);
    }
  });

const readFromStream = imageStream =>
  new Promise(async (resolve, reject) => {
    try {
      const { data } = await si.post(
        "/recognition?objectType=vehicle,licenseplate",
        imageStream,
        {
          headers: {
            "Content-Type": "application/octet-stream",
            "X-Access-Token": SITEHOUND_TOKEN
          }
        }
      );

      resolve(data);
    } catch (e) {
      console.log(e.data);
      reject(e);
    }
  });

export default { read, readFromStream };
