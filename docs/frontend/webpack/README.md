# webpack

## 如何在浏览器端实现模块化？

### 问题

- 效率问题：精细的模块划分带来了更多的 js 文件，更多的 js 文件带来了更多的请求，降低了页面访问效率。
- 兼容性问题：浏览器只支持 es6 模块化，不支持 CommonJS(第三方模块，例如：axios)
- 工具问题：浏览器不直接支持 npm 下载的第三方包
- (非业务类)工程问题......

> 根本原因是在 node 端，可以本地读取文件，效率比浏览器远程传输文件高的多。在浏览器端开发时态(devtime)和运行态(runtime)的侧重点不同。

- 开发时态
    - 支持多模块标准 es6、CommonJS
    - 模块划分精细一点
    - 不考虑兼容性问题
- 运行时态
    - 文件少一点（合并多个相同类型文件）
    - 体积小一点（代码别换行了，名称简写）
    - 代码内容乱一点（别人看不懂代码）
    - 执行效率问题

### 解决办法

- webpack 构建工具
- grunt gulp fis browserify ......

> 官网：https://www.webpackjs.com/

基于 nodeJs ,以开发时态的一个入口文件，分析模块的依赖关系（利用模块化导入语句 ），经过一系列的过程（压缩合并），最终生成运行时态的文件。

## 编译结果分析

### 模拟编译结果

```js
// 全局变量污染
const modules = {
  "./src/a.js": function(module, exports, require) {
    // xxx;
    // module.exports = 'a'
    // exports.a = 'a'
    // require('./b'); => require('./src/b.js')
  },
  "./src/b.js": function() {
    // xxx;
  }
}

// 专门写一个函数来运行
(function (modules) {
  // 提供 require 函数, 相当于运行一个模块，并得到导出结果 moduleId 模块路径
  function require(moduleId){
    var func = modules[moduleId];
    // 构造一个 module
    var module = {
      exports: {}
    }
    // 运行模块
    fnc(module, module.exports, require);
    // 得到模块返回结果
    return module.exports;
  }
  // 执行入口模块
  require('./src/index.js');
})({
  "./src/a.js": function(module, exports, require) {
    // xxx;
    // module.exports = 'a'
    // exports.a = 'a'
    // require('./b'); => require('./src/b.js')
  },
  "./src/b.js": function(module, exports, require) {
    // xxx;
  }
});
```

- 为什么使用 eval 函数？
    - 便于定位错误信息。简易版 source map 。

## 配置文件

- webpack.config.js
- 命令行中的` --config `来指定配置文件。
- 通过 CommonJS 模块导出一个对象。

### 为什么这里不能使用 es6 导出配置文件呢？

- 打包的过程中，是在 node 环境下，会读取配置文件内容，会**运行**一次配置文件，相当于`const config = require('./webpack.config.js')`。我们自己的代码在打包过程中是不运行的，所以支持多模块。

- `mode: "development" mode: "production"`

### devtool 配置

- source map
- webpack 中的 source map

    - 希望看到源码中的错误，而不是打包后的文件中的错误。chrome 率先支持了 source map 。没有兼容性问题，因为是开发者调试用的。。。
    - 多一个配置文件，浏览器发现 source map ,会找这个配置文件，文件中记录了原始代码以及转化后的代码的对应关系。
    - 不应在生产环境使用，source map 文件比较大，不仅会导致额外的网络传输，还会暴露原始代码。要调试真实的生产环境的代码，也需要做一些规避网络传输和代码暴露的问题。

## 编译过程

- 整个过程大致分为三个步骤：
    - 初始化
    - 编译
    - 输出

![](./imgs/progress.png)

### 初始化

- 此阶段，webpack 会将**CLI 参数、配置文件、默认配置**进行融合，形成一个最终的配置对象。
- 对配置的处理过程是依托一个第三方库 yargs 完成的。
- 此阶段相对比较简单，主要是为接下来的编译阶段做必要的准备。
- 目前，可以简单的理解为，初始化阶段主要用于产生一个最终的配置。

### 编译

#### 1.创建chunk

- chunk 是 webpack 在内部构建过程中的一个概念，译为块，它表示通过某个入口找到的所有依赖的统称。
- 根据入口模块（默认为./src/index.js）创建一个 chunk 。

  ![](./imgs/main-chunk.png)

- 每个 chunk 都有至少两个属性：
    - name：默认为 main
    - id：唯一编号，开发环境和 name 相同，生产环境是一个数字，从0 开始

#### 2.构建所有依赖模块

 ![](./imgs/chunks.png)

```js
// ./src/index.js
console.log('index');
require('./a.js');
require('./b.js');

// ./src/a.js
require('./b.js');
console.log('a');
module.exports='a';

// ./src/b.js
console.log('b');
module.exports='b';
```

- ./src/index.js 出发，dependencies 中保存 `['./src/a.js', './src/b.js']` , `['./src/b.js']`
- 替换依赖函数

```js
// 模块id : ./src/index.js
// 转化后的代码
console.log('index');
__webpack_require__('./src/a.js');
__webpack_require__('./src/b.js');

// 模块id : ./src/a.js
// 转化后的代码
__webpack_require__('./b.js');
console.log('a');
module.exports='a';

// 模块id : ./src/b.js
// 转化后的代码
console.log('b');
module.exports='b';
```

- 保存生成后的列表

  > AST在线测试工具：https://astexplorer.net/

- 简图:

  ![](./imgs/chunks2.png)

#### 3.产生chunk assets

- 在第二步完成后，chunk 中会产生一个模块列表，列表中包含了模块 id 和模块转换后的代码。
- 接下来，webpack 会根据配置为 chunk 生成一个资源列表，即 chunk assets，资源列表可以理解为是生成到最终文件的文件名和文件内容。

  ![](./imgs/chunk-assets.png)

  > chunk hash 是根据所有 chunk assets 的内容生成的一个 hash 字符串。  hash：一种算法，具体有很多分类，特点是将一个任意长度的字符串转换为一个固定长度的字符串，而且可以保证原始内容不变，产生的 hash 字符串就不变。

- 简图：

  ![](./imgs/chunk-assets2.png)

#### 4.合并chunk assets

- 将多个 chunk 的 assets 合并到一起，并产生一个总的 hash .

  ![](./imgs/chunk-hash.png)

### 输出 emit

此步骤非常简单，webpack 将利用 node 中的 fs 模块，根据编译产生的总的 assets ，生成相应的文件。

  ![](./imgs/output.png)

### 总过程

  ![](./imgs/res1.png)

  ![](./imgs/res2.png)

### 补充

- module：模块，分割的代码单元，webpack 中的模块可以是任何内容的文件，不仅限于 JS
- chunk：webpack 内部构建模块的块，一个 chunk 中包含多个模块，这些模块是从入口模块通过依赖分析得来的
- bundle：chunk 构建好模块后会生成 chunk 的资源清单，清单中的每一项就是一个 bundle，可以认为 bundle 就是最终生成的文件
- chunkhash：chunk 生成的资源清单内容联合生成的 hash 值
- chunkname：chunk 的名称，如果没有配置则使用 main
- id：通常指 chunk 的唯一编号，如果在开发环境下构建，和chunkname 相同；如果是生产环境下构建，则使用一个从 0 开始的数字进行编号

## 入口和出口

- 入口配置的是 chunk

### output

- path 绝对路径，默认是 dist
- filename 生成文件的规则
    - [name] chunkname
    - [hash] 生成的总 hash 值
    - [chunkhash:5] chunk 对应的 hash 值
    - [id] 开发环境是 name 生产环境是数字

### 最佳实践

#### 一个页面一个 js

- 源码结构：

  ```js
  src
    - pageA
      - index.js
    - pageB
      - index.js
    - pageC
      - main.js   主功能
      - main2.js  额外功能
    - common 公共目录
      - ...
  ```

- webpack:

  ```js
  module.exports = {
    entry: {
      pageA: './src/pageA/index.js',
      pageB: './src/pageB/index.js'
      pageC: ['./src/pageC/main.js', './src/pageC/main2.js'],
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      // 配置合并 js 文件的规则
      filename: "[name]-[chunkhash:5].js"
    }
  }
  ```

适用于重复代码较少的情况，只会影响传输请求。那么为什么不能打包一个 common chunk 呢？

- 原因在于打包后的模块是单独的作用域的。而且由于依赖关系，原来的模块打包的代码中也是包含 common 的代码的。

#### 一个页面多个 js

- 源码结构：

  ```js
  src
    - pageA
      - index.js
    - pageB
      - index.js
    - statistics 用于统计访问人数功能
      - index.js
    - common 公共目录
      - ...
  ```

    - webpack:

  ```js
  module.exports = {
    entry: {
      pageA: './src/pageA/index.js',
      pageB: './src/pageB/index.js',
      statistics: './src/statistics/index.js'
    output: {
      path: path.resolve(__dirname, 'dist'),
      // 配置合并 js 文件的规则
      filename: "[name]-[chunkhash:5].js"
    }
  }
  ```

模块间不依赖，完全独立，就可以单独开一个 chunk 。

#### 单页应用

- 源码结构：

  ```js
  src
    - sunFunc  子功能
      - index.js
    - sunFunc  子功能
      - index.js
    - common  公共目录
      - ...
  ```

    - webpack:

  ```js
  module.exports = {
    entry: {
      main: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      // 配置合并 js 文件的规则
      filename: "[name]-[hash:5].js"
    }
  }
  ```

## loader

> 本质是一个函数，它的作用是将某个源码字符串换成另一个源码字符串返回。

读取文件内容，分析语法树之前，会处理 loaders 。在打包过程中执行，所以不直接支持 es6 module （需要做特殊的处理）。

- 当前模块是否满足 loader 处理条件。
- 否，生成空数组，直接做语法树分析。是，读取 loaders 数组，
  依次处理。

  ![](././imgs/loaders.png)

- 使用插件 loader-utils 来获取传递的参数。

- 从上往下解析匹配，但是从下往上，从右往左运行！ ！！

  ```js
  module: {
        rules: [
          // 从上往下匹配，但是从下往上运行
            {
                test: /test-loader\.js$/, //正则表达式，匹配模块的路径
                use: ["./loaders/test-loader.js?changeVal=未知数", "./loaders/loader1.js"]
                  // options: {
                  //     changeVal: "未知数"
                  // }
                 //匹配到了之后，使用哪些加载器
            }, //规则1
            {
                test: /test-loader\.js$/, //正则表达式，匹配模块的路径
                use: ["./loaders/loader1.js", "./loaders/loader2.js"] //匹配到了之后，使用哪些加载器
            } //规则2
        ], //模块的匹配规则
    }
  ```

### 样式、图片处理

```js
// 自定义的 loaders
// 样式处理
module.exports = function(sourceCode){
  return `
    const styleLabel = document.createElement('style');
    styleLabel.innerHTML = \`${sourceCode}\`;
    document.head.appendChild(styleLabel);
    module.exports=\`${sourceCode}\`;
    `;
}

// 图片处理
var loaderUtil = require("loader-utils")

function loader(buffer) { //给的是buffer
    console.log("文件数据大小：(字节)", buffer.byteLength);
    var { limit = 1000, filename = "[contenthash].[ext]" } = loaderUtil.getOptions(this);
    if (buffer.byteLength >= limit) {
        var content = getFilePath.call(this, buffer, filename);
        content = "../dist/" + content;
    }
    else{
        var content = getBase64(buffer)
    }
    return `module.exports = \`${content}\``;
}

loader.raw = true; //该loader要处理的是原始数据

module.exports = loader;

function getBase64(buffer) {
    return "data:image/png;base64," + buffer.toString("base64");
}

function getFilePath(buffer, name) {
    var filename = loaderUtil.interpolateName(this, name, {
        content: buffer
    });
    this.emitFile(filename, buffer);
    return filename;
}

// index.js 中的内容
// 处理样式
const content = require('./assets/style.css');
console.log(content);

// 处理图片
var src = require("./assets/webpack.png")
console.log(src);
var img = document.createElement("img")
img.src = src;
document.body.appendChild(img);
```

## plugin

loader 做代码转化的，比较局限。复杂功能的实现需要插件。如：

- 当 webpack 生成文件时，顺便多生产一个说明描述文件。
- 当 webpack 编译的时候，控制台输出一句话表示 webpack 启动。
- 当xxxx时，xxxx

这种类似的功能需要把功能嵌入到 webpack 的编译流程中，而这种事情的实现是依托于 plugin 的。

![](././imgs/plugin1.png)

plugin的**本质**是一个带有apply方法的对象。

```js
var plugin = {
    apply: function(compiler){

    }
}
```

通常，习惯上，我们会将该对象写成构造函数的模式

```js
class MyPlugin{
    apply(compiler){

    }
}

var plugin = new MyPlugin();
```

要将插件应用到webpack，需要把插件对象配置到webpack的plugins数组中，如下：

```js
module.exports = {
    plugins:[
        new MyPlugin()
    ]
}
```

apply函数会在初始化阶段，创建好Compiler对象后运行。

compiler对象是在初始化阶段构建的，整个webpack打包期间只有一个compiler对象，后续完成打包工作的是compiler对象内部创建的compilation

apply方法会在**创建好compiler对象后调用**，并向方法传入一个compiler对象

![](././imgs/plugin2.png)

compiler对象提供了大量的钩子函数（hooks，可以理解为事件），plugin的开发者可以注册这些钩子函数，参与webpack编译和生成。

你可以在apply方法中使用下面的代码注册钩子函数:

```js
class MyPlugin{
    apply(compiler){
        compiler.hooks.事件名称.事件类型(name, function(compilation){
            //事件处理函数
        })
    }
}
```

**事件名称**

即要监听的事件名，即钩子名，所有的钩子：https://www.webpackjs.com/api/compiler-hooks

**事件类型**

这一部分使用的是 Tapable API，这个小型的库是一个专门用于钩子函数监听的库。

它提供了一些事件类型：

- tap：注册一个同步的钩子函数，函数运行完毕则表示事件处理结束
- tapAsync：注册一个基于回调的异步的钩子函数，函数通过调用一个回调表示事件处理结束
- tapPromise：注册一个基于 Promise 的异步的钩子函数，函数通过返回的 Promise 进入已决状态表示事件处理结束

**处理函数**

处理函数有一个事件参数`compilation`。

## 配置细节 - 细枝末节

- 配置文件如果导出一个函数，则会将返回结果作为配置对象。可以通过命令指定环境,通过一个配置文件配置多个环境。`webpack --env='xxx'`
- context: 会影响入口和 loader 的路径配置基础。
- `output: { library, libraryTarget }` 打包结果立即执行函数结果会暴露给 library 规定的 变量。
  - 和插件一起配合得到打包结果。
  - 写的不是一个工程，是一个 库，类似于 jquery ，希望别人使用 $ 等全局变量。
  - libraryTarget 更精细控制导出。
- `target: "web"` 打包结果执行的环境，默认是 web 。还可以设置 node 。
- `module: { noParse: /jquery/ }` 不用解析，例如针对 jquery 等大型的**单模块库**（已经打包过的，没有其他依赖），来提高构建效率，和运行时没有任何关系，呵呵了！
- ```js
  resolve: {  
    // modules 模块的查找位置
    modules: ["node_modules"],
    // require("./a") webapck 会从 extensions 中补全后缀
    extensions: [".js", ".json"],
    // 别名，这个比较高频使用！！
    alias: {
      "@": path.resolve(__dirname, 'src'),
      "_": __dirname,
    }
  }
  ```
- ```js
  // 通过 cdn 引入了,遇到哪个包不用管,替换为导出一个 $ _
  externals: {
    jquery: "$",
    lodash: "_",
  }
  ```
- `stats` webpack 执行后控制台的输出内容。
