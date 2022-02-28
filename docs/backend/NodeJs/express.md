# express 中间件

> 文档：<https://www.expressjs.com.cn/>
## 概念

- 中间件的概念就是在业务流程过程中，逐步处理的环节。类似于在工业废水排放的过程中，逐步过滤有害物质的流程。
- 在代码层次上，就是对服务器端接受的请求，使用中间件做预处理。
- 中间件是一个函数，包含 req, res, next 三个参数，next() 参数把流转关系交给下一个中间件或路由。所以说有无 next 是判断一个函数为中间件的标准。

特性：

- `next()`是必须的，在它后面不用再写代码了。
- 多个中间件共享 `req、res` 对象。

## 使用

可使用 express.use 来定义全局的中间件，会在每一个请求进来的时候，逐步处理请求。

```js
const express = require('express');

const app = express();

// 这个定义的一个普通的中间件, 局部使用
const mv1 = (req, res, next) => {
  console.log('这是一个普通的中间件！');
  next();
};
// 全局的中间件
app.use((req, res, next) => {
  console.log('这个第一个中间件!');
  req.a = 1;
  next();
});

app.use((req, res, next) => {
  console.log('这个第二个中间件!' + req.a);
  next();
});

app.get('/', mv1, (req, res) => {
  res.send('HOME PAGE!' + req.a);
});

app.get('/user', (req, res) => {
  res.send('USER PAGE!');
});

app.listen(8888, () => {
  console.log('express server running at http://127.0.0.1');
});
```

## 注意

- 一定要在定义路之前注册中间件
- 执行完中间件的业务代码后一定要调用 next()
- 为了防止代码混乱，在 next() 之后不写任何代码逻辑

## 分类

- 应用级别的中间件：通过 app.use app.get app.post 等，绑定到 app 实例上的中间件。
- 路由级别的中间件：express.Router() 绑定到 router 实例上的中间件。
- 错误级别的中间件：专门用来捕获发生的异常，防止系统崩溃。必须包含 4 个形参，分别是 err、req、res、next 
  - 必须注册在所有路由之后，才会工作！
- 内置中间件：
  - express.static() 快速托管静态资源
  - express.json() 解析 JSON 格式的请求体数据(4.16.0+) 
    - `app.use(express.json())`
  - express.urlencoded()解析 url-encoded 格式的表单数据(4.16.0+) 
    - `app.use(express.urlencoded({ extended: false }))`
- 第三方中间件：
  - body-parser 解析请求体数据

## 自定义中间件

