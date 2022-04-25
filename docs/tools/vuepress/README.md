# vuepress

## vuepress-img-format

vuepress-img-format 插件的使用存在局限性，发现只支持将 markdown 语法转换为 a 标签。

但是代码中还存在许多直接使用 img 标签的，所以需要将 img -> a ，可以将 img -> markdown 语法 -> a。

<<< @/docs/tools/vuepress/extension.js