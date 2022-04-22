# devtools 使用

> 效率是第一生产力：https://mp.weixin.qq.com/mp/appmsgalbum?action=getalbum&album_id=1349545506497855489&__biz=MzA5NjM5MjM1Nw==&scene=21#wechat_redirect

## Elements

- alt + dom 节点前的小三角可以快速展开子节点。
- shift + 鼠标左键，可快速切换颜色的 rgba hsl 等类型。
- 节点断点，可通过 break on 添加，在 Dom breakpoints 中查看。
- 鼠标右键 Force State 可为元素添加状态进行调试。
- 双击可修改盒模型。

## Console

- Esc 快捷键让 Console 在每个面板都能显示。
- 相同的消息默认是堆叠的，可以通过 ctrl+shift+p 输入 time 命令或者设置中找到 timestamps 命令，给消息加上时间戳。
- 在调试环境下的断点内，可以获取局部变量值。
- 执行环境(选择当前页面还是 iframe 页面)。
- 右侧齿轮设置：
    - 通过 Preserve log 选择保留历史记录，即刷新页面后是否还显示先前的消息。
    - 通过选项Log XMLHttpRequest选择是否输出所有 XMLHttp 请求日志(可以监控页面所有 ajax 请求 定位其代码调用栈)。
- $ 字符的相关使用：
    - 可以通过 $0，获取当前在 Elements 面板所选中的元素节点。
    - $_可以引用上一次执行的结果。
    - $$ 是 document.querySelectorAll 方法的更佳替代，因为 document.querySelectorAll 返回的是 nodeList(NodeList)，而$$能直接返回数组(Array)。
    - 如果需要使用 npm 的包，可以安装 Console Importer 插件，用$i方法引入 npm 中的库: $i('react')。
        - https://github.com/pd4d10/console-importer/issues/3 可以关闭，但是没必要。在掘金网站上使用，它没有开启 CSP 。
- console 命令的使用：
    - 可以使用 console.time()和 console.timeEnd()方法来测量时间差。
    - monitor(function)方法来追踪函数调用信息，当函数被执行，会输出追踪信息。
    - monitorEvents(el,eventType)方法来追踪事件。

## Sources

## Network

## Performance

### 浏览器并发请求数

- 现象：同一时间针对同一域名下的请求有一定数量限制。超过限制数目的请求会被阻塞。
- 原因：基于端口数量和线程切换开销的考虑，浏览器不可能无限量的并发请求。
- 导致：有大量请求的站点，响应较慢，因为并发请求会被阻塞。

- 解决方法：

    - 用不同域名（hash domain，cookie free） 例如知乎的图片都是放在 zhiimg.com 域名下获取的。cookie free 是指，例如知乎主站 zhihu.com域名下有很多 cookie，换成 zhihuimg.com 请求图片时，就不会把 zhihu 上的cookie发过去，减小所需带宽。
    - 减少请求数 雪碧图 合并压缩css/js（另一个原因是为了减少重绘） 利用 Cache-Control 等缓存静态资源，在更新静态资源时使用不同 url 或文件名带上版本 懒加载，出现再加载。
