import path from "path";
import express from "express";
import { BASE_PATH } from "../constant";

export async function loadRouters(app: express.Application) {
  const routers = await import(path.join(process.cwd(), `./${BASE_PATH}/routers`));
    // console.log(routers);
  for (const routerName of Object.keys(routers)) {
    const prePath =
      routerName.match(/^[a-z]+(?=[A-Z])/g) === null
        ? ""
        : (routerName.match(/^[a-z]+(?=[A-Z])/g) as any)[0];
        console.log('prePath :>>',prePath);
      
    app.use('/'+prePath, routers[routerName] as any);
  }
}

async function loadService() {
  const services = await import(path.join(__dirname, "../", "./services"));
  console.log(services);
}
