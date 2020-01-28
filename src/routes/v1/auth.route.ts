import { Router } from "express";
console.log(require("controllers/index"));

import { AuthService } from "controllers/index";

const authRouter = Router();

authRouter.post("/sign-in", (req, res) => {
  res.send(new Date());
});
authRouter.post("/sign-up", AuthService.sign_up);

export { authRouter };
