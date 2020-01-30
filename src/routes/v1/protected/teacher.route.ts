import { Router } from "express";

const teacherRouter = Router();

teacherRouter.get("/", (req, res) => {
   res.sendStatus(200);
});

export { teacherRouter };
