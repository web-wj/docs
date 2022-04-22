# ng1

> 由于历史遗留问题，仍需要维护老项目 ng1，当前的版本为：angular 1.2.27，官方文档：<https://github.com/angular/angular> <br/> js 部分是采用的 coffeescript ，一种 js 的转译语言，目的在于缩减代码量，官方文档：<https://coffeescript.org/#introduction>

## 控制器模板案例

```js
define [
  'wm/app'
  'wm/config'
], (app, config) ->
  DemoController = (
    $stateParams
    NgTableParams
    restService
  ) ->
    # 常量定义部分
    CONSTANT =
      TITLE: 'title'

    # 共享变量定义部分
    states = {}

    # 页面视图模型初始化部分
    init = (vm) ->
      vm.cardId = $stateParams.id

      initBreadcrumb vm
      initTableParams vm

　　# 页面视图模型依赖的初始化函数定义部分

　　# 初始化面包屑
    initBreadcrumb = (vm) ->
      vm.breadcrumb = [
        text: 'customer_card',
        href: '/member/card'
      ,
        'customer_card_detail'
      ]

　　 #　初始化数据列表
    initTableParams = (vm) ->
      vm.tableParams = new NgTableParams(
        page: 1
        count: 20
        sorting:
          createdAt: 'desc'
      ,
        total: 0
        getData: fetchList
      )

    # 跟服务器交互相关函数定义部分
    fetchList = (tableParams) ->
      params =
        'per-page': tableParams.count()
        'page': tableParams.page()
        orderBy: tableParams.sorting()

      restService.get(config.resources.demo, params).then ({ data }) ->
        tableParams.total data._meta.totalCount
        return data.items

    # 视图模型赋值部分
    vm = this

　　# 视图模型绑定方法定义部分
    vm.onTableReload = ->
      vm.showNav = not vm.showNav
      vm.tableParams.reload()

　　# 调用初始化方法
    init vm

    vm

　# 注册控制器部分
  app.registerController 'wm.ctrl.module.demo', [
    '$stateParams'
    'NgTableParams'
    'restService'
    DemoController
  ]
```

## ng-controller

### 请求为什么会发送两次

- 在对接系统的时候，定制化登录页面，发现了前端调了 oauth 接口，网上胡乱找了一通，有说是浏览器问题的，有说浏览器插件的问题，我甚至想到了网络不佳，网络传输中的问题，这个需要待考虑？为什么不是这个原因？网络传输会导致出现这样的问题吗？
- 但我们这边好像不是这些原因，因为之前写 ng1 的页面的时候就没有发现这样的情况，所以应该还是代码中的问题。最后发现是 html 页面中使用了 ng-controller 的指令导致的，为什么会引发这样呢？

    - 弄清楚之前的映射关系的实现，为什么在相同结构中创建 html 与 控制器，且注册控制器的名称最后的名字可作为 $scope 、this 使用？
        - 映射关系是这样的，ng1 框架中的路由规则匹配中 controllerAs 以及 controller 已经将静态资源与控制器关联，所以在 html 中重复写会调用两次控制器中的方法。
        - https://code.angularjs.org/1.2.32/docs/api/ng/directive/ngController
        - Note that you can also attach controllers to the DOM by declaring it in a route definition via the $route service. A common mistake is to declare the controller again using ng-controller in the template itself. This will cause the controller to be attached and executed twice.
