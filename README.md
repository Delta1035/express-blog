## express 博客后台

#### nodemon 监听文件变化,重启服务


## 目录结构
│  app.js                        // 入口文件
│  ecosystem.config.js           // pm2默认配置文件
│  package.json                  // npm包管理所需模块及配置信息
├─db
│      dbConfig.js               // mysql数据库基础配置
├─routes
│      index.js                  // 初始化路由信息，自定义全局异常处理
│      tasks.js                  // 任务路由模块
│      users.js                  // 用户路由模块
├─services
│      taskService.js            // 业务逻辑处理 - 任务相关接口
│      userService.js            // 业务逻辑处理 - 用户相关接口
└─utils
        constant.js              // 自定义常量
        index.js                 // 封装连接mysql模块
        md5.js                   // 后端封装md5方法
        user-jwt.js              // jwt-token验证和解析函数

## 插件
后端登录注册功能使用了jwt-token认证模式来实现。使用Express、express-validator、body-parser、boom、cors、jsonwebtoken、express-jwt、MySQL组件库来简化开发。

express-validator：一个基于Express的数据验证中间件，可以方便的判断传入的表单数据是否合法。body-parser：对post请求的请求体进行解析的express中间件。boom：处理程序异常状态，boom是一个兼容HTTP的错误对象，他提供了一些标准的HTTP错误，比如400(参数错误)等。cors：实现Node服务端跨域的JS库。jsonwebtoken：基于jwt的概念实现安全的加密方案库，实现加密token和解析token的功能。express-jwt：express-jwt是在jsonwebtoken的基础上做了上层封装，基于Express框架下认证jwt的中间件，来实现jwt的认证功能。MySQL：Node.js连接MySQL数据库。
## express
- resp.json()
> 将数据转化成json字符串, 并且自动resp.setHeader("Content-Type","application/json");
> 有了这个请求头 , 前端接受到数据后会自动将json解析成对象

- 获取请求参数的方式

  | 传值方式                        | 服务器取值方式                   | 备注router                                            |
  | ------------------------------- | -------------------------------- | ----------------------------------------------------- |
  | router.get('/param')            | req.query(查询传值)              | http://127.0.0.1:3000/user/param?name=zhangsan&age=18 |
  | router.get('/param/:name/:age') | req.param(路径传值)              | http://127.0.0.1:3000/user/param/zhangsan/18          |
  | router.post('/param')           | req.body(body传值)               |                                                       |
  | router.all('/param')            | req.param() 可以接收所有传值方式 |                                                       |

  

## 跨域问题

## esmodule 引入模块时 如果不加文件后缀会报错

## 