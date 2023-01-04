import * as dotEnv from "dotenv";
import { BASE_PATH } from "../constant";
export function configLoader() {
  console.log('datasource config path :>> ',`./${BASE_PATH}/assets/config/.env.${process.env.NODE_ENV}`);
  
  dotEnv.config({
    path: `./${BASE_PATH}/assets/config/.env.${process.env.NODE_ENV}`,
  });
}
