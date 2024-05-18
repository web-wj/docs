# base-interview

> 记录面试过程中遇到的一些基础性的问题，做简单的回顾总结。

## vue2 & vue3

### vue2

- [生命周期的理解](https://blog.csdn.net/qq_40756247/article/details/90668073)
- [nextTick 的理解](https://vue3js.cn/interview/vue/nexttick.html#%E4%B8%80%E3%80%81nexttick%E6%98%AF%E4%BB%80%E4%B9%88)
- [vue 的渲染机制](https://staging-cn.vuejs.org/guide/extras/rendering-mechanism.html#virtual-dom)
- [父子组件的渲染顺序](https://blog.csdn.net/weixin_34344677/article/details/91381387)
    - 为什么？插槽里放一个组件（父子组件）？
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
    - 是否存在缓存。methods 没有缓存，调用相同的值计算还是会重新计算。competed 有缓存，在值不变的情况下不会再次计算，而是直接使用缓存中的值。
- watch vs computed
    - 不支持缓存，数据变，直接会触发相应的操作
    - watch 支持异步；computed 会 return 不支持异步。（异步做了没意义，之前就 return 了）
    - 监听的函数接收两个参数，第一个参数是最新的值；第二个参数是输入之前的值；
    - 当一个属性发生变化时，需要执行对应的操作；一对多；
    - 监听数据必须是 data 中声明过或者父组件传递过来的 props 中的数据，当数据变化时，触发其他操作
- [路由的模式](https://juejin.cn/post/7037282729485959204)
- [路由懒加载的实现](https://blog.csdn.net/czj1049561601/article/details/114120236)
- [Vuex 状态管理的理解](https://web-wj.github.io/docs/frontend/vue/vue2.html#vuex-state)
    - 可使用插件 [vuex-persistedstate](https://github.com/robinvdvleuten/vuex-persistedstate#readme)，解决之前繁琐的使用 vuex + sessionStorage 来避免页面刷新导致的 vuex 数据丢失的问题。
- vuex 的 mutation 和 action 的区别？mutation 可以做异步操作吗？
    - 多个组件共享状态、通信问题
- vuex 开命名空间 - 不开的话挂在全局的上（mutation action）- 两个命名空间互相调 mutation action  mutation action 内部的第三个参数 { root: true }
- vue 路由守卫函数。
- 动态组件 Vue.extend
- vue 插槽的理解？
- 自定义指令的两个参数？
    - 名称+配置（bind inserted update | unbind componentUpdated）
    - 获取表达式
    - v-action 权限按钮
- 如何理解 vue 单向数据流?
- this.$observable Vue.observable 做了什么？
- 动态组件、场景？左树右表？数组表示树、二叉树
- 堆排序
- Object.definedProperty 接受的参数 - proxy 代理
- 父组件如何拿子组件的实例？
    - ref 父组件 mounted 拿子组件
- 子组件监听父组件数据变化  prop + watch handler
- $route $router
    - this.$router 还可以怎么获取?
- 全局注册、局部注册的区别
- mvvm 原理
- this.data.xxx 如何代理到外面 this.xxx 一个没有声明的数据，放到模板中，报错值不存在（不在 vue 配置中存在）
- 依赖注入？provide inject ?
- v-model 原理
- 如何包装一个组件？
    - 传值（$parent,ref）
- vuex state 中是一个对象，想修改值 state.user.name = xxx {...state.user, name: 'xiaoming' } 保证响应式，应该只能支持2层

### vue3

- [vue2 和 vue3 的区别？](https://blog.csdn.net/weixin_43932097/article/details/121512132)
- setup 组合式 API
    - 没有 this
- v-model 的修饰符 .lazy (input -> change)
- 封装自定义组件 v-model 的上面？往出抛 input 还是 change 事件？

## webpack & vite

- 二者区别？
- webpack 的构建原理
    - 初始化 - 编译 - 输出
- webpack 如何开启一个服务？
- webpack 与 gulp 的区别？
- webpack 优化建议
- [vue-loader](https://juejin.cn/post/6994468137584295973)
- 如何保证浏览器中的代码是最新的？热更新的问题？HMR
- less-loader
- ejs 模板 + HtmlWebpackPlugin 使用
- treeshaking 什么?

## network

- 跨域问题，解决方案
- 从 url 输入到页面渲染呈现的过程
- http 请求的头部
- 浏览器的缓存机制是什么？etag vs last-modified ?
- WebSocket 的理解及应用？
- xss 攻击？场景？评论 + 转义
- http 1.0 / 1.1 / 2.0 区别？
    - 1.0 和 1.1 长连接 + 缓存增加了一些指标 + 错误码增多了
    - 1.1 和 2.0 使用基于文本格式 -> 使用二进制格式 , 多路复用(keep-alive)

## es6

- 新特性
- 箭头函数的特点
- 事件循环机制
    - 宿主环境 + 5 个线程 + 事件队列内存 + 执行栈 event-loop
- es6 中 promise 的理解，async await promise 的实现原理
    - 异步处理场景 + 解决地狱回调问题 + promise 对象 + 两个阶段三个状态
    - pending -> fulfilled、rejected 挂起到成功称之为 resolve 失败为 reject
    - promise.all 返回值 并发执行 new Promise 同步？
- proxy 可以监听嵌套对象吗？

## js

- class `Student.prototype === xialuo.__proto__` 对象的隐式原型指向类的显式原型
- 值类型 undefined string number boolean Symbol 引用类型 Object Array null function
    - typeof 可以判断所有值类型 识别函数 不能判断引用类型
- 深浅拷贝 Object.assign() 递归（typeof instanceof hasOwnProperty）
- 类型转化 100 + '10' = '10010' true + '10' = 'true10' == 会先判断数据类型，进行数据类型转化再比较
- [typeof 与 instanceof 区别](https://vue3js.cn/interview/JavaScript/typeof_instanceof.html#%E4%B8%80%E3%80%81typeof)
- 原型链 class
    - constructor super
- call bind apply ?
    - bind 返回一个新函数
- this 的指向问题？
    - 在函数执行的时候决定
- 闭包问题
    - 所有的自由变量的查找是在函数定义的地方向上级作用域查找！！！
    - 应用：防抖按钮
    - 垃圾回收机制 函数作用域内部，自己定义的变量没有使用
- 静态属性
- new 一个对象操作
- [封装过 axios 吗？](https://blog.csdn.net/weixin_44475093/article/details/111878425)
    - 设置接口请求前缀，域名，开发环境需要在 devSever 中做 proxy 处理，实现跨域。
    - 设置请求头与超时时间
    - 请求拦截器 - 请求拦截器可以在每个请求里加上 token，做了统一处理后维护起来也方便。（？？？额）
    - 响应拦截器 - 响应拦截器可以在接收到响应后先做一层操作，如根据状态码判断登录状态、授权。
- 设计模式
    - 工厂模式
    - 单例模式
    - 装饰器
- 递归思想，判断数组中是否存在某个值？
- 扁平化数组
    - flat
- 如何把一个数组转成树？
- null == undefined
- setTimeout setInterval
    - 使用上的坑：防抖、节流| 交叉，清不掉
    - 二维码登录 + 检测用户是否扫码（轮询调查询），使用 setTimeout 模拟 setInterval ，卡顿阻塞 加到事件队列 中去
- 事件委托
    - 利用事件冒泡，jquery 中有些 dom 是请求后生成的，不想动态绑定事件
- 防抖、节流的实现？
    - 多个点击相当于一次，防止用户多次处理（vue once）

## css

- 盒子模型
    - offsetWidth = width + padding + border
    - box-sizing: border-box
- margin 纵向重叠 负值问题
    - 相邻的俩个元素 margin-bottom 和 margin-top 会取大值
    - margin-top 和 margin-left 设置负值的话，自身会发生向上和向左移动
    - margin-bottom 和 margin-right 设置负值的话，相邻元素会上移、左移
- 什么是 bfc ？清除浮动的手段有哪些？利用伪元素清除浮动 | overflow: hidden
    - 块级格式化上下文:独立的渲染区域，内部元素的渲染不影响边界以外的元素
    - 形成bfc : float 不是 none | position 是 absolute 或 fixed | overflow 不是 visible |
- float 布局 =》如何实现圣杯布局和双飞翼布局？
    - 三栏布局，中间部分优先加载
    - 两侧固定，中间部分自适应
- flex: 0 1 auto      flex: 1
- 水平垂直
    - text-align: center margin:auto
    - absolute  left:50% + margin-left:-50%center
    - line-height:height
    - absolute  top:50% + margin-top:-50%center | transform(-50%,-50%) | top,bottom,left,right:0+margin:auto
- display:none vs visibility:hidden vs opacity: 0
- line-height 继承问题 百分比继承计算下来的值
- 响应式布局 rem
    - em 相对于父元素 rem 相对于根元素
    - media-query 根据不同屏幕宽度设置根元素 font-size rem
    - 媒体查询具有阶梯性不够平滑 vw vh 解决这个问题 window.screen.height | window.innerHeight | document.body.clientHeight
- 重绘回流
    - 改变 width height font-size 布局触发回流
    - 改变 color background-color 进行重绘
    - 避免频繁使用 js 操作 dom 节点 | 移动调整元素时，使用 transform | 使用 opacity 调整可见度

## html

- 如何理解 html 语义化？
    - 代码可读性比较好
    - 利于搜索引擎 SEO
- 默认情况下哪些 html 标签是块级元素、哪些是内联元素？
    - div h ul ol p
    - span a img input button

## git

- git 常用的一些命令
- git 处理冲突

## 场景

- 完成商品列表渲染的整个过程
- 有哪些是 webpack 可以处理但是 gulp 却不行的？
- 防抖、节流、锁的应用场景?
- 网络请求卡顿如何处理？
- 瀑布流布局 + 懒加载
    - 图片太大了，高度没获取 如何定高？ 做的小点，后端返回高度的列表做骨架。
- 如何做权限控制的？
    - add routers 方式添加动态路由
- 分页，跳到其他页面，记录当前页面 —— 可以用本地缓存或者 keep-alive
- 二维码登录功能
- 提高 vue 项目的加载速度？
    - 如何量化？减少请求
    - 接口慢？渲染慢？->调试工具调看
- 画板的回退功能？
    - dom 元素的变化？
- 服务端渲染逻辑？vue seo 优化，
- 封装组件库 .native() 在外面监听组件没有抛出的问题
- 处理树形数据？ -> 递归转数组

## 其他

- 如何构建一个多模块的项目？
    - 自己搭 cli 工具的功能啥的？
- eval('字符串') 可以执行字符串！！！
- token 过期 -> 重新登录
- 单点登录 - 二级分发的 - ticket
- 发布-订阅者模式
    - 事件总程 - 两个函数的通信
    - addeventlistener 消息推送
- 性能优化的手段
- 移动端适配的技术
- package.json 作用
- 命名规范
- 浏览器中 dom 和 element 的关系？判断节点类型？nodeType 为几？
- [浏览器的结构](https://www.jianshu.com/p/f5141d52c3f0)
    - 多进程 tab 页(缓存、浏览器、网络、渲染、GPU 等进程......)
    - 单进程 性能，安全（获取其他 tab 页面）
- [后端一次给你10万条数据,如何优雅展示]（https://juejin.cn/post/6986237263164211207）
- 双 token refresh token 无感刷新 token
- vue-element-admin vben
- 负载均衡的几种方案。
- babel 的实现原理。

- 技术栈太不全面了 —— vue3 react 小程序 ts uniapp

高效学习步骤：找准知识体系；刻意训练；及时反馈。
