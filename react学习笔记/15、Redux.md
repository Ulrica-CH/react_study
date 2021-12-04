# 一、什么时redux

中文文档: http://www.redux.org.cn/

npm i redux

之前学过vuex，这两个差不多，都是状态管理用的

- redux是一个专门用于做状态管理的JS库(**不是react插件库**)。

- 可以用在react, angular, vue等项目中, 但基本与react配合使用。

- 作用: 集中式管理react应用中多个组件共享的状态。

1.3. 什么情况下需要使用redux

- 某个组件的状态，需要让其他组件可以随时拿到（共享）
- 一个组件需要改变另一个组件的状态（通信）
- 总体原则：能不用就不用, 如果不用比较吃力才考虑使用

## 工作流程

![shu'ju](C:\Users\21087\AppData\Roaming\Typora\typora-user-images\image-20211127161749196.png)

## 核心概念

action

- 动作的对象
- 包含 2 个属性
- type：标识属性, 值为字符串, 唯一, 必要属性
- data：数据属性, 值类型任意, 可选属性
- 例子：{ type: 'ADD_STUDENT',data:{name: 'tom',age:18} }

reducer

- 用于初始化状态、加工状态。
- 加工时，根据旧的state和action， **产生新的state的纯函数**。

store

- 将state、action、reducer联系在一起的对象
- 如何得到此对象?


```react
import {createStore} from 'redux'

import reducer from './reducers'

const store = createStore(reducer)
```

此对象的功能?

```js
store.getState(): //得到state

store.dispatch(action): //分发action, 触发reducer调用, 产生新的state

store.subscribe(listener): //注册监听, 当产生了新的state时, 自动调用
```

## 求和案例

### 纯react版

App.jsx:

```react
import React, { Component } from 'react';
import Count from './components/Count';
export default class App extends Component {
  render() {
    return (
      <div>
        <Count />
      </div>
    );
  }
}
```

Count.jsx:

```react
import React, { Component } from 'react';

export default class Count extends Component {
  state = { count: 0 };
  //相加
  increment = () => {
    const { value } = this.selectedValue;
    const { count } = this.state;
    this.setState({ count: count + value * 1 });
  };
  //相减
  decrement = () => {
    const { value } = this.selectedValue;
    const { count } = this.state;
    this.setState({ count: count + value * 1 });
  };
  //和为基数时相加
  incrementIfOdd = () => {
    const { value } = this.selectedValue;
    const { count } = this.state;
    if (count % 2 !== 0) {
      this.setState({ count: count + value * 1 });
    }
  };
  //异步相加
  incrementAsync = () => {
    const { value } = this.selectedValue;
    const { count } = this.state;
    setTimeout(() => {
      this.setState({ count: count + value * 1 });
    }, 2000);
  };
  render() {
    return (
      <div>
        <h1>求和为：{this.state.count}</h1>
        <select ref={(c) => (this.selectedValue = c)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        &nbsp;
        <button onClick={this.increment}>+</button>&nbsp;
        <button onClick={this.decrement}>-</button>&nbsp;
        <button onClick={this.incrementIfOdd}>和为基数再相加</button>&nbsp;
        <button onClick={this.incrementAsync}>异步相加</button>
      </div>
    );
  }
}

```

## react精简版：不包含Action Creators

新建redux目录下新建store.js count_reducer.js

store.js

```react
/*
    该文件专门用于暴露一个store对象，整个应用只有一个store对象
 */

//引入createStore，专门用于创建redux中最为核心的store对象
import { createStore } from 'redux';
//引入为Count组件服务的reducer
import countReducer from './count_reducer';
//暴露store
export default createStore(countReducer);

```

count_reducer.js

```react
/*
    该文件适用于创建一个为Count组件服务的reducer reducer本质上是一个函数
*/
const initState = 0; // 初始化状态
export default function countReducer(pre = initState, action) {
  // console.log(pre, action);
  const { type, data } = action;
  switch (type) {
    case 'increment':
      return pre + data;
    case 'decrement':
      return pre - data;
    default:
      return pre;
  }
}

```

Count.jsx

```react
import React, { Component } from 'react';
import store from '../../redux/store';
export default class Count extends Component {
  state = {};
  //redux只是更改并保存状态，默认不会刷新，所以需要监听，状态更改后，调用render刷新
  //this.setState()默认会调用render
  componentDidMount() {
      store.subscribe(() => {
          this.setState({})
      })
  }
  //相加
  increment = () => {
    const { value } = this.selectedValue;
    store.dispatch({ type: 'increment', data: value * 1 });
  };
  //相减
  decrement = () => {
    const { value } = this.selectedValue;
    store.dispatch({ type: 'decrement', data: value * 1 });
  };
  //和为基数再相加
  incrementIfOdd = () => {
    const { value } = this.selectedValue;
    const  count  = store.getState()
    if (count % 2 !== 0) {
        store.dispatch({ type: 'increment', data: value * 1 });
    }
  };
  //异步相加
  incrementAsync = () => {
    const { value } = this.selectedValue;
    setTimeout(() => {
        store.dispatch({ type: 'increment', data: value * 1 });
    }, 2000);
  };
  render() {
    return (
      <div>
        <h1>求和为：{store.getState()}</h1>
        <select ref={(c) => (this.selectedValue = c)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        &nbsp;
        <button onClick={this.increment}>+</button>&nbsp;
        <button onClick={this.decrement}>-</button>&nbsp;
        <button onClick={this.incrementIfOdd}>和为基数再相加</button>&nbsp;
        <button onClick={this.incrementAsync}>异步相加</button>
      </div>
    );
  }
}
```

redux只是更改并保存状态，默认不会刷新，所以需要监听，状态更改后，调用render刷新
this.setState()默认会调用render

但是这样如果有多个组件，需要在每个组件中都i要写一遍，

直接放到index.js中更好

```react
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './redux/store';
ReactDOM.render(<App />, document.getElementById('root'));
store.subscribe(() => {
  ReactDOM.render(<App />, document.getElementById('root'));
});
```

这样就算有多个组件

其中一个变化

因为diff算法，其余组件也不会重新渲染。

### 总结精简版

(1).去除Count组件自身的状态

(2).src下建立:

- -redux
  - -store.js
  - -count_reducer.js

(3).store.js：

- 引入redux中的createStore函数，创建一个store
- createStore调用时要传入一个为其服务的reducer
- 记得暴露store对象

(4).count_reducer.js：

- reducer的本质是一个函数，接收：preState,action，返回加工后的状态
- reducer有两个作用：初始化状态，加工状态
- reducer被第一次调用时，是store自动触发的，
  - 传递的preState是undefined,
  - 传递的action是:{type:'@@REDUX/INIT_a.2.b.4}

(5).在index.js中监测store中状态的改变，一旦发生改变重新渲染`<App/>`

- 备注：redux只负责管理状态，至于状态的改变驱动着页面的展示，要靠我们自己写。

## redux完整版

redux目录下新建

- count_action.js : 专门用于创建action对象
- constant.js : constant.js 放置容易写错的type的类型值

count_action.js:

```react
import { INCREMENT, DECREMENT } from './constant';
export const increment = (data) => ({ type: INCREMENT, data });
export const decrement = (data) => ({ type: DECREMENT, data });
```

constant.js:

```react
//定义action中type的常量值，为了防止单词拼写错误且便于管理
export const INCREMENT = 'increment';
export const DECREMENT = 'decrement';
```

Count.jsx:

```react
increment = () => {
    const { value } = this.selectedValue;
    store.dispatch(increment(value * 1));
  };
  //相减
  decrement = () => {
    const { value } = this.selectedValue;
    store.dispatch(decrement(value * 1));
  };
  //和为基数再相加
  incrementIfOdd = () => {
    const { value } = this.selectedValue;
    const count = store.getState();
    if (count % 2 !== 0) {
      store.dispatch(increment(value * 1));
    }
  };
  //异步相加
  incrementAsync = () => {
    const { value } = this.selectedValue;
    setTimeout(() => {
      store.dispatch(increment(value * 1));
    }, 2000);
  };
```

## 异步action版

目的：延迟的动作不想交给组件自身，想交给action

需求场景：想要对状态进行操作，但是具体的数据靠异步任务返回（非必须）

Count.jsx

```react
//此时的异步相加是放在组件中的
  //想要交给action怎么办呢？
  // incrementAsync = () => {
  //   const { value } = this.selectedValue;
  //   setTimeout(() => {
  //     store.dispatch(increment(value * 1));
  //   }, 2000);
  // };

  incrementAsync = () => {
    const { value } = this.selectedValue;
    //异步加法操作，传递一个延迟时间
    store.dispatch(incrementAsyncAction(value * 1, 1000));
  };
```

具体操作：

1、yarn add redux-thunk 配置在store中

```react
/*
    该文件专门用于暴露一个store对象，整个应用只有一个store对象
 */

//引入createStore，专门用于创建redux中最为核心的store对象
import { createStore,applyMiddleware } from 'redux';
//引入为Count组件服务的reducer
import countReducer from './count_reducer';
//引入thunk
import thunk from 'redux-thunk'
//暴露store
export default createStore(countReducer,applyMiddleware(thunk));

```

- dispatch一个action之后，到达reducer之前，进行一些额外的操作，就需要用到middleware。
- 你可以利用 Redux middleware 来进行日志记录、创建崩溃报告、调用异步接口或者路由等等。
- 换言之，中间件都是对store.dispatch()的增强
- 直接将thunk中间件引入，放在applyMiddleware方法之中，传入createStore方法，就完成了store.dispatch()的功能增强。即可以在reducer中进行一些异步的操作。

applyMiddleware()

- 其实applyMiddleware就是Redux的一个原生方法，**将所有中间件组成一个数组**，依次执行。
  中间件多了可以当做参数依次传进去

2、创建action的函数不再返回一般对象，而是一个函数，该函数中写异步任务。

3、异步任务有结果后，分发一个同步任务去操作真正的数据

redux -> count_action.js

```react
import { INCREMENT, DECREMENT } from './constant';
//action返回的是一个Object 为同步action
export const increment = (data) => ({ type: INCREMENT, data });
export const decrement = (data) => ({ type: DECREMENT, data });
//action返回的是一个Function 为异步action
export const incrementAsyncAction = (data, time) => {
  return (dispatch) => {
    setTimeout(() => {
        //默认返回一个dispatch 不需要再store.dispatch
      //异步任务有了结果以后，分发一个同步action 去真正操作数据
      dispatch(increment(data));
    }, time);
  };
};
```

注意：异步action不是必须的，完全可以自己在组件中等待异步结果再去执行同步action

## react-redux

一个React插件库

专门用来简化React应用中使用redux

![](http://cdn.michstabe.cn/blog/211128/0CBI9LA304.png?imageslim)

react-redux将所有组件分成两大类

- UI组件
  - 只负责 UI 的呈现，不带有任何业务逻辑
  - 通过props接收数据(一般数据和函数)
  - **不使用任何 Redux 的 API**
  - **一般保存在components文件夹下**
- 容器组件
  - 负责管理数据和业务逻辑，不负责UI的呈现
  - 使用 Redux 的 API
  - 一般保存在containers文件夹下

### 连接容器组件和UI组件

UI组件中的业务逻辑等都删除掉

components -> Count

```react
import React, { Component } from 'react';
export default class Count extends Component {
  //相加
  increment = () => {
    const { value } = this.selectedValue;
  };
  //相减
  decrement = () => {
    const { value } = this.selectedValue;
  };
  //和为基数再相加
  incrementIfOdd = () => {
    const { value } = this.selectedValue;
  };
  incrementAsync = () => {
    const { value } = this.selectedValue;
    //还是加法操作，传递一个延迟时间
  };
  render() {
    return (
      <div>
        <h1>求和为：？？？</h1>
        <select ref={(c) => (this.selectedValue = c)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        &nbsp;
        <button onClick={this.increment}>+</button>&nbsp;
        <button onClick={this.decrement}>-</button>&nbsp;
        <button onClick={this.incrementIfOdd}>和为基数再相加</button>&nbsp;
        <button onClick={this.incrementAsync}>异步相加</button>
      </div>
    );
  }
}
```

新建containers目录下Count容器组件‘

```react
//引入UI组件
import CountUI from '../../components/Count';
//引入store
import store from '../../redux/store';
//引入react-redux中的connect用于连接
import { connect } from 'react-redux';
//使用connect()()创建并暴露一个Count的容器组件
export default connect()(CountUI);
```

App.jsx中引入容器组件而不是UI组件：

```react
import Count from './containers/Count';
```

yarn start：

![](http://cdn.michstabe.cn/blog/211128/7agbe4Bg2e.png?imageslim)

报错....

因为不允许我们手动引入store

```react
//引入store
import store from '../../redux/store';
```

而是要传递给Count容器组件

```react
export default class App extends Component {
  render() {
    return (
      <div>
        <Count store={store} />
      </div>
    );
  }
}
```

yarn start:

![](http://cdn.michstabe.cn/blog/211128/92FLA86747.png?imageslim)

页面正常显示，为什么这么做？继续往下看。

### react-redux的基本使用

明确两个概念：

- UI组件:不能使用任何 redux 的api，只负责页面的呈现、交互等。
- 容器组件：负责和 redux 通信，将结果交给UI组件。

如何创建一个容器组件————靠 react-redux 的 connect 函数

connect(mapStateToProps,mapDispatchToProps)(UI组件)

- mapStateToProps: 映射状态，返回值是一个对象
- mapDispatchToProps: 映射操作状态的方法，返回值是一个对
- 备注1：容器组件中的store是靠props传进去的，而不是在容器组件中直接引入

容器组件：containers -> Count

```react
//引入UI组件
import CountUI from '../../components/Count';
//引入react-redux中的connect用于连接
import { connect } from 'react-redux';
//引入action
import {
  increment,
  decrement,
  incrementAsyncAction,
} from '../../redux/count_action';
//使用connect()()创建并暴露一个Count的容器组件

/*
    1、mapStateProps函数返回的是一个对象
    2、返回的对象中的key就作为传递给UI组件props的key，value就作为传递给UI组件props的value
    3、mapStateToProps用于传递状态
 */
const mapStateProps = (state) => {
  return { count: state };
};
/*
    1、mapDispatchToProps函数返回的是一个对象
    2、返回的对象中的key就作为传递给UI组件props的key，value就作为传递给UI组件props的value
    3、mapDispatchToProps用于传递操作状态的方法
 */

//state dispatch 都是react-redux调用两个函数默认传递的值，这样就不用我们引入store来进行相关操作
const mapDispatchToProps = (dispatch) => {
  return {
    incrementAction: (data) => {
      dispatch(increment(data));
    },
    decrementAction: (data) => {
      dispatch(decrement(data));
    },
    incrementAsyncAction: (data, time) => {
      dispatch(incrementAsyncAction(data, time));
    },
  };
};

/*
    1、connect是个核心
    2、connect()()
        第一个括号里传递状态和操作状态的方法
        第二个括号是对应的UI组件
*/
export default connect(mapStateProps, mapDispatchToProps)(CountUI);

```

UI组件：components -> Count

```react
import React, { Component } from 'react';
export default class Count extends Component {
  //相加
  increment = () => {
    const { value } = this.selectedValue;
      //为什么能拿到incrementAction?
      //因为容器组件通过connect进行了传递
    this.props.incrementAction(value * 1);
  };
  //相减
  decrement = () => {
    const { value } = this.selectedValue;
    this.props.decrementAction(value * 1);
  };
  //和为基数再相加
  incrementIfOdd = () => {
    const { value } = this.selectedValue;
    if (this.props.count % 2 !== 0) {
      this.props.incrementAction(value * 1);
    }
  };
  incrementAsync = () => {
    const { value } = this.selectedValue;
    this.props.incrementAsyncAction(value * 1, 1000);
  };
  render() {
    return (
      <div>
        <h1>求和为：{this.props.count}</h1>
        <select ref={(c) => (this.selectedValue = c)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        &nbsp;
        <button onClick={this.increment}>+</button>&nbsp;
        <button onClick={this.decrement}>-</button>&nbsp;
        <button onClick={this.incrementIfOdd}>和为基数再相加</button>&nbsp;
        <button onClick={this.incrementAsync}>异步相加</button>
      </div>
    );
  }
}
```

这里一定要仔细理解。

### 优化一、mapDispaychToProps简写

```react
  //mapDispatchToProps的简写方式
  //react-redux拿到action会自动进行dispatch
  {
    incrementAction: increment,
    decrementAction: decrement,
    incrementAsyncAction: incrementAsyncAction,
  }
```

### 优化二、去除store.subscribe

react-redux默认会监听状态并刷新页面

```react
ReactDOM.render(<App />,document.getElementById('root'));


// store.subscribe(() => {
//   ReactDOM.render(<App />, document.getElementById('root'));
// });
```

### 优化三、store传递

目前store传递是写在App组件中

```react
<div>
  <Count store={store}  />
</div>
```

但是要是有100个容器组件，每个都这样写就过于冗杂

所以需要使用Provider

index.js

```react
import store from './redux/store';
import { Provider } from 'react-redux';
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

这样App的子组件都可以接收到store。

### 优化四、整合UI组件和容器组件

把UI组件放到容器组件中。不能每次都要分成两个组件来使用react-redux

src -> container -> Count -> index.jsx

```react
import React, { Component } from 'react';
//引入react-redux中的connect用于连接
import { connect } from 'react-redux';
//引入action
import {
  increment,
  decrement,
  incrementAsyncAction,
} from '../../redux/count_action';
//使用connect()()创建并暴露一个Count的容器组件
class Count extends Component {
  //相加
  increment = () => {
    const { value } = this.selectedValue;
    this.props.incrementAction(value * 1);
  };
  //相减
  decrement = () => {
    const { value } = this.selectedValue;
    this.props.decrementAction(value * 1);
  };
  //和为基数再相加
  incrementIfOdd = () => {
    const { value } = this.selectedValue;
    if (this.props.count % 2 !== 0) {
      this.props.incrementAction(value * 1);
    }
  };
  incrementAsync = () => {
    const { value } = this.selectedValue;
    this.props.incrementAsyncAction(value * 1, 1000);
  };
  render() {
    return (
      <div>
        <h1>求和为：{this.props.count}</h1>
        <select ref={(c) => (this.selectedValue = c)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        &nbsp;
        <button onClick={this.increment}>+</button>&nbsp;
        <button onClick={this.decrement}>-</button>&nbsp;
        <button onClick={this.incrementIfOdd}>和为基数再相加</button>&nbsp;
        <button onClick={this.incrementAsync}>异步相加</button>
      </div>
    );
  }
}

export default connect(
  (state) => ({ count: state }),
  //mapDispatchToProps的一般写法
  /*
  dispatch => ({
     incrementAction:data => dispatch(increment(data)),
     decrementAction:data => dispatch(decrement(data)),
     incrementAsyncAction:(data,time) => dispatch(incrementAsyncAction(data,time))
  })
 */
  //mapDispatchToProps的简写方式
  //react-redux拿到action会自动进行dispatch
  {
    incrementAction: increment,
    decrementAction: decrement,
    incrementAsyncAction: incrementAsyncAction,
  }
)(Count);
```

### 总结

- 容器组件和UI组件整合一个文件
- 无需自己给容器组件传递store，给`<App/>`包裹一个`<Provider store={store}>`即可。
- 使用了react-redux后也不用再自己检测redux中状态的改变了，容器组件可以自动完成这个工作。
- mapDispatchToProps也可以简单的写成一个对象

- 一个组件要和redux“打交道”要经过哪几步？
  - 定义好UI组件---不暴露
- 引入connect生成一个容器组件，并暴露，写法如下：
  - 在UI组件中通过this.props.xxxxxxx读取和操作状态

```react
connect(
state => ({key:value}), //映射状态
{key:xxxxxAction} //映射操作状态的方法
)(UI组件)
```

## 数据共享

之前的都是单组件使用redux没有进行组件数据共享。

containers下新建Person组件实现与Count组件共享。

为了便于管理

redux目录下新建action目录reducers目录

分别管理各个组件的reducer和action

目录如下：

![](http://cdn.michstabe.cn/blog/211130/agj2kF0DC4.png?imageslim)

containers -> Person -> index.jsx:

```react
import React, { Component } from 'react';
import {nanoid} from 'nanoid'
export default class Person extends Component {
  add = () => {
    const name = this.nameNode.value;
    const age = this.ageNode.value;
    const personObj = [{id:nanoid(),name,age}]
    console.log(personObj);
  };
  render() {
    return (
      <div>
        <h2>Person组件</h2>
        <input
          ref={(c) => (this.nameNode = c)}
          type="text"
          placeholder="输入名字"
        />
        <input
          ref={(c) => (this.ageNode = c)}
          type="text"
          placeholder="输入年龄"
        />
        <button onClick={this.add}>提交</button>
        <ul>
          <li>名字1 --- 年龄1</li>
          <li>名字1 --- 年龄1</li>
          <li>名字1 --- 年龄1</li>
        </ul>
      </div>
    );
  }
}

```

action -> peson.js:

```react
//引入常量
import { ADD_PERSON } from '../constant';

//定义action
export const addPerson = (personObj) => ({ type: ADD_PERSON, data: personObj });

```

reducers -> person.js:

```react
//初始化状态 更新redux状态

//引入常量
import { ADD_PERSON } from '../constant';

const stateInit = [{ id: 1, name: 'tom', age: 20 }];
export default function personReducer(personState = stateInit, action) {
  const { type, data } = action;
  switch (type) {
    case ADD_PERSON:
      return [data, ...personState];
    default:
      return personState;
  }
}
```

constant.js:

```react
//定义action中type的常量值，为了防止单词拼写错误且便于管理
export const INCREMENT = 'increment';
export const DECREMENT = 'decrement';
export const ADD_PERSON = 'addPerson';
```

这样基本的布局逻辑就完成了。

这时的person的reducer是没有工作的

打印看下

```react
export default function countReducer(pre = initState, action) {
  console.log('count');
  // console.log(pre, action);
  const { type, data } = action;
  switch (type) {
    case INCREMENT:
      return pre + data;
    case DECREMENT:
      return pre - data;
    default:
      return pre;
  }
}
```

```react
//初始化状态 更新redux状态

//引入常量
import { ADD_PERSON } from '../constant';

const stateInit = [{ id: 1, name: 'tom', age: 20 }];
export default function personReducer(personState = stateInit, action) {
  console.log('person');
  const { type, data } = action;
  switch (type) {
    case ADD_PERSON:
      return [data, ...personState];
    default:
      return personState;
  }
}

```

网页控制台只会打印1

为什么？ 看store.js:

```react
/*
    该文件专门用于暴露一个store对象，整个应用只有一个store对象
 */

//引入createStore，专门用于创建redux中最为核心的store对象
import { createStore, applyMiddleware } from 'redux';
//引入为Count组件服务的reducer
import countReducer from './reducers/count';
//引入thunk
import thunk from 'redux-thunk';
//暴露store
export default createStore(countReducer, applyMiddleware(thunk));

```

因为只导入并使用了count的reducer,person的压根没用自然不会执行。

所以需要都引入。

注意：

- redux里面应该放个状态对象，对象里放着各个组件reducer的初始状态值
- 为什么不用数组？数组取值不好取
- 需要引入combineReducers来组合reducer成为一个。

代码改造：

```react
/*
    该文件专门用于暴露一个store对象，整个应用只有一个store对象
 */

//引入createStore，专门用于创建redux中最为核心的store对象
import { createStore, applyMiddleware, combineReducers } from 'redux';
//引入为Count组件服务的reducer
import countReducer from './reducers/count';
//引入为Person组件服务的reducer
import personReducer from './reducers/person';
//引入thunk
import thunk from 'redux-thunk';
//组合reducers为一个对象
const allReducers = combineReducers({
  count: countReducer,
  pers: personReducer,
});
//暴露store
export default createStore(allReducers, applyMiddleware(thunk));

```

这样redux中保存的就是一个对象了，想去对应的状态值拿key就好了。

比如在count.jsx:

```react
export default connect(
  (state) => ({ count: state.count }),
  {
    incrementAction: increment,
    decrementAction: decrement,
    incrementAsyncAction: incrementAsyncAction,
  }
)(Count);
```

state是对象不再是之前的0，所以要通过state,count来拿到countReducer的初始状态值。

person.jsx也一样。

最后来实现下数据共享。

还是通过核心connect

containers -> Person -> index.jsx:

```react
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPerson } from '../../redux/action/person';

class Person extends Component {
  addPerson = () => {
    const name = this.nameNode.value;
    const age = this.ageNode.value;
    const personObj = { id: new Date(), name, age };
    this.props.addPerson(personObj);
    this.nameNode.value = '';
    this.ageNode.value = '';
  };

  render() {
    return (
      <div>
        <h2>我是Person组件,上方组件求和为{this.props.count}</h2>
        <input
          ref={(c) => (this.nameNode = c)}
          type="text"
          placeholder="输入名字"
        />
        <input
          ref={(c) => (this.ageNode = c)}
          type="text"
          placeholder="输入年龄"
        />
        <button onClick={this.addPerson}>添加</button>
        <ul>
          {this.props.pers.map((p) => {
            return (
              <li key={p.id}>
                {p.name}--{p.age}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default connect(
  (state) => ({ pers: state.pers, count: state.count }), //映射状态
  { addPerson: addPerson } //映射操作状态的方法
)(Person);

```

containers -> Count -> index.jsx:

```react
import React, { Component } from 'react';
//引入react-redux中的connect用于连接
import { connect } from 'react-redux';
//引入action
import {
  increment,
  decrement,
  incrementAsyncAction,
} from '../../redux/action/count';
//使用connect()()创建并暴露一个Count的容器组件
class Count extends Component {
  //相加
  increment = () => {
    const { value } = this.selectedValue;
    this.props.incrementAction(value * 1);
  };
  //相减
  decrement = () => {
    const { value } = this.selectedValue;
    this.props.decrementAction(value * 1);
  };
  //和为基数再相加
  incrementIfOdd = () => {
    const { value } = this.selectedValue;
    if (this.props.count % 2 !== 0) {
      this.props.incrementAction(value * 1);
    }
  };
  incrementAsync = () => {
    const { value } = this.selectedValue;
    this.props.incrementAsyncAction(value * 1, 1000);
  };
  render() {
    return (
      <div>
        <h1>求和为：{this.props.count}</h1>
        <h1>person组件中的人员总数为{this.props.pers}</h1>
        <select ref={(c) => (this.selectedValue = c)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        &nbsp;
        <button onClick={this.increment}>+</button>&nbsp;
        <button onClick={this.decrement}>-</button>&nbsp;
        <button onClick={this.incrementIfOdd}>和为基数再相加</button>&nbsp;
        <button onClick={this.incrementAsync}>异步相加</button>
      </div>
    );
  }
}

export default connect(
  (state) => ({ count: state.count, pers: state.pers.length }),
  //mapDispatchToProps的一般写法
  /*
  dispatch => ({
     incrementAction:data => dispatch(increment(data)),
     decrementAction:data => dispatch(decrement(data)),
     incrementAsyncAction:(data,time) => dispatch(incrementAsyncAction(data,time))
  })
 */
  //mapDispatchToProps的简写方式
  //react-redux拿到action会自动进行dispatch
  {
    incrementAction: increment,
    decrementAction: decrement,
    incrementAsyncAction: incrementAsyncAction,
  }
)(Count);

```

頁面效果：

![](http://cdn.michstabe.cn/blog/211130/LkH5JF5Icd.png?imageslim)

基本实现数据共享。

## 纯函数

一类特别的函数：

- 只要是同样的输入，必定得到同样的输出

必须遵守以下一些约束：

- 不能改写参数数据
- 不能产生任何副作用，例如网络请求，输入与输出设备
- 不能调用Date.now()或者Math.random()等不纯的方法

redux的reducer函数必须是一个纯函数

## react-dedux开发者工具

npm i  redux-devtools-extension

store.js中进行配置

```react
import {composeWithDevTools} from 'redux-devtools-extension'
const store = createStore(allReducer,composeWithDevTools(applyMiddleware(thunk)))
```

![mark](http://cdn.michstabe.cn/blog/211201/7CgGdd60Ae.png?imageslim)

## 最终优化

所有变量名字要规范，尽量触发对象的简写形式。

 reducers文件夹中，编写index.js专门用于汇总并暴露所有的reducer

index.js:

```react
//引入为Count组件服务的reducer
import Count from './count';
//引入为Person组件服务的reducer
import Person from './person';
//引入combineReducers，用于组合reducers
import { combineReducers } from 'redux';
//组合reducers为一个对象
export default combineReducers({
  Count,
  Person,
});
```

store.js:

```react
/*
    该文件专门用于暴露一个store对象，整个应用只有一个store对象
 */

//引入createStore，专门用于创建redux中最为核心的store对象
import { createStore, applyMiddleware } from 'redux';
//引入整合的reducer
import allReducers from './reducers/index'
//引入redux-devtools
import { composeWithDevTools } from 'redux-devtools-extension';
//引入thunk
import thunk from 'redux-thunk';
//暴露store
export default createStore(
  allReducers,
  composeWithDevTools(applyMiddleware(thunk))
);
```

## 项目打包运行

npm run build进行项目打包。

npm  i serve -g

serve build来放到服务器上运行。

![](http://cdn.michstabe.cn/blog/211201/igk8IbcCCB.png?imageslim)















