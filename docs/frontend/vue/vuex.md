# vuex 遇到的问题

## getter 解构

- mapGetters 放到 methods 中的原因：
    - oem.type不会发生变化，仅仅是调用一个接口然后赋值，这里主要是 computed 与 methods 的区别，使用 computed 主要是响应式数据的改变引发重新渲染，而这里不需要做这样的事情，无需把它认为是 store 的计算属性。

## 多模块间传递 state

- 项目 vuex 没有使用命名空间，getters 是全局的，放到了一起，适用于比较少的场景。
    - 在 actions 中使用跨模块的 state ，其中 context 参数中包含了 rootState 的全局状态，可以利用 rootstate.moduleName.xxx 来调用。类似的还有 rootGetters ，但是因为是全局注册的 getters，所以可以直接使用 getters 在各个模块中。
