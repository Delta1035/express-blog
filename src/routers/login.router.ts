import express from "express";
import jwt from "jsonwebtoken";
import { BlogDataSource } from "../utils/datasource/data-source";
import Utils from "../utils/Utils";

const path = require("path");
export const loginRouter = express.Router();

loginRouter.post("/", async function (req, res) {
  try {
    const { user_name, password } = req.body;
    const userRepo = BlogDataSource.getRepository("User");
    const user = await userRepo.findOneBy({ user_name, password });
    if (user !== null) {
      const token = jwt.sign(req.body, "suibianxiede", { expiresIn: "12H" });
      const result = await userRepo.update(user.id, {token});
      res.json(Utils.resposne(200, "success", token));
    } else {
      res.json(Utils.resposne(200, "fail", "账号或密码错误！"));
    }
  } catch (error) {
    console.log(error);
    res.json(Utils.resposne(200, "fail", JSON.stringify(error)));
  }
});
