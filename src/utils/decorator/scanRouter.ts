// // export const SCAN_TARGET_PATH = {
// //     ROUTER_PATH : path.join(__dirname,'../','routers'),
// //     SERVICE_PATH: path.join(__dirname,'../','services')
// // }
// import express, { RequestHandler } from "express";
// import {
//   METHOD_METADATA,
//   PATH_METADATA,
//   RequestMethod,
// } from "./router.decorator";
// import * as controllerMap from "../../routers/class";
// function getBasePath(target: Function): string {
//   const path = Reflect.getMetadata(PATH_METADATA, target);
//   return path;
// }
// function getMethodPath(
//   target: object,
//   method: RequestMethod
// ): {
//   path: string;
//   func: Function;
// } {
//   const path = Reflect.getMetadata(PATH_METADATA, target);
//   const func = Reflect.getMetadata(method, target);
//   return {
//     path,
//     func,
//   };
// }
// export function scanRouter(app: any) {
//   const controllers = Object.values(controllerMap);
//   for (const controller of controllers) {
//     // 基础请求路径
//     const basePath = getBasePath(controller);
//     // 拿到控制器类原型上的方法
//     const methodKeys = Object.keys(controller.prototype);
//     console.log(methodKeys);
//     const router = express.Router().get;
//     methodKeys.forEach((key) => {
//       if (isValidKey(key, controller.prototype)) {
//         const entityFunction = controller.prototype[key]; // 方法实体

//         // 获取请求路径
//         const reqPath = Reflect.getMetadata(PATH_METADATA, entityFunction);
//         // 获取请求方式
//         const reqMathod: any = Reflect.getMetadata(
//           METHOD_METADATA,
//           entityFunction
//         );

//         // 挂载函数参数
//         if (isValidKey(reqMathod, router)) {
//           const proxyFunction: any = function (req: any, res: any) {
//             let Param, Body, Query, Req, Res;
//             // 将可能的参数装饰器都读取一遍
//             const paramsDecorators = ["Param", "Body", "Query", "Req", "Res"];
//               // 获取函数参数列表
//             const entityParamList = getFunctionParams( entityFunction );
//             paramsDecorators.forEach((paramDecoratorName) => {
//               const paramIndex = Reflect.getMetadata(
//                 // 参数装时期的位置
//                 paramDecoratorName,
//                 entityFunction
//               );
//               const entityName = entityParamList[paramIndex]; // 形参名
//               if (paramDecoratorName === "Req") {
//                 entityParamList[paramIndex] = req;
//               }else if(paramDecoratorName === "Res"){
//                 entityParamList[paramIndex] = res;
//               }
//               console.log(paramIndex, entityParamList);
//             });
//             res.send(entityFunction(...[req,res]));
//           };

//           router[reqMathod](reqPath, proxyFunction);
//         } else {
//           throw TypeError(`${reqMathod} 错误`);
//         }
//       }
//     });

//     app.use(basePath, router);
//   }
// }

// export function isValidKey<T>(
//   key: string | number | symbol,
//   target: T
// ): key is keyof T {
//   return key in target;
// }

// export function getFunctionParams(func: Function) {
//   const funcStr = func.toString();
//   const result = funcStr.match(/(?<=function\s+\().+(?=\))/);
//   if (result === null) {
//     return [];
//   } else {
//     return result[0].split(",").map((param) => param.trim());
//   }
// }
