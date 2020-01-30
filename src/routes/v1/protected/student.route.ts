import { Router } from "express";

const studentRouter = Router();

studentRouter.get("/", (req, res) => {
   res.sendStatus(200);
});

export { studentRouter };
