# 一、setState

**setState更新状态的2种写法**

-  **setState(stateChange, [callback])------对象式的setState**
   - stateChange为状态改变对象(该对象可以体现出状态的更改)
   - callback是可选的回调函数, 它在状态更新完毕、界面也更新后(render调用后)才被调用
-  **setState(updater, [callback])------函数式的setState**
   - updater为返回stateChange对象的函数。
   - updater可以接收到state和props。
   - callback是可选的回调函数, 它在状态更新、界面也更新后(render调用后)才被调用。

总结:

- 对象式的setState是函数式的setState的简写方式(语法糖)
- 使用原则：
  - 如果新状态不依赖于原状态 ===> 使用对象方式
  - 如果新状态依赖于原状态 ===> 使用函数方式
  - 如果需要在setState()执行后获取最新的状态数据, 要在第二个callback函数中读取
  - 写法都差不多，看个人习惯。

```react
import React, { Component } from 'react';

export default class Demo extends Component {
  state = { count: 0 };
  add = () => {
    //setState的对象式写法
    //this.setState是异步的，可以通过callback获取更新后的信息
    // const { count } = this.state;
    // this.setState({ count: count + 1 },() => {
    //     console.log(this.state.count);
    // });

    //setState的函数式写法
    //默认传递state props两个参数
    this.setState((state, props) => {
      return { count: state.count + 1 };
    });

    //简写方式
    this.setState((state) => ({ count: this.state.count + 1 }));
  };
  render() {
    return (
      <div>
        <h2>求和为{this.state.count}</h2>
        <button onClick={this.add}>点我+1</button>
      </div>
    );
  }
}
```

# 二、lazyLoad

**路由组件懒加载 --- lazyLoad**

通过React的lazy函数配合import()函数动态加载路由组件 ===> 路由组件代码会被分开打包*

```react
const Login = lazy(()=>import('@/pages/Login'))
	
	//2.通过<Suspense>指定在加载得到路由打包文件前显示一个自定义loading界面
	<Suspense fallback={<h1>loading.....</h1>}>
        <Switch>
            <Route path="/xxx" component={Xxxx}/>
            <Redirect to="/login"/>
        </Switch>
    </Suspense>
```

```react
import React, { Component, lazy, Suspense } from 'react';
import { Route, Switch, Redirect, Link } from 'react-router-dom';
//懒加载方式加载路由
const Home = lazy(() => import('../Home'));
const About = lazy(() => import('../About'));
export default class Lazy extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-offset-2 col-xs-8">
            <div className="page-header">
              <h2>React Router Demo</h2>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-2 col-xs-offset-2">
            <div className="list-group">
              <Link to="/about" children="About">
                About
              </Link>
              <Link to="/home" children="Home">
                Home
              </Link>
            </div>
          </div>

          <div className="col-xs-6">
            <div className="panel">
              <div className="panel-body">
                {/* 注册路由 */}
                 {/* Suspense中的fallback用于指定懒加载路由组件时的显示 */}
                <Suspense fallback={<h1>Loading</h1>}>
                  <Switch>
                    <Route path="/about" component={About} />
                    <Route path="/home/" component={Home} />
                    <Redirect to="/home" />
                  </Switch>
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
```

# 三、React Hooks

Hook是React 16.8.0版本增加的新特性/新语法

可以让你在函数组件中使用 state 以及其他的 React 特性

## useState

```react
import React from 'react';
// export default class Demo extends React.Component {
//   add = () => {
//     this.setState((state, props) => {
//       return { count: state.count + 1 };
//     });
//   };
//   render() {
//     return (
//       <div>
//         <h2>求和为{this.state.count}</h2>
//         <button onClick={this.add}>点我+1</button>
//       </div>
//     );
//   }
// }
function Demo() {
  //使用useState
  const [count, setCount] = React.useState(0);
  const [name, setName] = React.useState('tom');
  function add() {
    setCount((count) => count + 1);
  }
  function change() {
    setName((name) => 'jack');
  }
  return (
    <div>
      <h2>求和为{count}</h2>
      <h2>名字为{name}</h2>
      <button onClick={add}>点我+1</button>
      <button onClick={change}>点我改名</button>
    </div>
  );
}
export default Demo;
```

## useEffect

Effect Hook 可以让你在函数组件中执行副作用操作(用于模拟类组件中的生命周期钩子)

- React中的副作用操作:
  - 发ajax请求数据获取
  - 设置订阅 / 启动定时器
  - 手动更改真实DOM

语法和说明: 

```react
 useEffect(() => { 

     // 在此可以执行任何带副作用操作

     return () => { // 在组件卸载前执行

      // 在此做一些收尾工作, 比如清除定时器/取消订阅等

     }

    }, [stateValue]) // 如果指定的是[], 回调函数只会在第一次render()后执行

  
```

可以把 useEffect Hook 看做如下三个函数的组合

- componentDidMount()
- componentDidUpdate()
- componentWillUnmount() 

```react
/*useEffect传递两个参数
    1、第一个参数为回调函数
    2、第二个参数为一个数组，起到监听作用
    3、不传递第二个参数，componentDidMount 和 componentDidUpdate都会被检测并响应
    4、第二个参数传递的为一个空数组，代表生命周期函数都不会被检测
    5、如果传递的不是空数组，在传的数组中的值发生变化时会监听componentDidUpdate
    6、返回一个函数代表componentWillUnmount生命周期钩子
*/
  React.useEffect(() => {
    console.log(1);
    setInterval(() => {
      setCount((count) => count + 1);
    },1000);
    //componentWillUnomunt
    return () => {
      console.log(1);
    }
  },[count]);
```

## useRef

Ref Hook可以在函数组件中存储/查找组件内的标签或任意其它数据

语法: const refContainer = useRef()

作用:保存标签对象,功能与React.createRef()一样

```react
 const myRef = React.useRef();
  function show() {
    console.log(myRef.current.value);
  }
<input type="text" ref={myRef} />
<button onClick={show}></button>
```

# 四、Fragment

正常写组件引用组件结构：

```react
return (
      <div>
        <Demo />
      </div>
    );
```

每次都要嵌套一个无用的div标签

可以使用Fragment来替换div，页面在渲染的时候不会渲染Fragment，省掉了无用的嵌套

```react
import React, { Component, Fragment } from 'react';
export default class App extends Component {
  render() {
    return (
      <Fragment>
        <Demo />
      </Fragment>
    );
  }
}

```

使用空标签也可以：

```react
import React, { Component, Fragment } from 'react';
export default class App extends Component {
  render() {
    return (
      <>
        <Demo />
      </>
    );
  }
}
```

两者不同：

Fragmengt可以传递key值来表示唯一，且只能传递key

空标签不可以

```react
import React, { Component, Fragment } from 'react';
export default class App extends Component {
  render() {
    return (
      <Fragment key={1}>
        <Demo />
      </Fragment>
    );
  }
}
```

# 五、context

context适用于祖组件与后代组件间的组件通信

- 创建Context容器对象：

```react
const MyContext = React.createContext()  
```

- 渲染子组时，外面包裹xxxContext.Provider, 通过value属性给后代组件传递数据：

```react
<MyContext.Provider value={数据}>
		子组件
</MyContext.Provider>
```

- 后代组件读取数据：

```react
//第一种方式:仅适用于类组件 
  static contextType = xxxContext  // 声明接收context
  this.context // 读取context中的value数据
  
//第二种方式: 函数组件与类组件都可以
  <xxxContext.Consumer>
    {
      value => ( // value就是context中的value数据
        要显示的内容
      )
    }
  </xxxContext.Consumer>
```

```react
import React, { Component } from 'react';

const MyContext = React.createContext();
export default class A extends Component {
  state = { username: 'jack', age: 20 };
  render() {
    const { username, age } = this.state;
    return (
      <div>
        <h1>我是A组件</h1>
        <h1>我的名字是{this.state.username}</h1>
        <MyContext.Provider value={{ username, age }}>
          <B />
        </MyContext.Provider>
      </div>
    );
  }
}

class B extends Component {
  render() {
    return (
      <div>
        <h3>我是B组件</h3>
        <h3>我从A组件接收名字是</h3>
        <C />
      </div>
    );
  }
}

// class C extends Component {
//   //第一种方式:仅适用于类组件
//   static contextType = MyContext; // 声明接收context
//   render() {
//     return (
//       <div>
//         <h5>我是C组件</h5>
//         <h5>我从A组件接收到的名字是{this.context.username} --- 年龄是{this.context.age}</h5>
//       </div>
//     );
//   }
// }

function C() {
  return (
    <div>
      <h5>我是C组件</h5>
      <MyContext.Consumer>
        {(value) => {
          //   console.log(value);
          return `从A组件接收到的名字是${value.username}`;
        }}
      </MyContext.Consumer>
    </div>
  );
}
```

**注意：在应用开发中一般不用context, 一般都它的封装react插件**

# 六、PureComponent

Component的2个问题 

> 1. 只要执行setState(),**即使不改变状态数据, 组件也会重新render()**
> 2. 当前组件重新render(), 就会自动重新render子组件 ==> 效率低

```react
import React, { Component } from 'react';

export default class A extends Component {
  state = { carname: 'BWM' };
  change = () => {
    this.setState({});
  };
  render() {
    console.log('A组件渲染');
    return (
      <div>
        <h2>车名：{this.state.carname}</h2>
        <button onClick={this.change}>点我换车</button>
        <B />
      </div>
    );
  }
}

class B extends Component {
  render() {
    console.log('B组件渲染');
    return <div></div>;
  }
}
```

![](http://cdn.michstabe.cn/blog/211204/HbJA39Jcm8.png?imageslim)

- 初始渲染两个组件时分别render一次
- 当点击按钮时，setState没有改变状态，B组件也没接收值，但还是分别进行了render
- 这就是两个问题

原因

>  Component中的shouldComponentUpdate()总是返回true

效率高的做法

>  只有当组件的state或props数据发生改变时才重新render()

**解决**

- 办法1: 
  - 重写shouldComponentUpdate()方法
  - 比较新旧state或props数据, 如果有变化才返回true, 如果没有返回false
- 办法2:  
  - 使用PureComponent
  - PureComponent重写了shouldComponentUpdate(), 只有state或props数据有变化才返回true

```react
import React, { PureComponent } from 'react';
export default class A extends PureComponent {}
```

- 注意: 
  - PureComponent只是进行state和props数据的浅比较, **如果只是数据对象内部数据变了, 返回false**  
  - 不要直接修改state数据, 而是要产生新数据
  - 项目中一般使用PureComponent来优化

# 七、render props


如何向组件内部动态传入带内容的结构(标签)?

- Vue中: 

- 使用slot技术, 也就是通过组件标签体传入结构  `<AA><BB/></AA>`

- React中:

  - 使用children props: 通过组件标签体传入结构
  - 使用render props: 通过组件标签属性传入结构，并且可以传递数据, 一般用render函数属性

children props：

```react
import React, { Component } from 'react';
export default class Parent extends Component {
  render() {
    return (
      <div>
        <h1>父组件Parent</h1>
        <A> hello </A>
      </div>
    );
  }
}
class A extends Component {
  state = { name: 'jack' };
  render() {
    return (
      <div>
        <h3>子组件A</h3>
        {/*children props方式来接受 */}
        <h4>{this.props.children}</h4>
      </div>
    );
  }
}
```

render props:

```react
import React, { Component } from 'react';

export default class Parent extends Component {
  render() {
    return (
      <div>
        <h1>父组件Parent</h1>
        {/* <A> hello </A> */}
            
        {/* 传递一个render属性，值是一个函数，函数返回的是一个组件B */}
        <A render={(name) => <B name={name} />}></A>
      </div>
    );
  }
}
class A extends Component {
  state = { name: 'jack' };
  render() {
    return (
      <div>
        <h3>子组件A</h3>
        {/* children props方式来接受 */}
        {/* <h4>{this.props.children}</h4> */}

        {/* 通过this.props.render()来接受，类似于this.props.children */}
        {/* 但是可以传递数据 如this.state.name */}
        <h4>{this.props.render(this.state.name)}</h4>
      </div>
    );
  }
}
class B extends Component {
  render() {
    return (
      <div>
        <h5>孙组件B</h5>
        {/* 接收的name在这里展示 */}
        <h4>{this.props.name}</h4>
      </div>
    );
  }
}
```

其实this.props.render()相当于一个插槽，想引入哪个插件，在render属性里修改就可以。

比如想展示C组件

```react
<A render={(name) => <C name={name} />}></A>
```

# 八、Error boundary - 错误边界

错误边界：用来捕获**后代组件错误**，渲染出备用页面

特点：

- 只能捕获后代组件生命周期产生的错误，
- 不能捕获自己组件产生的错误和其他组件在合成事件、定时器中产生的错误

```react
import React, { Component } from 'react';
import Child from './Child';
export default class Parent extends Component {
  state = { hasError: '' };
  //生命周期函数，一旦后代组件报错，就会触发
  static getDerivedStateFromError(error) {
    return {
        // 在render之前触发
    	// 返回新的state
      hasError: error,
    };
  }
  compomentDidCatch() {
    //一般用于统计页面发生的错误，发送请求给后台进行处理
  }
  render() {
    return (
      <div>
        this.state.hasError ? <h2>网络加载缓慢，请等待...</h2> : <Child />
      </div>
    );
  }
}
```

# 九、组件通信方式总结

props：

- children props
- render props

消息订阅-发布：

- pubs-sub、event等等

集中式管理：

- redux、dva等等

conText:

- 生产者-消费者模式

建议使用的方式：

- 父子组件：props
- 兄弟组件(非嵌套组件)：消息订阅-发布、集中式管理
- 祖孙组件(跨级组件)：消息订阅-发布、集中式管理、conText(用的少)

# 完结

2021.11.02-2021.12.04

历时将近一个月，学完react基础。

下一步实战  - webpack - js底层 - vue3

感谢尚硅谷天禹男神老师，react课程当数第一。

链接https://www.bilibili.com/video/BV1wy4y1D7JT?from=search&seid=16816498486462185277&spm_id_from=333.337.0.0

![](http://cdn.michstabe.cn/blog/211204/J6c86KI7E2.png?imageslim)

