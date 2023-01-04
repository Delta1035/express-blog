import express from "express";
import { Category } from "../models/entity/Category.model";
import { BlogDataSource } from "../utils/datasource/data-source";
import Utils from "../utils/Utils";
export const categoryRouter: express.IRouter = express.Router();

categoryRouter.get("/", async (req, res) => {
  console.log('Category');
  
  try {
    const tagRepo = BlogDataSource.getRepository("Category");
    const tag = new Category();
    const result = await tagRepo.find();
    res.json(Utils.resposne(200, "success", result));
  } catch (error) {
    console.log(error);
    res.json(Utils.resposne(200, "fail", JSON.stringify(error)));
  }
});

categoryRouter.get("/:skip/:take", async (req, res) => {
  try {
    const { skip, take } = req.params;
    console.log(req.params);
    
    const tagRepo = BlogDataSource.getRepository("Category");
    const tag = new Category();
    const result = await tagRepo.find({
      skip: Number(skip),
      take: Number(take),
    });
    res.json(Utils.resposne(200, "success", result));
  } catch (error) {
    console.log(error);
    res.json(Utils.resposne(200, "fail", JSON.stringify(error)));
  }
});

categoryRouter.post("/", async (req, res) => {
  try {
    const tagRepo = BlogDataSource.getRepository("Category");
    const tag = new Category();
    const result = await tagRepo.save(Object.assign(tag, req.body));
    res.json(Utils.resposne(200, "success", result));
  } catch (error) {
    console.log(error);
    res.json(Utils.resposne(200, "fail", JSON.stringify(error)));
  }
});

categoryRouter.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const tagRepo = BlogDataSource.getRepository("Category");
    const result = await tagRepo.update(id, req.body);
    res.json(Utils.resposne(200, "success", result));
  } catch (error) {
    console.log(error);
    res.json(Utils.resposne(200, "fail", JSON.stringify(error)));
  }
});
