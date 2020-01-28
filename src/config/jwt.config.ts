import { IJWTOptions } from "types/index";

const isDev = process.env.NODE_ENV === "development";
const ONE_HOUR_SECONDS = 3600;
const accessTokenLife = isDev ? ONE_HOUR_SECONDS * 24 : ONE_HOUR_SECONDS * 1;
const refreshTokenLife = isDev
  ? ONE_HOUR_SECONDS * 24
  : ONE_HOUR_SECONDS * 24 * 60;
const JWTConfig: IJWTOptions = {
  secret: process.env.JWT_SECRET,
  accessLife: accessTokenLife,
  refreshLife: refreshTokenLife,
  alg: "HS256"
};
export { JWTConfig };
