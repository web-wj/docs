# base-interview

> 记录面试过程中遇到的一些基础性的问题，做简单的回顾总结。

## vue2 & vue3 

### vue2

- [生命周期的理解](https://blog.csdn.net/qq_40756247/article/details/90668073)
- [nextTick 的理解](https://vue3js.cn/interview/vue/nexttick.html#%E4%B8%80%E3%80%81nexttick%E6%98%AF%E4%BB%80%E4%B9%88)
- [vue 的渲染机制](https://staging-cn.vuejs.org/guide/extras/rendering-mechanism.html#virtual-dom)
- [父子组件的渲染顺序](https://blog.csdn.net/weixin_34344677/article/details/91381387)
- [响应式原理的理解](https://cn.vuejs.org/v2/guide/reactivity.html)
  - vue 采用数据劫持和发布-订阅者模式，通过 object.defineproperty 来劫持每个属性的 setter、getter ，在数据变动的时候给发送消息给订阅者 watcher,让其执行更新函数来重新渲染组件。
- [双向数据绑定的原理](https://vue3js.cn/interview/vue/bind.html#%E4%B8%80%E3%80%81%E4%BB%80%E4%B9%88%E6%98%AF%E5%8F%8C%E5%90%91%E7%BB%91%E5%AE%9A)
- [数据通信的手段](https://vue3js.cn/interview/vue/communication.html#%E4%B8%89%E3%80%81%E7%BB%84%E4%BB%B6%E9%97%B4%E9%80%9A%E4%BF%A1%E7%9A%84%E6%96%B9%E6%A1%88)
- [常用的指令、修饰符有哪些？](https://web-wj.github.io/docs/frontend/vue/vue2.html#v-on%E6%8C%87%E4%BB%A4)
- v-for v-if 优先级
  - v-for 优先级是比 v-if 高（每次渲染都会先循环再进行条件判断）
  - vue3 改进这个缺点了。
- v-if vs v-show
  - visibility:hidden 控制显示隐藏
- methods vs computed
- watch vs computed
- 路由的模式
- 路由懒加载的实现
- Vuex 状态管理的理解
- vuex 的 mutation 和 action 的区别？mutation 可以做异步操作吗？

### vue3

- vue2 和 vue3 的区别？

## webpack & vite

- 二者区别？
- webpack 的构建原理
- webpack 与 gulp 的区别？
- webpack 如何开启一个服务？

## network

- 跨域问题，解决方案
- 从 url 输入到页面渲染呈现的过程
- http 请求的头部格式，内容协商
- 浏览器的缓存机制是什么？etag vs last-modified ?
- WebSocket 的理解及应用？

## es6

- es6 中 promise 的理解，async await promise 的实现原理
- 事件循环机制

## js

- 防抖、节流的实现？
- call bind apply ?
- this 的指向问题？

## css

- display:none vs visibility:hidden vs opacity: 0
- 什么是 bfc ？清除浮动的手段有哪些？

## html

## git

- git 常用的一些命令
- git 处理冲突

## 场景

- 完成商品列表渲染的整个过程
- 有哪些是 webpack 可以处理但是 gulp 却不行的？
- 防抖、节流的应用场景?
- 网络请求卡顿如何处理？
- 如何做权限控制的？
  
## 其他

- 如何构建一个多模块的项目？（！！！）
- 发布-订阅者模式
- 性能优化的手段
- 移动端适配的技术
- 命名规范

