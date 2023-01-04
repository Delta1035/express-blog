import express from "express";
import { User } from "../models/entity/User.model";
import { BlogDataSource } from "../utils/datasource/data-source";
import Utils from "../utils/Utils";
export const userRouter: express.IRouter = express.Router();

userRouter.get("/:skip/:take", async (req, res) => {
  try {
    const { skip, take } = req.params;
    const userRepo = BlogDataSource.getRepository("User");
    const user = new User();
    const result = await userRepo.find({
      skip: Number(skip),
      take: Number(take),
    });
    res.json(Utils.resposne(200, "success", result));
  } catch (error) {
    console.log(error);
    res.json(Utils.resposne(200, "fail", JSON.stringify(error)));
  }
});

userRouter.post("/", async (req, res) => {
  try {
    const userRepo = BlogDataSource.getRepository("User");
    const user = new User();
    user.role_id = 3; // 默认给访客权限
    const result = await userRepo.save(Object.assign(user, req.body));
    res.json(Utils.resposne(200, "success", result));
  } catch (error) {
    console.log(error);
    res.json(Utils.resposne(200, "fail", JSON.stringify(error)));
  }
});

userRouter.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const userRepo = BlogDataSource.getRepository("User");
    const result = await userRepo.update(id, req.body);
    res.json(Utils.resposne(200, "success", result));
  } catch (error) {
    console.log(error);
    res.json(Utils.resposne(200, "fail", JSON.stringify(error)));
  }
});
