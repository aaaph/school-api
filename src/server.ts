import { createServer } from "http";
import { app } from "./app";

import { connect as databaseConnect } from "./config";

const port = process.env.PORT;

databaseConnect()
  .then(connection => {
    createServer(app).listen(port || 3000, () => {
      console.log(`server start listen port ${port}`);
    });
  })
  .catch(err => {
    console.log(err);
  });
