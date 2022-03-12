# ES6 module

历史上，JavaScript 一直没有 module 体系，无法实现模块化，就使得开发大型的、复杂的项目几乎不可能。在  ES6 之前，社区制定了一些模块加载方案，最主要的有 CommonJS 和 AMD 两种。前者用于服务器，后者用于浏览器。ES6 在语言标准的层面上，实现了模块功能，而且实现得相当简单，完全可以取代现有的 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案。

ES6 模块的设计思想，是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS 和 AMD 模块，都只能在运行时确定这些东西。比如，CommonJS 模块就是对象，输入时必须查找对象属性。

```js
// CommonJS模块
let { stat, exists, readFile } = require('fs');

// 等同于
let _fs = require('fs');
let stat = _fs.stat, exists = _fs.exists, readfile = _fs.readfile;
```

上面代码的实质是整体加载 fs 模块（即加载 fs 的所有方法），生成一个对象（_fs），然后再从这个对象上面读取3个方法。这种加载称为“运行时加载”，因为只有运行时才能得到这个对象，导致完全没办法在编译时做“静态优化”。

ES6 模块不是对象，而是通过 export 命令显式指定输出的代码，再通过 import 命令输入。

```js
// ES6模块
import { stat, exists, readFile } from 'fs';
```

上面代码的实质是从 fs 模块加载3个方法，其他方法不加载。这种加载称为“编译时加载”或者静态加载，即 ES6 可以在编译时就完成模块加载，效率要比 CommonJS 模块的加载方式高。当然，这也导致了没法引用 ES6 模块本身，因为它不是对象。

## 严格模式

ES6 的模块自动采用严格模式，不管你有没有在模块头部加上"use strict";。由于严格模式是 ES5 引入的，不属于 ES6，所以请参阅相关 ES5 书籍，本书不再详细介绍了。

## export 命令

一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取。如果你希望外部能够读取模块内部的某个变量，就必须使用 export 关键字输出该变量。下面是一个 JS 文件，里面使用 export 命令输出变量。

```js
// profile.js
export var firstName = 'Michael';
export var lastName = 'Jackson';
export var year = 1958;
```

上面代码是 profile.js 文件，保存了用户信息。ES6 将其视为一个模块，里面用 export 命令对外部输出了三个变量。

export 的写法，除了像上面这样，还有另外一种。

```js
// profile.js
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

export {firstName, lastName, year};
```

上面代码在 export 命令后面，使用大括号指定所要输出的一组变量。它与前一种写法（直接放置在 var 语句前）是等价的，但是应该优先考虑使用这种写法。因为这样就可以在脚本尾部，一眼看清楚输出了哪些变量。

export 命令除了输出变量，还可以输出函数或类（class）。

需要特别注意的是，export 命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。

```js
// 报错
export 1;

// 报错
var m = 1;
export m;
```

上面两种写法都会报错，因为没有提供对外的接口。第一种写法直接输出1，第二种写法通过变量 m ，还是直接输出1。1只是一个值，不是接口。正确的写法是下面这样。

```js
// 写法一
export var m = 1;

// 写法二
var m = 1;
export {m};

// 写法三
var n = 1;
export {n as m};
```

另外，export 语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。

```js
export var foo = 'bar';
setTimeout(() => foo = 'baz', 500);
```

上面代码输出变量 foo，值为 bar，500毫秒之后变成 baz。
这一点与 CommonJS 规范完全不同。CommonJS 模块输出的是值的缓存，不存在动态更新，详见下文《ES6模块加载的实质》一节。

最后，export 命令可以出现在模块的任何位置，只要处于模块顶层就可以。如果处于块级作用域内，就会报错，下一节的 import 命令也是如此。这是因为处于条件代码块之中，就没法做静态优化了，违背了 ES6 模块的设计初衷。

```js
function foo() {
  export default 'bar' // SyntaxError
}
foo()
```

## import 命令

使用 export 命令定义了模块的对外接口以后，其他 JS 文件就可以通过 import 命令加载这个模块。

```js
// main.js
import {firstName, lastName, year} from './profile';

function setName(element) {
  element.textContent = firstName + ' ' + lastName;
}
```

上面代码的 import 命令，用于加载 profile.js 文件，并从中输入变量。import 命令接受一对大括号，里面指定要从其他模块导入的变量名。大括号里面的变量名，必须与被导入模块（profile.js）对外接口的名称相同。

如果想为输入的变量重新取一个名字，import 命令要使用 as 关键字，将输入的变量重命名。

```js
import { lastName as surname } from './profile';
```

注意，import 命令具有提升效果，会提升到整个模块的头部，首先执行。

```js
foo();

import { foo } from 'my_module';
```

上面的代码不会报错，因为 import 的执行早于 foo 的调用。这种行为的本质是，import 命令是编译阶段执行的，在代码运行之前。

由于 import 是静态执行，所以不能使用表达式和变量，这些只有在运行时才能得到结果的语法结构。

```js
// 报错
import { 'f' + 'oo' } from 'my_module';

// 报错
let module = 'my_module';
import { foo } from module;

// 报错
if (x === 1) {
  import { foo } from 'module1';
} else {
  import { foo } from 'module2';
}
```

最后，import 语句会执行所加载的模块，因此可以有下面的写法。

```js
import 'lodash';
```

上面代码仅仅执行 lodash 模块，但是不输入任何值。如果多次重复执行同一句 import语句，那么只会执行一次，而不会执行多次。也就是说 import 语句是 Singleton (单例)模式。

## 模块的整体加载

除了指定加载某个输出值，还可以使用整体加载，即用星号（*）指定一个对象，所有输出值都加载在这个对象上面。

```js
import * as circle from './circle';

console.log('圆面积：' + circle.area(4));
console.log('圆周长：' + circle.circumference(14));
```

## export default 命令

从前面的例子可以看出，使用 import 命令的时候，用户需要知道所要加载的变量名或函数名，否则无法加载。但是，用户肯定希望快速上手，未必愿意阅读文档，去了解模块有哪些属性和方法。

为了给用户提供方便，让他们不用阅读文档就能加载模块，就要用到 export default 命令，为模块指定默认输出。

```js
// export-default.js
export default function () {
  console.log('foo');
}
```

其他模块加载该模块时，import 命令可以为该匿名函数指定任意名字。

```js
import customName from './export-default';
customName(); // 'foo'
```

```js
// 第一组
export default function crc32() { // 输出
  // ...
}

import crc32 from 'crc32'; // 输入

// 第二组
export function crc32() { // 输出
  // ...
};

import {crc32} from 'crc32'; // 输入
```

本质上，export default 就是输出一个叫做 default 的变量或方法，然后系统允许你为它取任意名字。所以它后面不能跟变量声明语句。

```js
// 正确
export var a = 1;

// 正确
var a = 1;
export default a;

// 错误
export default var a = 1;
```

```js
export {add as default};
// 等同于
// export default add;
```
## export 与 import 的复合写法

如果在一个模块之中，先输入后输出同一个模块，import 语句可以与 export 语句写在一起。

```js
export { foo, bar } from 'my_module';

// 等同于
import { foo, bar } from 'my_module';
export { foo, boo};
```

模块的接口改名和整体输出，也可以采用这种写法。

```js
// 接口改名
export { foo as myFoo } from 'my_module';

// 整体输出
export * from 'my_module';

// 默认接口的写法
export { default } from 'foo';
```

## ES6 模块加载的实质

ES6 模块加载的机制，与 CommonJS 模块完全不同。CommonJS 模块输出的是一个值的拷贝，而 ES6 模块输出的是值的引用。

CommonJS 模块输出的是被输出值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。

```js
// lib.js
var counter = 3;
function incCounter() {
  counter++;
}
module.exports = {
  counter: counter,
  incCounter: incCounter,
};

// main.js
var mod = require('./lib');

console.log(mod.counter);  // 3
mod.incCounter();
console.log(mod.counter); // 3
```

上面代码说明，lib.js 模块加载以后，它的内部变化就影响不到输出的 mod.counter 了。这是因为 mod.counter是一个原始类型的值，会被缓存。除非写成一个函数，才能得到内部变动后的值。

```js
// lib.js
var counter = 3;
function incCounter() {
  counter++;
}
module.exports = {
  get counter() {
    return counter
  },
  incCounter: incCounter,
};
```

上面代码中，输出的 counter 属性实际上是一个取值器函数。现在再执行 main.js，就可以正确读取内部变量counter 的变动了。ES6 模块的运行机制与 CommonJS 不一样，它遇到模块加载命令 import 时，不会去执行模块，而是只生成一个动态的只读引用。等到真的需要用到时，再到模块里面去取值。由于 ES6 输入的模块变量，只是一个“符号连接”，所以这个变量是只读的，对它进行重新赋值会报错。

```js
// lib.js
export let obj = {};

// main.js
import { obj } from './lib';

obj.prop = 123; // OK
obj = {}; // TypeError
```

上面代码中，main.js 从 lib.js 输入变量 obj，可以对 obj 添加属性，但是重新赋值就会报错。因为变量 obj 指向的地址是只读的，不能重新赋值，这就好比 main.js 创造了一个名为 obj 的 const 变量。

最后，export 通过接口，输出的是同一个值。不同的脚本加载这个接口，得到的都是同样的实例。

```js
// mod.js
function C() {
  this.sum = 0;
  this.add = function () {
    this.sum += 1;
  };
  this.show = function () {
    console.log(this.sum);
  };
}

export let c = new C();
```

```js
// x.js
import {c} from './mod';
c.add();

// y.js
import {c} from './mod';
c.show();

// main.js
import './x';
import './y';

// 输出的是1。
```

## 浏览器的模块加载

浏览器使用 ES6 模块的语法如下。

```js
<script type="module" src="foo.js"></script>
```

上面代码在网页中插入一个模块foo.js，由于type属性设为module，所以浏览器知道这是一个 ES6 模块。浏览器对于带有 type="module" 的 `<script>` ，都是异步加载外部脚本，不会造成堵塞浏览器。相当于 defer 。

## 循环加载

“循环加载”（circular dependency）指的是，a 脚本的执行依赖 b 脚本，而 b 脚本的执行又依赖 a 脚本。通常，“循环加载”表示存在强耦合，如果处理不好，还可能导致递归加载，使得程序无法执行，因此应该避免出现。但是实际上，这是很难避免的，尤其是依赖关系复杂的大项目，很容易出现a依赖b，b依赖c，c又依赖a这样的情况。这意味着，模块加载机制必须考虑“循环加载”的情况。

对于 JavaScript 语言来说，目前最常见的两种模块格式 CommonJS 和 ES6 ，处理“循环加载”的方法是不一样的，返回的结果也不一样。

## CommonJS模块的加载原理

CommonJS 的一个模块，就是一个脚本文件。require 命令第一次加载该脚本，就会执行整个脚本，然后在内存生成一个对象。

```js
{
  id: '...',
  exports: { ... },
  loaded: true,
  ...
}
```

上面代码就是 Node 内部加载模块后生成的一个对象。该对象的 id 属性是模块名，exports 属性是模块输出的各个接口，loaded 属性是一个布尔值，表示该模块的脚本是否执行完毕。其他还有很多属性，这里都省略了。

以后需要用到这个模块的时候，就会到 exports 属性上面取值。即使再次执行 require 命令，也不会再次执行该模块，而是到缓存之中取值。也就是说，CommonJS 模块无论加载多少次，都只会在第一次加载时运行一次，以后再加载，就返回第一次运行的结果，除非手动清除系统缓存。

## CommonJS模块的循环加载

CommonJS 模块的重要特性是加载时执行，即脚本代码在 require 的时候，就会全部执行。一旦出现某个模块被"循环加载"，就只输出已经执行的部分，还未执行的部分不会输出。

```js
exports.done = false;
var b = require('./b.js');
console.log('在 a.js 之中，b.done = %j', b.done);
exports.done = true;
console.log('a.js 执行完毕');
```

上面代码之中，a.js 脚本先输出一个 done 变量，然后加载另一个脚本文件 b.js。注意，此时 a.js 代码就停在这里，等待 b.js 执行完毕，再往下执行。

```js
exports.done = false;
var a = require('./a.js');
console.log('在 b.js 之中，a.done = %j', a.done);
exports.done = true;
console.log('b.js 执行完毕');
```

上面代码之中，b.js 执行到第二行，就会去加载 a.js，这时，就发生了“循环加载”。系统会去 a.js 模块对应对象的 exports 属性取值，可是因为 a.js 还没有执行完，从 exports 属性只能取回已经执行的部分，而不是最后的值。a.js 已经执行的部分，只有一行。`exports.done = false;`因此，对于 b.js 来说，它从 a.js 只输入一个变量 done，值为 false。然后，b.js接着往下执行，等到全部执行完毕，再把执行权交还给 a.js。于是，a.js 接着往下执行，直到执行完毕。我们写一个脚本 main.js，验证这个过程。

```js
var a = require('./a.js');
var b = require('./b.js');
console.log('在 main.js 之中, a.done=%j, b.done=%j', a.done, b.done);

// 在 b.js 之中，a.done = false
// b.js 执行完毕
// 在 a.js 之中，b.done = true
// a.js 执行完毕
// 在 main.js 之中, a.done=true, b.done=true
```

另外，由于 CommonJS 模块遇到循环加载时，返回的是当前已经执行的部分的值，而不是代码全部执行后的值，两者可能会有差异。所以，输入变量的时候，必须非常小心。

```js
var a = require('a'); // 安全的写法
var foo = require('a').foo; // 危险的写法

exports.good = function (arg) {
  return a.foo('good', arg); // 使用的是 a.foo 的最新值
};

exports.bad = function (arg) {
  return foo('bad', arg); // 使用的是一个部分加载时的值
};
```

上面代码中，如果发生循环加载，require('a').foo 的值很可能后面会被改写，改用 require('a') 会更保险一点。

## ES6模块的循环加载

```js
// a.js如下
import {bar} from './b.js';
console.log('a.js');
console.log(bar);
export let foo = 'foo';

// b.js
import {foo} from './a.js';
console.log('b.js');
console.log(foo);
export let bar = 'bar';
```

上面代码中，a.js 加载 b.js，b.js 又加载 a.js，构成循环加载。执行 a.js，结果如下。
```js
$ babel-node a.js
b.js
undefined
a.js
bar
```

上面代码中，由于 a.js 的第一行是加载 b.js，所以先执行的是 b.js。而 b.js 的第一行又是加载 a.js，这时由于 a.js 已经开始执行了，所以不会重复执行，而是继续往下执行 b.js，所以第一行输出的是 b.js。

接着，b.js 要打印变量 foo，这时 a.js 还没执行完，取不到 foo 的值，导致打印出来是 undefined。b.js执行完，开始执行 a.js，这时就一切正常了。

再看一个稍微复杂的例子（摘自 Dr. Axel Rauschmayer 的《Exploring ES6》）。

```js
// a.js
import {bar} from './b.js';
export function foo() {
  console.log('foo');
  bar();
  console.log('执行完毕');
}
foo();

// b.js
import {foo} from './a.js';
export function bar() {
  console.log('bar');
  if (Math.random() > 0.5) {
    foo();
  }
}
```

按照 CommonJS 规范，上面的代码是没法执行的。a 先加载 b，然后 b 又加载 a，这时 a 还没有任何执行结果，所以输出结果为 null，即对于 b.js 来说，变量 foo 的值等于 null，后面的 foo() 就会报错。但是，ES6 可以执行上面的代码。

```js
$ babel-node a.js
foo
bar
执行完毕

// 执行结果也有可能是
foo
bar
foo
bar
执行完毕
执行完毕
```

## 动态加载功能

上面说过了，import 语句会被 JavaScript 引擎静态分析，先于模块内的其他模块执行（叫做”连接“更合适）。所以，下面的代码会报错。

```js
// 报错
if (x === 2) {
  import MyModual from './myModual';
}
```

上面代码中，引擎处理 import 语句是在执行之前，所以 import 语句放在 if 代码块之中毫无意义，因此会报句法错误，而不是执行时错误。

这样的设计，固然有利于编译器提高效率，但也导致无法在运行时加载模块。从长远来看，import 语句会取代  Node 的 require 方法，但是 require 是运行时加载模块，import 语句显然无法取代这种动态加载功能。

```js
const path = './' + fileName;
const myModual = require(path);
```

上面的语句就是动态加载，require 到底加载哪一个模块，只有运行时才知道。import 语句做不到这一点。因此，有一个提案，建议引入import()函数，完成动态加载。

## ES6模块的转码

浏览器若不支持 ES6 模块，为了使用，可以转为 ES5 的写法。除了 Babel 可以用来转码之外，还有以下两个方法，也可以用来转码。

- ES6 module transpiler

ES6 module transpiler 是 square 公司开源的一个转码器，可以将 ES6 模块转为 CommonJS 模块或 AMD 模块的写法，从而在浏览器中使用。

首先，安装这个转码器。`$ npm install -g es6-module-transpiler`。然后，使用 compile-modules convert命令，将 ES6 模块文件转码 `$ compile-modules convert file1.js file2.js`。-o参数可以指定转码后的文件名。`$ compile-modules convert -o out.js file1.js`。

- SystemJS

它是一个垫片库（polyfill），可以在浏览器内加载 ES6 模块、AMD 模块和 CommonJS 模块，将其转为 ES5 格式。它在后台调用的是 Google 的 Traceur 转码器。

使用时，先在网页内载入system.js文件。`<script src="system.js"></script>`。然后，使用 System.import 方法加载模块文件。

```js
<script>
  System.import('./app.js');
</script>
```

上面代码中的./app，指的是当前目录下的app.js文件。它可以是ES6模块文件，System.import会自动将其转码。需要注意的是，System.import使用异步加载，返回一个 Promise 对象，可以针对这个对象编程。下面是一个模块文件。

```js
// app/es6-file.js:

export class q {
  constructor() {
    this.es6 = 'hello';
  }
}
```

然后，在网页内加载这个模块文件。

```js
<script>

System.import('app/es6-file').then(function(m) {
  console.log(new m.q().es6); // hello
});

</script>
```

上面代码中，System.import方法返回的是一个 Promise 对象，所以可以用then方法指定回调函数。