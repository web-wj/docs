(window.webpackJsonp=window.webpackJsonp||[]).push([[41],{479:function(e,a,t){"use strict";t.r(a);var l=t(33),r=Object(l.a)({},(function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"常用扩展"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#常用扩展"}},[e._v("#")]),e._v(" 常用扩展")]),e._v(" "),t("h2",{attrs:{id:"clean-webpack-plugin"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#clean-webpack-plugin"}},[e._v("#")]),e._v(" clean-webpack-plugin")]),e._v(" "),t("blockquote",[t("p",[e._v("A webpack plugin to remove/clean your build folder(s).")])]),e._v(" "),t("ul",[t("li",[e._v("文件发生变化后，自动删除之前的文件。")])]),e._v(" "),t("h2",{attrs:{id:"html-webpack-plugin"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#html-webpack-plugin"}},[e._v("#")]),e._v(" html-webpack-plugin")]),e._v(" "),t("blockquote",[t("p",[e._v("This is a webpack plugin that simplifies creation of HTML files to serve your webpack bundles. This is especially useful for webpack bundles that include a hash in the filename which changes every compilation. You can either let the plugin generate an HTML file for you, supply your own template using lodash templates or use your own loader.")])]),e._v(" "),t("ul",[t("li",[e._v("自动生成 html 文件的，常用的是 template 选项配合"),t("a",{attrs:{href:"https://ejs.bootcss.com/#install",target:"_blank",rel:"noopener noreferrer"}},[e._v("ejs 语法"),t("OutboundLink")],1),e._v("。")])]),e._v(" "),t("h2",{attrs:{id:"copy-webapck-plugin"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#copy-webapck-plugin"}},[e._v("#")]),e._v(" copy-webapck-plugin")]),e._v(" "),t("blockquote",[t("p",[e._v("Copies individual files or entire directories, which already exist, to the build directory.")])]),e._v(" "),t("ul",[t("li",[e._v("通常是将模板文件中需要引入的一些静态资源，如：图片等，copy 到打包后的目录中去，让 html-webpack-plugin 生成的 html 文件可以正常引入原有的资源。")])]),e._v(" "),t("h2",{attrs:{id:"devserver-开发服务器"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#devserver-开发服务器"}},[e._v("#")]),e._v(" DevServer 开发服务器")]),e._v(" "),t("blockquote",[t("p",[e._v("开发阶段使用 devserver 模拟请求服务器的情况。它既不是 loader 也不是 plugin 。他是一个官方单独的库，且支持热更新。")])]),e._v(" "),t("h3",{attrs:{id:"内部逻辑"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#内部逻辑"}},[e._v("#")]),e._v(" 内部逻辑")]),e._v(" "),t("ol",[t("li",[e._v("通过 webpack serve 等指令来使用，首先它内部也是相当于调用了 webpack 的命令，并通过传递的参数，开启 watch 。")]),e._v(" "),t("li",[e._v("它会注册一堆的 hooks ，将资源列表保存起来，它会禁止输出文件，所以开发阶段你是看不到文件的输出的。")]),e._v(" "),t("li",[e._v("它会用 express 来开启一个服务器，监听端口，当请求到达后，返回相应的资源。")])]),e._v(" "),t("ul",[t("li",[e._v("首先，更换域名是不需要修改代码的，这样才比较智能，所有请求就不会携带前面的请求域名，如果开发阶段遇到跨域问题，可以在 proxy 选项中配置，但是需要注意的是请求的地址变化了，有些后端还会对请求头中的 "),t("code",[e._v("host origin")]),e._v(" 字段做判断，所以需要通过 "),t("code",[e._v("changeOrigin：true")]),e._v(" 来更改请求头中的内容。")])]),e._v(" "),t("h2",{attrs:{id:"普通文件的处理-图片"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#普通文件的处理-图片"}},[e._v("#")]),e._v(" 普通文件的处理（图片）")]),e._v(" "),t("ul",[t("li",[e._v("file-loader: 可以指定要复制和放置资源文件的位置。\n"),t("ul",[t("li",[e._v("此外，这意味着 你可以就近管理图片文件，可以使用相对路径而不用担心部署时 URL 的问题。使用正确的配置，webpack 将会在打包输出中自动重写文件路径为正确的 URL。")])])]),e._v(" "),t("li",[e._v("url-loader: 允许你有条件地将文件转换为内联的 "),t("code",[e._v("base-64 URL (当文件小于给定的阈值)")]),e._v("，这会减少"),t("code",[e._v("小文件的 HTTP 请求数")]),e._v("。如果文件大于该阈值，会自动的交给"),t("code",[e._v("file-loader")]),e._v("处理。")])])])}),[],!1,null,null,null);a.default=r.exports}}]);