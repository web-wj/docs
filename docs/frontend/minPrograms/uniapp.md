# uniapp

> 记录会员小程序的制作过程。

- easycom 页面路由 pages.json 文件中组件模式，可以无需注册引入，直接使用，可以理解为全局引入。

## 组件的生命周期

- 组件实例刚刚被创建好时 created 生命周期被触发。此时，组件数据 this.data 就是在 Component 构造器中定义的数据 data 。 此时还不能调用 setData 。 通常情况下，这个生命周期只应该用于给组件 this 添加一些自定义属性字段。
- 在组件完全初始化完毕、进入页面节点树后 attached 生命周期被触发。此时 this.data 已被初始化为组件的当前值。这个生命周期很有用，绝大多数初始化工作可以在这个时机进行。
- 在组件离开页面节点树后， detached 生命周期被触发。退出一个页面时，如果组件还在页面节点树中，则 detached 会被触发。

## uniapps 小程序的部署

### 字节跳动小程序

- https://microapp.bytedance.com/docs/zh-CN/mini-app/thirdparty/overview/concept

### 微信小程序

- [第三方代开发小程序相关概念](https://developers.weixin.qq.com/miniprogram/dev/devtools/ext.html#%E5%B0%8F%E7%A8%8B%E5%BA%8F%E6%A8%A1%E6%9D%BF%E5%BC%80%E5%8F%91)
- 绑定开发小程序 -> 小程序模版的开发和上传 -> 草稿箱 -> 添加到小程序模版库，获得模版ID -> [调用接口](https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=open1489140610_Uavc4&token=&lang=zh_CN)，为旗下授权的小程序部署代码。
- [miniprogram-ci](https://developers.weixin.qq.com/miniprogram/dev/devtools/ci.html)

## 杂烩

- http://underscorejs.org/ 小程序端使用的类似 lodash 库
- [postcss-px2rem](https://juejin.cn/post/6844903828408533000) 移动端适配的方案。
- 视频插件、订阅等类似的功能需要在公众平台中进行配置，而且注意注册插件时候使用的 appid 。
