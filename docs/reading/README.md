# 源码阅读

> 参考的路线：https://www.yuque.com/ruochuan12/notice/contents

问题导向的学习：

- 这个模块的代码主要做了什么事情？为什么要这样设计？
- 有什么收获？可以应用到自己的项目中吗？

## vue-shared 模块

首先，这个 shared 模块封装了一些常见的函数方法，以下对一些有代表性的方法做简单的介绍：

- cache:

     ```js
    /**
    * Create a cached version of a pure function.
    */
    export function cached<F: Function> (fn: F): F {
    const cache = Object.create(null)
    return (function cachedFn (str: string) {
        const hit = cache[str]
        return hit || (cache[str] = fn(str))
    }: any)
    }
    ```

    利用闭包的特性做缓存，在 js 中常见，但这里把 str 做属性，值为 undefined 有什么用呢?这里就是用缓存来做一些变量的格式转化。
- camelize

    ```js
    var camelizeRE = /-(\w)/g;
    var camelize = cached(function (str) {
    // The nth string found by a parenthesized capture group, provided the first argument to replace() was a RegExp object. (Corresponds to $1, $2, etc. above.) For example, if /(\a+)(\b+)/, was given, p1 is the match for \a+, and p2 for \b+.
    return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
    });
    ```

    这里用到的 replace 方法，正则匹配的字符作为第二个参数函数的形参，例如：`xiao-tuo-feng: "xiaoTuoFeng"`匹配的字符参数为`-t t` 与 `-f f`

- hyphenate

    ```js
    /**
     * Hyphenate a camelCase string.
    */
    var hyphenateRE = /\B([A-Z])/g;
    var hyphenate = cached(function (str) {
        return str.replace(hyphenateRE, '-$1').toLowerCase()
    });
    ```

    这里的`\B`表示一个非单词边界，`-$1`中代表匹配到的字符，故可以实现 - 连接。
