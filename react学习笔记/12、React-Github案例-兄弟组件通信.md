# 一、兄弟组件传值-发布订阅

- 之前的Github搜索案例，Search组件和List组件没有直接进行数据的通信，而是借用了App组件来完成
- 这个案例学习兄弟组件通信-发布订阅模式

首先引入第三方库PubSubJS

- npm i pubsub-js

在Search.jsx和List.jsx导入

- import pubSub from 'pubsub-js'

App.jsx中初始化的数据最终是由List组件完成的，所以把state放到List.jsx中，同时更新组件状态的方法也不在需要，也不必再给组件传值

现在的APP.jsx是当做一个外壳：

```react
import React, { Component } from 'react';
import Search from './components/Search';
import List from './components/List';
export default class App extends Component {
  render() {
    return (
      <div>
        <Search />
        <List />
      </div>
    );
  }
}

```

在List.jsx中，组件挂载完后，订阅Search发布的消息：

```react
import React, { Component } from 'react';
import pubSub from 'pubsub-js'
import './index.css';

export default class List extends Component {
  state = {
    users: [],
    //首次页面显示
    isFirst: true,
    //请求时显示
    isLoading: false,
    //错误页面显示
    err: '',
  };

  // 组件挂载完成，订阅消息，注意写法
  componentDidMount() {
    pubSub.subscribe('Github',(_,stateObj) => {
      this.setState(stateObj)
    })
  }

  render() {
    const { users, isFirst, isLoading, err } = this.state;
    return (
      <div className="row">
        {isFirst ? 
          <h2>欢迎您</h2>
         : isLoading ? 
          <h2>搜索中</h2>
         : err ? 
          <h2>{err.message}</h2>
         : 
          users.map((userObj) => {
            return (
              <div className="card" key={userObj.id}>
                <a rel="noreferrer" href={userObj.html_url} target="_blank">
                  <img
                    alt="head"
                    src={userObj.avater_url}
                    style={{ width: '100px' }}
                  />
                </a>
                <p className="card-text">{userObj.login}</p>
              </div>
            );
          })
        }
      </div>
    );
  }
}

```

同时Search.jsx中要发布消息，并把状态对象传递给List组件来更新组件状态：

```react
import React, { Component } from 'react';
import axios from 'axios';
import pubSub from 'pubsub-js';

export default class Search extends Component {
  search = () => {
    const {
      keyWordElement: { value: keyWord },
    } = this;
    //发起请求前loading
    pubSub.publish('Github', { isFirst: false, isLoading: true });
    // this.props.updateStates({ isFirst:false, isLoading: true });
    axios.get(`/api1/search/users?q=${keyWord}`).then(
      (res) => {
        //请求数据成功显示数据
        pubSub.publish('Github', { isLoading: false, users: res.data.items });
        // this.props.updateStates({ isLoading: false, users: res.data.items });
      },
      (err) => {
        //失败后获取失败信息
        pubSub.publish('Github', { isLoading: false, err });
        // this.props.updateStates({isLoading:false,err});
      }
    );
  };
  render() {
    return (
      <section className="jumbotron">
        <h3 className="jumbotron-heading">Search Github Users</h3>
        <div>
          <input
            type="text"
            placeholder="请输入github用户名字"
            ref={(c) => (this.keyWordElement = c)}
          />
          &nbsp;<button onClick={this.search}>搜索</button>
        </div>
      </section>
    );
  }
}

```

这就实现了整个搜索案例

不再使用App代理的方式，改用发布订阅的方式来实现兄弟组建的传值

这种方式不仅仅适用于兄弟组件，任意两组件都可以

# 二、Fetch

不管是jQuery还是axios，底层都是基于xhr对象的封装。

axios采用promise的方式

Fetch也是采用promise方式处理异步，但不基于xhr对象

```js
fetch(`/api1/search/users2?q=${keyWord}`).then(
      (res) => {
        console.log('发送请求给服务器成功', res);
      },
      (err) => {
        console.log('发送请求给服务器失败', err);
      }
    );
```

这样无论如何都会返回一些信息，但是拿不到我们想要的数据

因为这一步只是证明我们联系服务器成功了。

路径都正确时返回的信息：



![](http://r1zn5ovlm.hd-bkt.clouddn.com/blog/211116/DDhf1KL35B.png?imageslim)

路由错误时返回信息：

![](http://r1zn5ovlm.hd-bkt.clouddn.com/blog/211116/4hdE2iEc76.png?imageslim)

可以看到都返回信息，但是状态码等信息发生了变化

如何拿到想要的数据呢？

```js
(res) => {
        console.log('发送请求给服务器成功', res.json());
      },
```

![](http://r1zn5ovlm.hd-bkt.clouddn.com/blog/211116/8CeD9CemiK.png?imageslim)

数据就有了，但是注意.json()返回的是一个promise对象，所以我们还得.then一下

```js
fetch(`/api1/search/users2?q=${keyWord}`).then(
      (res) => {
        console.log('发送请求给服务器成功'，res);
        return res.json()
      },
      (err) => {
        console.log('发送请求给服务器失败', err);
      }
    ).then(res => {
      console.log(res);
    })
  };
```

这样就能拿到数据了：

![](http://r1zn5ovlm.hd-bkt.clouddn.com/blog/211116/cd8Hj1b5II.png?imageslim)

但是此时如果我们把网络断开发送请求，发现返回的数据时undefined

失败了就没必要再去打印res了，所以可以在err中返回一个初始的Promise终止

```js
(err) => {
        return new Promise(() => {})
        
      }
```

这样就不会继续.then()了

## 优化fetch：

上面的写法过于复杂

可以使用asynx/await改造

```js
 try {
      const res = await fetch(`/api1/search/users?q=${keyWord}`);
      console.log(res);
      const data = await res.json();
      console.log(data);
      pubSub.publish('Github', { isLoading: false, users: data.items });
    } catch (err) {
      pubSub.publish('Github', { isLoading: false, err });
    }
//记得上面的函数加 async
//search = async () => {
```

# 三、Github案例总结

设计状态时要考虑全面，例如带有网络请求的组件，要考虑请求失败怎么办。

ES6小知识点：解构赋值+重命名

```js
let obj = {a:{b:1}}
const {a} = obj; //传统解构赋值
const {a:{b}} = obj; //连续解构赋值
const {a:{b:value}} = obj; //连续解构赋值+重命名
```

消息订阅与发布机制

- 先订阅，再发布（理解：有一种隔空对话的感觉）
- 适用于任意组件间通信
- 要在组件的componentWillUnmount中取消订阅

fetch发送请求（关注分离的设计思想）

```js
try {
	const response= await fetch(/api1/search/users2?q=${keyWord})
	const data = await response.json()
	console.log(data);
	} catch (error) {
		console.log('请求出错',error);
		}
```


