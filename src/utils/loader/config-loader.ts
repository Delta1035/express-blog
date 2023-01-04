import * as dotEnv from "dotenv";
export function configLoader() {
  dotEnv.config({
    path: `./src/config/.env.${process.env.NODE_ENV}`,
  });
}
