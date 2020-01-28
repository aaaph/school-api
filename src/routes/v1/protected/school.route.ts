import { Router } from "express";

const schoolRouter = Router();

schoolRouter.get("/", (req, res) => {
  res.send("aee");
});

export { schoolRouter };
