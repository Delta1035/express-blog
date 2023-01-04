import { DataSource } from "typeorm";
import { Article } from "../../models/entity/Article.model";
import { Category } from "../../models/entity/Category.model";
import { Role } from "../../models/entity/Role.model";
import { Tag } from "../../models/entity/Tag.model";
import { User } from "../../models/entity/User.model";
console.log("host :>> ", process.env.HOST);

export const BlogDataSource = new DataSource({
  type: "mysql",
  host: process.env.HOST,
  port: Number(process.env.PORT),
  username: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  synchronize: false,
  logging: false,
  entities: [User, Article, Tag, Role, Category],
  migrations: [],
  subscribers: [],
});
BlogDataSource.initialize()
  .then(() => {
    console.log("BlogDataSource initialize success!");
  })
  .catch((error) => {
    console.log(error);
  });
