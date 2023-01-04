import * as dotEnv from "dotenv";
export function configLoader() {
  dotEnv.config({
    path: `./${
      process.env.NODE_ENV === "development" ? "src" : "dist"
    }/assets/config/.env.${process.env.NODE_ENV}`,
  });
}
