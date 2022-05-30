# navigation bar 和 tab bar

Author: Tim Jing

## TabBar

### 官方原生

* app.json 声明，最多五个。
* 图片必须是本地路径。`wx.setTabBarItem` 支持了网络文件。
* 不能定制化增减。
* 样式单一（icon 大小，颜色等)。
* 拥有最高优先级，自定义遮罩层无法覆盖。
* 反应快速，配置简单，加载快。

### 官方自定义

### 自定义组件

* 使用 `wx.navigateTo` 跳转。页面加载效果和 `switchTab` 不一样。
* 需要自己缓存结点。

## 原生的 navigation bar

### page-meta 组件

* 配合 navigate-bar 组件一起使用。配置页面属性，只能是页面第一个节点。
* 与配置文件 `json` 的区别是这里可以动态设置。

### navigation-bar

* 只能是 page-meta 组件内的第一个节点。

## 自定义 navigation bar

* 配置自定义

    ```json
    "window": {
    	"navigationStyle": "custom"
    }
    ```

* `wx.getSystemInfo()` 返回值
    * `statusBarHeight` 状态栏高度。
    * `windowHeight` 可使用窗口高度。
    * `safeArea`

* `wx.getMenuButtonBoundingClientRect()`
    * `top` 、`width` 、`height`
    * 有可能获取错误或者为0。

![img](navigate-bar.assets/webp.webp)

* navigationBarHeight = 蓝框高度 * 2 + 胶囊高度
* 蓝框高度胶囊 top - statusBarHeight

```javascript
const { statusBarHeight, platform } = wx.getSystemInfoSync()
const { top, height } = wx.getMenuButtonBoundingClientRect()

// 状态栏高度
wx.setStorageSync('statusBarHeight', statusBarHeight)
// 胶囊按钮高度 一般是32 如果获取不到就使用32
wx.setStorageSync('menuButtonHeight', height ? height : 32)

// 判断胶囊按钮信息是否成功获取
if (top && top !== 0 && height && height !== 0) {
    const navigationBarHeight = (top - statusBarHeight) * 2 + height
    // 导航栏高度
    wx.setStorageSync('navigationBarHeight', navigationBarHeight)
} else {
    wx.setStorageSync(
      'navigationBarHeight',
      platform === 'android' ? 48 : 40
    )
}
```
