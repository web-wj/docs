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
