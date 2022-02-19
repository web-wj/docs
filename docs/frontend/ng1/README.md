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
