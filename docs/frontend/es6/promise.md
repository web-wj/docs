# promise

## 事件循环 event-loop

- 浏览器宿主环境五个线程：
  - js 引擎：负责执行执行栈栈顶代码。
  - GUI 线程：负责页面的渲染。（与 js 引擎相互等待）
  - 事件监听线程：负责监听事件。
  - 计时线程：负责计时。
  - 网络线程：负责网络通信的。

当上面的线程发生了某些事情，会将处理程序加入到事件队列的内存。当 js 引擎发现执行栈没有内容的时候，会将事件队列的第一个函数加入到执行栈执行。js 引擎对从事件队列取出以及与宿主环境之间的配合，称之为事件循环。

- 事件队列
  - 宏任务：计时器结束的回调、http 回调、事件的回调
  - 微任务: MutationObserver、promise

## promise 基础

- 两个阶段三个状态。阶段状态皆不可逆。。。
- `new Promise(() => { 描述任务的逻辑 })`
- .then .catch
  - then 返回一个新的 promise
  - 如果前一个 promise 没有后续处理的函数，则和之前的 promise 任务状态一致，数据也一样。
  - 有后续处理，还没有执行，处于挂起状态。
  - 有后续处理，执行了，若无错，则新任务状态为完成，*数据为后续处理返回值*，若有错，则失败原因。
- 链式调用（表白的场景，表白失败下一个 ）
- 静态方法（做家务的场景）
  - Promise.resolve(data)
  - Promise.reject(reason)
  - Promise.all([]) 返回一个新 Promise .所有成功才成功，若失败，则为失败的。
  - Promise.race([]) 一个已决就可，返回则为第一个。
  - Promise.any([]) 一个成功就可，返回则为第一个,全失败才失败
  - Promise.allSettled([]) 返回一个新 Promise .所有有结果才成功，只会出现 pendding fullfilled。

### 练习

- 延迟一段时间输出 finish

```js
function deploy(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, duration);
  });
}
deploy(1000).then(() => console.log('finish'))
```

## async await

- promise 没有消除回调，只是统一了异步处理场景以及回调地狱。
- 语法糖 -> 消除了异步场景的回调。 es7 2016 推出 async await 
- async 一定返回 promise 返回后续处理的相关数据
- 失败就会报错，需要 try...catch 来捕获

