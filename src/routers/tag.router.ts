import express from "express";
import { Tag } from "../models/entity/Tag.model";
import { BlogDataSource } from "../utils/datasource/data-source";
import Utils from "../utils/Utils";
export const tagRouter: express.IRouter = express.Router();

tagRouter.get("/", async (req, res) => {
  console.log('tag');
  
  try {
    const tagRepo = BlogDataSource.getRepository("Tag");
    const tag = new Tag();
    const result = await tagRepo.find();
    res.json(Utils.resposne(200, "success", result));
  } catch (error) {
    console.log(error);
    res.json(Utils.resposne(200, "fail", JSON.stringify(error)));
  }
});

tagRouter.get("/:skip/:take", async (req, res) => {
  try {
    const { skip, take } = req.params;
    console.log(req.params);
    
    const tagRepo = BlogDataSource.getRepository("Tag");
    const tag = new Tag();
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

tagRouter.post("/", async (req, res) => {
  try {
    const tagRepo = BlogDataSource.getRepository("Tag");
    const tag = new Tag();
    const result = await tagRepo.save(Object.assign(tag, req.body));
    res.json(Utils.resposne(200, "success", result));
  } catch (error) {
    console.log(error);
    res.json(Utils.resposne(200, "fail", JSON.stringify(error)));
  }
});

tagRouter.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const tagRepo = BlogDataSource.getRepository("Tag");
    const result = await tagRepo.update(id, req.body);
    res.json(Utils.resposne(200, "success", result));
  } catch (error) {
    console.log(error);
    res.json(Utils.resposne(200, "fail", JSON.stringify(error)));
  }
});
