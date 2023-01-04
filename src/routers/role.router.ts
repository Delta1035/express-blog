import express from "express";
import { Role } from "../models/entity/Role.model";
import { BlogDataSource } from "../utils/datasource/data-source";
import Utils from "../utils/Utils";
export const roleRouter: express.IRouter = express.Router();

roleRouter.get("/", async (req, res) => {
    try {
      const roleRepo = BlogDataSource.getRepository("Role");
      const role = new Role();
      const result = await roleRepo.find();
          res.json(Utils.resposne(200,'success', result));

    } catch (error) {
      console.log(error);
      res.json(Utils.resposne(200,'fail', JSON.stringify(error)));
    }
  });

roleRouter.get("/:skip/:take", async (req, res) => {
  try {
    const { skip, take } = req.params;
    const roleRepo = BlogDataSource.getRepository("Role");
    const role = new Role();
    const result = await roleRepo.find({
      skip: Number(skip),
      take: Number(take),
    });
        res.json(Utils.resposne(200,'success', result));

  } catch (error) {
    console.log(error);
    res.json(Utils.resposne(200,'fail', JSON.stringify(error)));
  }
});

roleRouter.post("/", async (req, res) => {
  try {
    const roleRepo = BlogDataSource.getRepository("Role");
    const role = new Role();
    const result = await roleRepo.save(Object.assign(role, req.body));
        res.json(Utils.resposne(200,'success', result));

  } catch (error) {
    console.log(error);
    res.json(Utils.resposne(200,'fail', JSON.stringify(error)));
  }
});

roleRouter.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const roleRepo = BlogDataSource.getRepository("Role");
    const result = await roleRepo.update(id, req.body);
        res.json(Utils.resposne(200,'success', result));

  } catch (error) {
    console.log(error);
    res.json(Utils.resposne(200,'fail', JSON.stringify(error)));
  }
});


