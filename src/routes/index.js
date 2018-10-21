import { Router } from "express";
import tags from "../handlers/tags";
import { Wanted } from "../models/wanted";
import amber from "../services/amber";

const apiRouter = Router();

apiRouter.get("/tags", tags.index);
apiRouter.post("/create", tags.create);
apiRouter.post("/check", tags.check);


apiRouter.get("/test", async (req, res) => {
  for (var a of amber) {
    var toSave = new Wanted({
      make: a.make,
      color: a.color,
      tag: a.tag,
      img: a.img
    });

    await toSave.save();
  }

  return res.send(200);
});

export { apiRouter };
