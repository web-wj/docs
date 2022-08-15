# js 兼容性

## babel 

> 与 postcss 类似，与 webpack 无关，但是可以在 webpack 中使用。

- 巴别塔的传说：象征着统一的国度、统一的语言。
- 编译器，类似 less、scss =》转化为兼容的语法。
- postcss postcss-cli   webpack webpack-cli   
- @babel/core  核心库   @babel/cli  命令行工具。
- 预设 —— 多个插件集合体  .babelrc   json 文件。

## babel 预设

- @babel/preset-env 预设环境，最新的 js 语法。
- JSX TypeScript 的解析问题......
- 同 postcss 一样会读取 .browerslistrc 来描述浏览器的兼容范围。

- 从后向前
```json
// {
//   "presets": ["@babel/preset-env"]
// }

{
  "presets": [["@babel/preset-env", {
    // 配置xxx, 默认只处理语法，不处理 API  
    // 按需处理 useBuiltIns 需要安装 core-js 新的库来兼容(不再是开发依赖——发布包的时候有问题)  
    "useBuiltIns": false,
    "corejs": 3
  }]]
}
```

- promise **core-js**
- async await **regenerator-runtime**

## babel 插件

- @babel/polyfill 已过时！！！

- 插件在 presets 前运行，从前往后排列，preset 是从后向前！
- @babel/preset-env 只转化已经成为正式标准的语法，对于一些早期阶段的语法不做处理。

### 举例

- @babel/plugin-proposal-class-properties  类中写初始化字段
- @babel/plugin-proposal-function-bind  为方法绑定 this 
  - es7 还是什么 ？ obj::Print() => Print.call(obj)
- @babel/plugin-proposal-optional-chaining ?. 解决这种写法的兼容性
- babel-plugin-transform-remove-console (太老的无命名空间)移除代码中的 console
  - 生成环境不需要输出！！！

### 补充

- @babel/plugin-transform-runtime 提供一些公共辅助 API ,帮助转化代码
  - 代码优化

## webpack 中使用

- babel-loader

## babel 对类的处理



