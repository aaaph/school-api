import { createConnection, ConnectionOptions, Connection } from "typeorm";
import { parse } from "pg-connection-string";

const parsedConnectionString = parse(process.env.DATABASE_URL);

const isDev = process.env.NODE_ENV === "development";

const connectionOptions: ConnectionOptions = {
  type: "postgres",
  host: parsedConnectionString.host,
  username: parsedConnectionString.user,
  password: parsedConnectionString.password,
  database: parsedConnectionString.database,
  synchronize: true,
  logging: false,
  entities: [...(isDev ? ["src/models/**/*.ts"] : ["dist/models/**/*.js"])]
};
const connect = async (): Promise<Connection> => {
  return await createConnection(connectionOptions);
};
export { connect };
