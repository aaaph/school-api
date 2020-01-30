import { Router } from "express";

import { AuthService } from "controllers/localAuth.controller";

const authRouter = Router();

authRouter.post("/sign-in", AuthService.sing_in);
authRouter.post("/sign-up", AuthService.sign_up);

export { authRouter };
