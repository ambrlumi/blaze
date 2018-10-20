import { Router } from "express";
import tags from "../handlers/tags";

const apiRouter = Router();

apiRouter.get("/tags", tags.index);
apiRouter.post("/tag", tags.create);

export { apiRouter };
