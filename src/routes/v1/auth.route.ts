import { Router } from "express";
const authRouter = Router();

authRouter.post("/sign-in", (req, res) => {
  res.send(new Date());
});
authRouter.post("/sign-up", (req, res) => {
  res.send(new Date().getSeconds);
});

export { authRouter };
