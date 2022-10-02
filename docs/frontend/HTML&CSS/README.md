# HTML CSS

## box-sizing

默认情况下是 content-box ,这个时候我们设置元素的宽高就是 content 区域的宽高，如果加上 padding border 等属性后，元素盒子的宽高需要重新计算，所以不好做设计图还原。

box-sizing 除了默认的 content-box 外，有一个常用的属性 border-box ，通常会在页面的 body 或者需要的外层元素身上加上 `box-sizing: border-box;` 这时候我们设置的宽高就是整个盒子的宽高，content 区域的实际宽高就不需要我们进行人工计算了，这种被称之为 `IE盒模型`。

常见的做法：

```css
*, :before, :after {
  box-sizing: border-box;
}
```

## 颜色的 alpha 通道

`rgba()`,最后一个值表示透明度，这很容易联想到 `opacity` 属性。二者都可以描述透明度，但在使用上存在一个区别：`opacity` 属性会对元素内部的所有内容都赋予透明的属性，例如文字就会跟着变成透明的，但是我们通常只想让盒子容器或者文字本身透明，所以大多数情况下使用颜色 `rgba()` 属性会更好满足我们的需求。

## 尺寸的百分比

对应普通的元素来说（无定位属性的元素），百分比的尺寸通常表达相对于父元素**内容区域**的宽高尺寸。有定位属性的元素，则是相对于父元素中**第一个定位元素的padding + content**区域。

若参考系的高度受百分比元素本身影响的话，设置无效。例如：

```css
.parent {
  /* ... */
}
.child {
  height: 50%;
}

<div class="parent">
  <div class="child"></div>
</div>
```

补充细节：padding | border | margin 的百分比是相对于参考系的宽度。

## 最大最小宽高

通常是将设计图的宽度设置为最小宽度：`min-width: 1226px;`。

又或者我们给页面中的所有图片设置一个最大宽度，让它不超过容器。`max-width: 100%;`

## 表单

```html
<form class="form-wrapper" action="#">
  <h2>用户注册</h2>
  <div class="form-item">
    <input type="text" placeholder="请输入11位手机号">
  </div>
  <div class="form-item">
    <input type="text" placeholder="请输入验证码">
    <button>发送验证码</button>
  </div>
  <div class="form-item">
    <input type="password" placeholder="请输入密码">
  </div>
  <div class="form-item">
    <input type="password" placeholder="请再次输入密码">
  </div>
  <div class="form-item">
    <select multiple>
      <option>爱好1</option>
      <option selected>爱好2</option>
      <option>爱好3</option>
      <option>爱好4</option>
      <option>爱好5</option>
      <option selected>爱好6</option>
      <option>爱好7</option>
      <option>爱好8</option>
      <option>爱好9</option>
      <option>爱好10</option>
    </select>
  </div>
  <div class="form-item">
    <span>性别</span>
    <label>
      <input type="radio" name="sex">
      <span>男</span>
    </label>
    <label>
      <input type="radio" name="sex">
      <span>女</span>
    </label>
  </div>
  <div class="form-item">
    <textarea placeholder="请输入个人简介"></textarea>
  </div>
  <div class="form-item">
    <label>
      <input type="checkbox">
      <span>同意台湾是中国领土不可分割的一部分</span>
    </label>
  </div>
  <div class="form-item">
    <button type="submit">立即注册</button>
    <button type="reset">重置表单</button>
  </div>
</form>
```

### 小细节

`outline` 在 `border` 外面，聚焦后没有边框。
`text-indent` 首行缩进
`resize:none;` 多行文本禁止改变尺寸。
写浮动导致高度坍塌了 -> 清除浮动`clear:both;` -> bfc(副作用)。
`checkbox` 与 `span` 元素垂直方向没对齐，用 `vertical-align` 。

`input~span` 选中下面所有的 span 兄弟元素
`input+span` 选中下面第一个 span 兄弟元素

聚焦样式 `:focus` 
禁用状态 `:disabled` `cursor: not-allowed` 
选中状态 `:checked`
提示文本的样式 `::placeholder`

## sprite(精灵图、雪碧图)

`background-position:x y` + `width: x;height: y` 二者配置显示！ 

`viewport` 视口

## 属性值的计算过程

我们在给 div 里面的 a 标签设置颜色的时候，会发现直接给 div 设置 color 无效，我们就会疑惑，color 是具有继承性的属性，为什么设置无效呢？要解释这里的问题，我们就要了解 CSS 属性的计算过程。

1. 确定声明值 - 这个步骤是将没有发生层叠冲突的 CSS 属性直接做为最终的值。
2. 层叠冲突 - 首先用户自定义的样式属性级别是高于浏览器默认的属性的，其次会比较样式权重，最后比较样式的顺序，后面覆盖前面。
3. 使用继承 - 具有继承属性的 CSS 样式，例如：`字体相关、line-height、text-align、color` 等。
4. 使用默认值 - 每个 CSS 属性都有一个默认值，例如：`color:transparent`。

所以，a 标签的颜色是在第一步声明值的时候，发现 color 是仅仅在浏览器的默认样式就确认了，所有设置无效。

解决的办法是：`a {color: inherit}`，这样在 div 里设置，它就会使用继承值了，可以有效简化代码。

## 伪类选择器

LOVE HATE LVHA

```css
/* 未访问的链接 */
a:link {
  color: #FF0000;
}

/* 已访问的链接 */
a:visited {
  color: #00FF00;
}

/* 鼠标悬停链接 */
a:hover {
  color: #FF00FF;
}

/* 已选择的链接 */
a:active {
  color: #0000FF;
}

/* 第一个子元素,且为 a 元素 */
a:first-child {}
/* 最后一个子元素,且为 a 元素 */
a:last-child {}
/* 第 n 个元素,且为 a 元素 */
a:nth-child(n) {}
/* 第 n 个 type 为 a 的元素 */
a:nth-of-type(n) {}
```

## 富文本

div 身上添加 contentEditable 属性即可实现编辑功能，且它比 textarea 更强大，可以添加图片、视频等，所以可以实现富文本。

