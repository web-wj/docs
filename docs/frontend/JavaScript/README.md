# js 基础

js 的基础决定之后学习的根基，要不断加强基础内容的学习。

## 表达

变量 | 字面量 | 表达式 

转义字符 
`console.log('第一行文字\r\n第二行文字')`

打字机 `\r\n 表示回车换行`

原始数据类型：number | string | boolean | null | undefined

引用数据类型：对象（数组 | 函数 | 普通对象） 

对象中的每个键值对的 key 都为 string , `obj.a => obj['a']`

## 类型的隐式转换

`+'123' => 123    +'123a' => NaN`
`!'0' => false` 布尔判定 false | null | undefined | 0 | '' | NaN => false

## 数据存储

### 交换俩个变量的值

很常见的想到：

```js
function swap(a, b) {
  var temp = a;
  a = b;
  b = a;
}
var n1 = 1, n2 = 2;

swap(n1, n2);
```

但是没有生效，因为改变的仅仅是形参，无解。

## 作用域
