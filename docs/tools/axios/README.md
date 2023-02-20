# axios

> 利用 json-server 简易搭建接口测试
> https://www.axios-http.cn/docs/intro

## 取消请求

- 配置对象 cancelToken (deprecated)
- AbortController

```js
const controller = new AbortController();

axios.get('/foo/bar', {
   signal: controller.signal
}).then(function(response) {
   //...
});
// 取消请求
controller.abort()
```

## 源码分析

- axios 的创建过程分析
