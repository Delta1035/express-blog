import express, { Request } from "express";
import { Article } from "../models/entity/Article.model";
import { UPLOAD_PATH } from "../utils/constant";
import { BlogDataSource } from "../utils/datasource/data-source";
import Utils from "../utils/Utils";

export const articleRouter: express.IRouter = express.Router();
// 配置文件上传路径
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, UPLOAD_PATH);
  },
  filename: function (req: any, file: any, cb: any) {
    const { fieldname, originalname, encoding, mimetype } = file;
    const ext = originalname.split(".")[1]
      ? "." + originalname.split(".")[1]
      : ".jpg";
    cb(null, originalname.split(".")[0] + "-" + Date.now() + ext);
  },
});
const upload = multer({
  storage: storage,
});

articleRouter.get("/count", async (req, res) => {
  try {
    const articleRepo = BlogDataSource.getRepository("Article");
    const articles = await articleRepo.count();
    res.json(Utils.resposne(200, "success", articles));
  } catch (error) {
    console.log(error);
    res.json(Utils.resposne(200, "fail", JSON.stringify(error)));
  }
});

articleRouter.get("/:skip/:take", async function (req, res) {
  console.log(req.params);
  const { skip, take } = req.params;
  try {
    const articleRepo = BlogDataSource.getRepository("Article");
    const articles = await articleRepo.find({
      skip: Number(skip),
      take: Number(take),
    });
    res.json(Utils.resposne(200, "success", articles));
  } catch (error) {
    console.log(error);
    res.json(Utils.resposne(200, "fail", JSON.stringify(error)));
  }
});
// TODO
articleRouter.get("/author_id/:author_id", (req, res) => {});

articleRouter.post(
  "/",
  upload.single("markdown"),
  (req: Request & any /*multer中间件挂载了file属性*/, res: any) => {
    console.log(req.file);
    res.send(req.file);
  }
);

articleRouter.post("/author_id/:author_id", async (req, res) => {
  try {
    const author_id = req.params.author_id;
    console.log(author_id);

    const articleRepo = BlogDataSource.getRepository("Article");
    const article = new Article();
    article.create_time = new Date();
    article.author_id = Number(author_id);
    article.summary = "";
    console.log(Object.assign(article, req.body));

    const result = await articleRepo.save(Object.assign(article, req.body));
    res.json(Utils.resposne(200, "success", result));
  } catch (error) {
    console.log(error);
    res.json(Utils.resposne(200, "fail", JSON.stringify(error)));
  }
});

articleRouter.get("/id", async (req, res) => {
  try {
    const {id} = req.query;
    console.log(id);
    const articleRepo = BlogDataSource.getRepository("Article");
    const result = await articleRepo.findOne({
      where: {
        id,
      },
    });
    console.log(result);
    res.json(Utils.resposne(200, "success", result));
  } catch (error) {
    console.log(error);
    res.json(Utils.resposne(200, "fail", JSON.stringify(error)));
  }
});

articleRouter.patch("/id/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const articleRepo = BlogDataSource.getRepository("Article");
    const article = new Article();
    article.deleted = 1;
    const result = await articleRepo.update(id, article);
    res.json(Utils.resposne(200, "success", result));
  } catch (error) {
    console.log(error);
    res.json(Utils.resposne(200, "fail", JSON.stringify(error)));
  }
});

articleRouter.put("/id/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const articleRepo = BlogDataSource.getRepository("Article");
    const article = new Article();
    const result = await articleRepo.update(
      id,
      Object.assign(article, req.body)
    );
    res.json(Utils.resposne(200, "success", result));
  } catch (error) {
    console.log(error);
    res.json(Utils.resposne(200, "fail", JSON.stringify(error)));
  }
});

articleRouter.delete("/id/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const articleRepo = BlogDataSource.getRepository("Article");
    const result = await articleRepo.delete(id);
    res.json(Utils.resposne(200, "success", result));
  } catch (error) {
    console.log(error);
    res.json(Utils.resposne(200, "fail", JSON.stringify(error)));
  }
});
