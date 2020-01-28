import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";

import "module-alias/register";

import { router } from "./routes";
import { errorMiddleware } from "./middlewares";

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use("/api", router);
app.use(errorMiddleware());
export { app };
