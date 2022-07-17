# stylus

> [张鑫旭中文翻译：](https://www.zhangxinxu.com/jq/stylus/)

- stylus 是 css 预处理框架，可以用来给 node 项目进行 css 预处理，创建健壮的、动态的、富有表现力的 css 。类似 sass/less 近似脚本的方式去写 css 代码。

## 基础语法

stylus vs css ,区别在于选择器后面不需要`{}`,hhh~就是 `coffee` 与 `js`，利用缩进、空格和换行来进行减少需要输入的字符。

```css
-pos(type, args)
  i = 0
  position: unquote(type)
  {args[i]}: args[i + 1] is a 'unit' ? args[i += 1] : 0
  {args[i += 1]}: args[i + 1] is a 'unit' ? args[i += 1] : 0

absolute()
  -pos('absolute', arguments)

fixed()
  -pos('fixed', arguments)

#prompt
  absolute: top 150px left 5px
  width: 200px
  margin-left: -(@width / 2)

#logo
  fixed: top left
```

编译后

```css
#prompt {
  position: absolute;
  top: 150px;
  left: 5px;
  width: 200px;
  margin-left: -100px;
}
#logo {
  position: fixed;
  top: 0;
  left: 0;
}
```

