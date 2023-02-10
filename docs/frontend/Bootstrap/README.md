# Bootstrap

> https://getbootstrap.com/docs/4.6/getting-started/introduction/

- Layout
- Content
- Components
- Utilities

## 响应式

特点：

- 字体用 rem、em 做单位
- 少用绝对宽度
- 布局使用浮动和弹性布局
- 媒体查询

css规则

- @规则
    - @chartset 定义编码
    - @import 引入css 文件
    - @font-face 自定义字体
    - @keyframs animation 的关键帧
    - @media 媒体查询
        - `@media all and (min-width: 200px) { ... }`
        - style 标签内 + 条件
        - link media 属性 + 条件
        - @import url('path')(min-width: 200px) + 条件

### 媒体查询

> https://drafts.csswg.org/mediaqueries/

1. 媒体类型

- all print screen speech

2. 媒体特性

- 宽、高 `min-width` `max-width`
- 方向 `orientation` `landscape` 横屏 `portrait` 竖屏 （判断依据就是宽高大小）
- 宽高比 `aspect-ratio`
- 像素比 `-webkit-device-pixel-ratio`

3. 逻辑运算符
