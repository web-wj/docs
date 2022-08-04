# 项目亮点

## 模块开发

- 整个项目提供基于模块（module）的扩展开发机制，以灵活应对复杂的客户需求，隔离业务边界。一般每个模块是一个独立的代码仓库。
- 模块在构建和运行时会被自动化脚本根据 modules.yml 的声明下载到主项目的 modules/ 目录下，然后建立必要的软链，故主项目和众多模块虽然不在一个代码仓库中，但开发体验上跟单体应用差不多，模块可直接复用主项目的代码。

- ```yml
  modules:
  - name: xxx
    namezh: xxx
    team:
      pm: { name: xxx, phone: 'xxx' }
      techLead: { name: xxx, phone: 'xxx' }
    types: [xxx]
    environments: '*'
    frontendv2:
      type: xxx
  ```

- 路由的封装引入。
    - require.context 引入 locales 以及 routes 文件。
- 权限控制。

## uniapp

1. 利用 minprogram-to-uniapp 迁移代码
2. 处理一些常见错误，例如：this.data.xxx -> this.xxx
3. 重写页面和组件的一些东西
4. 封装请求

### 封装 uniapp 组件和页面

- 将主题色等变量在每个页面组件中注入，可以使用 css variables 实现。
- 将 i18n 等依赖的模块在页面和组件内都注册一遍。
- 正常按照属性写 data ,会在内部封装为方法，实现复用隔离。

- 页面重写 onLoad、onShow、onHide、onUnload 方法。
    - 调用接口获取一些页面信息作为参数传递。
    - 由于 onLoad 中有异步请求，onShow 中用一个 setTimeout 来确保 onShow 在 onLoad 之后执行。
- 组件重写生命周期函数，增加一些格外的操作。

- 封装好的 sdk，然后创建一个子类继承一些 sdk 导出的父类，拦截器对请求失败的情况做额外的配置，例如：弹窗显示网络连接不稳定，用户 token 过期跳转开屏页面重新登录。

## vue -> saas 多租户、scrm 系统(营销系统)

- 描述 saas 定制化方案啥的？
  - 深度
- 不同租户是如何展示不同的页面的？每个地区展示不同给的页面？
  - 路由的时候注册一个方法来控制导航栏显示隐藏。
- public cdn 引入一个 不是 npm 的包。
- iframe 外面怎么知道里面怎么渲染完毕了？
  - 判定什么时候算渲染完毕？
    - 自己的项目 - contentWindow 10ms 轮询，观察里面的元素或者变量 - 代码window.aaaa = true
    - 第三方 - 找最后一个元素
  - postmessage 里给外发？
  - 外面主动探测，里面不往外发？
  - iframe - 跨域问题 - 统一一级域名
- scrm - 智能营销、全域会员、私域商城（小程序）
  - 鉴权登录的闭环 set-cookie 存在 token (post ok)
