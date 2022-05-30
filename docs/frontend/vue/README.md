# vue

> 官方文档： <https://cn.vuejs.org/index.html>

- vuex 持久化的方案
    - 可使用插件 [vuex-persistedstate](https://github.com/robinvdvleuten/vuex-persistedstate#readme)，解决之前繁琐的使用 vuex + sessionStorage 来避免页面刷新导致的 vuex 数据丢失的问题。

## vue-hook

- https://zhuanlan.zhihu.com/p/50861734

## vue-i18n

> 官网：https://kazupon.github.io/vue-i18n/zh/started.html#html
> 使用原理：https://juejin.cn/post/6965660033728135176

## cli

> create-vue: https://juejin.cn/post/7018344866811740173
> vite: https://juejin.cn/post/7083152323681189902
> ni 神器：https://juejin.cn/post/7083151940367941639

## vite

> vite: https://github.com/vitejs/vite

- 面试题：谈谈你对vite的理解，最好对比webpack说明

webpack 原理图

![webpack 原理图](http://mdrs.yuanjin.tech/img/20200929144416.png)

vite 原理图

![vite 原理图](http://mdrs.yuanjin.tech/img/20200929144957.png)

<!-- @vue/compiler-sfc -->

> 面试题答案：

- webpack会先打包，然后启动开发服务器，请求服务器时直接给予打包结果。
- 而vite是直接启动开发服务器，请求哪个模块再对该模块进行实时编译。
- 由于现代浏览器本身就支持ES Module，会自动向依赖的Module发出请求。vite充分利用这一点，将开发环境下的模块文件，就作为浏览器要执行的文件，而不是像webpack那样进行打包合并。
- 由于vite在启动的时候不需要打包，也就意味着不需要分析模块的依赖、不需要编译，因此启动速度非常快。当浏览器请求某个模块时，再根据需要对模块内容进行编译。这种按需动态编译的方式，极大的缩减了编译时间，项目越复杂、模块越多，vite的优势越明显。
- 在热更新（HMR）方面，当改动了一个模块后，仅需让浏览器重新请求该模块即可，不像webpack那样需要把该模块的相关依赖模块全部编译一次，效率更高。
- 当需要打包到生产环境时，vite使用传统的rollup进行打包，因此，vite的主要优势在开发阶段。另外，由于vite利用的是ES Module，因此在代码中不可以使用CommonJS

### 预编译(DLL)

### 支持 es module ，出现大量请求！

### vite 自带 rollup 上生产环境

### 配置开发阶段代理
