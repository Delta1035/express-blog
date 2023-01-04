#!/usr/bin/env node
import express from "express";
import fs from "fs";
import https from "https";
import http from 'http';
import path from "path";
import cors from "cors";
import { loadRouters } from "./utils/loader/router-loader";
import "reflect-metadata";
import { loginValidator } from "./middleware";
import { scanRouter } from "./utils/decorator/scanRouter";
import { configLoader } from "./utils/loader/config-loader";
require("dotenv").config(); // 加载环境变量
// console.log(process.env.PORT, typeof process.env.PORT);
// const __filename = fileURLToPath(import.meta.url);
const app: express.Application = express();
const httpOptions = {
  key: fs.readFileSync(path.join(__dirname, "./keys/privatekey.pem")),
  cert: fs.readFileSync(path.join(__dirname, "./keys/certificate.pem")),
};
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// 公开静态文件夹 ServeStaticOptions 配置静态文件 缓存等相关信息
app.use(express.static(__dirname + "/public"));
// 登陆验证
// app.use(loginValidator())
// 引入路由文件
loadRouters(app);
// 加载配置文件
configLoader();

async function main() {
  try {
    // await loadRouters(app);
    // scanRouter(app);
    http.createServer(app).listen(3000, "127.0.0.1", () => {
      console.log("server start 127.0.0.1:3000");
    });
  } catch (error) {
    console.log("error :>> ", error);
  }
}
main();
