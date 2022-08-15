# css 工程化

## css 存在的问题

1. 类名冲突
  - 命名约定
    - BEM OOCSS AMCSS SMACSS ......
    - lbanner__dot_selected
  - css in js 思想
  ```js
  const style = {
    color: '#fff',
    ...
  }
  ```
  - css module
    - 变量冲突多出现在不同的模块中
    - `css-loader?module` 改变类名为 hash - 模块路径和类名联合生成的
    - 同时需要导出一个原始和变化后对应的记录 locals 
    - 不需要转换的类名
    ```js
    :global(.main) {
      xxx
    }
    ```
2. 重复样式
  - 主题色 [less](https://less.bootcss.com/#%E6%A6%82%E8%A7%88) scss 预编译器
  - 变量 混合（可以让混入不显示在打包后的文件，带参数）嵌套 ......
  - webpack less-loader
3. css 文件细分
  - 利用 webpack loader 来打包、合并、压缩 css 文件。
   
## 文件细分

### css-loader

> 经过 css-loader 转化为 js 内容。

- file-loader 处理图片，返回打包后的文件路径，文件名称变化成 hash 值  。
- ```js
  var import1 = require('./bg.png');
  module.exports = `
  .red {
    color: #f40;
    background: url("${import1}");
  }
  `
  ```

- 引用其他的 css 文件

- 总结：
  1. 将 css 文件内容作为字符串导出。
  2. 把其他的依赖作为 require 导入，方便 webpack 做分析。

### style-loader

> 将 css-loader 导出的字符串加入到页面中的 style 元素中。

- 多次加载，会进行依赖分析，避免同一个样式多次导入。
- 导出一个对象。

```js
var style = module.exports;
var styleElement =  document.creatElement('style');
styleElement.innerHTML = style;
document.head.appendChild(styleElement);
```

### less-loader

> 将 less 文件编译为 css 

## [postcss](https://www.postcss.com.cn/)

> 由于缺少最佳实践，所以......多样性！！！
> 统一处理样式问题，类似一个编译器。与 webpack 无关！

- .pcss 文件后缀 - postcss-sugarss-language vscode 插件
- `postcss css/source.pcss -o css/out.css -W` cli 命令

### postcss-preset-env

> postcss 预设环境，你只需要安装它一个插件，就相当于安装了很多插件了。

```js
module.exports = {
  plugins: {
    "postcss-preset-env" : {},
    "postcss-apply": {},
    "postcss-color-function": {},
    "styleint": {}
  }
}
```
- postcss-preset-env 内部包含很多库：
  1. 自动的厂商前缀 autoprefixer 库
    ```css
     ::placeholder {
       color: red;
     }
    ```
    - 单独的 .browserslistic 文件(推荐，别的插件也用到了)
    ```js
     last 2 version
     > 1%
    ```
    - 在 package.json 中写 browserslistc 配置
  2. 未来的 css 语法 cssnext 库
  
    ```js
    "postcss-preset-env": {
      stage: 0,
      preserve: false //不保留之前的新语法
    }
    ```
  - css 变量
  - 自定义选择器
  - 嵌套
  - 媒体查询

### postcss-apply

> 嵌套，代码段

```css
:root {
  --center: {
    position: absolute;
  }
}

.item {
  @apply --center;
}
```

### postcss-color-function

> 支持一些像 less 中的颜色函数

### postcss-import【拓展】

> 导入别的代码片段

### styleint 

> 为 postcss 写了一个插件，样式不规范就报错。

- 自己编写、或者安装自己的编写验证方案， **styleint-config-standard**
- 单独写一个文件 `.stylelintrc`
  ```json
  { 
    "extends": "stylelint-config-standard",
    "rules" :{
      "indentation": null,
    }
  }
  ```

- 编写代码的时候需要安装`stylelint`插件才可以显示编写的错误。

## 抽离 css 文件

### mini-css-extract-plugin

> plugin 生成 css 文件(根据 chunk 生成的)
> loader 接收转化 css-loader 输出的文件

- 解决打包后的代码中的 路径问题
  
```js
 : {
  public: '/'
}
```