# es6 

- 事件循环
- promise A+ 规范
- promise API
- Proxy 代理
  - 利用 Object.defineProperty() 实现的对象监听
  
  ```js
  function observer (target){
        const div = document.getElementsByClassName('warpper')[0];
        const ob = {};
        const props = Object.keys(target);
        for(const prop of props){
          console.log(prop);
          Object.defineProperty(ob, prop, {
            get() {
              return target[prop];
            },
            set(val) {
              target[prop] = val;
              render();
            },
            enumerable: true,
          })
        }
        console.log(ob)
        render();
        function render(){
          let html = '';
          for(prop of Object.keys(ob)) {
            html += `
              <p><span> ${prop} : </span><span> ${ob[prop]} </span></p>
            `;
          }
          div.innerHTML = html;
        }
        return ob;
      }
      const target = {
        a: 1,
        b: 2
      }
      const ob = new observer(target);
  ```

- 使用代理：
  ```js
      function observer (target){
      const div = document.getElementsByClassName('warpper')[0];
      const ob = new Proxy(target, {
        get(target, prop) {
          return Reflect.get(target, prop)
        },
        set(target, prop, val) {
          Reflect.set(target, prop, val);
          render();
        }
      }) 
      console.log(ob)
      render();
      function render(){
        let html = '';
        for(prop of Object.keys(ob)) {
          html += `
            <p><span> ${prop} : </span><span> ${ob[prop]} </span></p>
          `;
        }
        div.innerHTML = html;
      }
      return ob;
    }
  ```