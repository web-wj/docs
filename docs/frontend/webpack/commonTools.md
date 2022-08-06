# 常用扩展

## clean-webpack-plugin

> A webpack plugin to remove/clean your build folder(s).

- 文件发生变化后，自动删除之前的文件。

## html-webpack-plugin

> This is a webpack plugin that simplifies creation of HTML files to serve your webpack bundles. This is especially useful for webpack bundles that include a hash in the filename which changes every compilation. You can either let the plugin generate an HTML file for you, supply your own template using lodash templates or use your own loader.

- 自动生成 html 文件的，常用的是 template 选项配合[ejs 语法](https://ejs.bootcss.com/#install)。

## copy-webapck-plugin

> Copies individual files or entire directories, which already exist, to the build directory.

- 通常是将模板文件中需要引入的一些静态资源，如：图片等，copy 到打包后的目录中去，让 html-webpack-plugin 生成的 html 文件可以正常引入原有的资源。

## DevServer 开发服务器

> 开发阶段使用 devserver 模拟请求服务器的情况。它既不是 loader 也不是 plugin 。他是一个官方单独的库，且支持热更新。

### 内部逻辑

1. 通过 webpack serve 等指令来使用，首先它内部也是相当于调用了 webpack 的命令，并通过传递的参数，开启 watch 。
2. 它会注册一堆的 hooks ，将资源列表保存起来，它会禁止输出文件，所以开发阶段你是看不到文件的输出的。
3. 它会用 express 来开启一个服务器，监听端口，当请求到达后，返回相应的资源。

- 首先，更换域名是不需要修改代码的，这样才比较智能，所有请求就不会携带前面的请求域名，如果开发阶段遇到跨域问题，可以在 proxy 选项中配置，但是需要注意的是请求的地址变化了，有些后端还会对请求头中的 `host origin` 字段做判断，所以需要通过 `changeOrigin：true` 来更改请求头中的内容。

## 普通文件的处理（图片）

- file-loader: 可以指定要复制和放置资源文件的位置。
  - 此外，这意味着 你可以就近管理图片文件，可以使用相对路径而不用担心部署时 URL 的问题。使用正确的配置，webpack 将会在打包输出中自动重写文件路径为正确的 URL。
- url-loader: 允许你有条件地将文件转换为内联的 `base-64 URL (当文件小于给定的阈值)`，这会减少`小文件的 HTTP 请求数`。如果文件大于该阈值，会自动的交给` file-loader `处理。

