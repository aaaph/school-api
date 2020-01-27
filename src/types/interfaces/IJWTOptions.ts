export interface IJWTOptions {
  secret: string;
  accessLife: number;
  refreshLife: number;
  alg: string;
}
