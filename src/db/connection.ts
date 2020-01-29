import { createConnection, Connection } from "typeorm";

import { connectionOptions } from "config/index";

const connect = async (): Promise<Connection> => {
   return await createConnection(connectionOptions);
};
export { connect };
