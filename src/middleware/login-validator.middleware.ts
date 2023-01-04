import jwt from "jsonwebtoken";

export function loginValidator() {
  // TODO 验证相关操作
  return (req:any, resp:any, next:any)=>{
    if (req.url !== "/user/login" && req.url !== "/user/register") {
      // const token = req.body.token || req.query.token || req.headers.token;
      const token = req.headers.authorization;
      if (token) {
        jwt.verify(token, "suibianxiede", (error:any, decode:any) => {
          if (error) {
            resp.json({
              msg: "请登陆",
              code: "401",
            });
          } else {
            next();
          }
        });
      } else {
        resp.json({
          msg: "请登陆",
          code: "401",
        });
      }
    } else {
      next();
    }
  }
}
