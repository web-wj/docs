# 服务端渲染

> https://v3.cn.vuejs.org/guide/ssr/introduction.html
> 
- 数据的填充在服务器端进行的，网页是渲染好之后再返回的。首页的渲染，seo 且更快，交互简单的！

- 服务端渲染需要消耗更多的服务器资源，cpu、内存等，对seo更友好，客户端渲染可以将资源部署到cdn上，实现高并发。

- 如果你正在使用 webpack，你可以通过 [prerender-spa-plugin](https://github.com/chrisvfritz/prerender-spa-plugin) 来支持预渲染。该插件已经被大量的 Vue 应用检验过。

## vue 服务器渲染的实现

- 1

