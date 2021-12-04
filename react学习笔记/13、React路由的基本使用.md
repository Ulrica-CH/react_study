# 一、SPA单页面

1. 单页Web应用（single page web application，`SPA`）
2. 整个应用只有一个完整的页面。
3. 点击页面中的链接不会刷新页面，只会做页面的局部更新。
4. 数据都需要通过ajax请求获取, 并在前端异步展现。

# 二、路由

- 一个路由就是一个映射关系(key: value)
- key为路径, value可能是function或component

- 后端路由
  - 理解： value是function, 用来处理客户端提交的请求。
  - 注册路由： router.get(path, function(req, res))
  - 工作过程：当node接收到一个请求时, 根据请求路径找到匹配的路由, 调用路由中的函数来处理请求, 返回响应数据
- 前端路由
  - 浏览器端路由，value是component，用于展示页面内容。
  - 注册路由: `<Route path="/test" component={Test}>`
  - 工作过程：当浏览器的path变为/test时, 当前路由组件就会变为Test组件

**前端路由其实是基于BOM的history来实现的**

# 三、react-router

- `React`的一个插件库。
- 专门用来实现一个SPA应用。
- 基于`React`的项目基本都会用到此库。
- 分为三类，其中react-router-dom适用于web开发

## react-router-dom相关API

### 内置组件

1. `<BrowserRouter>`
2. `<HashRouter>`
3. `<Route>`
4. `<Redirect>`
5. `<Link>`
6. `<NavLink>`
7. `<Switch>`

### 其它

1. `history`对象
2. `match`对象
3. `withRouter`函数

## 路由基本使用

下载插件库

npm i react-router-dom

明确好界面中的导航区、展示区
导航区的a标签改为Link标签

```react
<Link to="/xxxxx">Demo</Link>
```

展示区写Route标签进行路径的匹配

```react
<Route path='/xxxx' component={Demo}/>
```

App组件的最外侧包裹了一个`<BrowserRouter>或<HashRouter>`

新建Home About组件，写下页面结构引入bootstrap.css，导入路由

```react
import React, { Component } from 'react';
import { Link} from 'react-router-dom';
export default class App extends Component {
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
              {/* <a className="list-group-item" href="./about.html"> */}
              <Link className="list-group-item" to="/about">
                About
              </Link>
              About
              {/* <a className="list-group-item active" href="./home.html"> */}
              <Link className="list-group-item" to="/home">
                Home
              </Link>
            </div>
          </div>
          <div className="col-xs-6">
            <div className="panel">
              <div className="panel-body">
                <h3>我是Home的内容</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

```

此时会报错：

![](http://cdn.michstabe.cn/blog/211117/0F8AfF7FiA.png?imageslim)

意思要有一个`<Router></Router>`来包裹,但实际上有有两个Router，我们使用BrowserRouter

```react
import { Link,BrowserRouter} from 'react-router-dom';
<BrowserRouter>
	<Link className="list-group-item" to="/about">About</Link>
	<Link className="list-group-item" to="/home">Home</Link>
</BrowserRouter>
```

这样就能正常显示了：

![](http://cdn.michstabe.cn/blog/211117/Kb77k3gkbg.png?imageslim)

此时点击About Home对应地址栏会变化，**但是页面不刷新**

而且我是Home这里的内容也不会切换，因为我们还没有写完。

```react
import { Link, BrowserRouter, Route } from 'react-router-dom';
<Route path="/about" component={About}></Route>
<Route path="/home" component={Home}></Route>
```

此时会报错：

![](http://cdn.michstabe.cn/blog/211117/b8HGhLKg9F.png?imageslim)

还是要使用Router包裹

```react
<BrowserRouter>
	<Route path="/about" component={About} />
	<Route path="/home" component={Home} />
</BrowserRouter>
```

可以了吗？

![](http://cdn.michstabe.cn/blog/211117/4LFabAKB8A.png?imageslim)

为啥？

因为整个应用要用一个路由器管理，上面的BrowserRouter和下面的完全不能通信，上面的获取了路径信息传递不到下面的BrowserRouter里，自然就不行了。

cnm不对，视频里的react-router-dom版本是5.+，我的是v6的，路由这里的写法变了

```react
import { Link, BrowserRouter, Route, Routes } from 'react-router-dom';
<Routes>
	<Route path="/about" element={<About/>}/>
	<Route path="/home" element={<Home/>} />
</Routes>
```

我说咋一直报错呢。。。

然后就是BrowserRouter的问题，我们可以把BrowserRouter包裹的范围扩大，让应用只有一个路由管理器，但是这不是最完美的方法，我们应该把整个APP组件包裹起来，这样以后修改就不用调整BrowserRouter的包裹范围

index.js

```react
//引入react核心库
import React from 'react';
//引入ReactDOM
import ReactDOM from 'react-dom';
//引入App
import App from './App';
//引入路由包裹
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

```

这样就完美了。

## 总结下路由使用

首先引入需要的

```react
import { Link, Route, Routes } from 'react-router-dom';
```

编写路由链接：

```react
<Link className="list-group-item" to="/about">About</Link>
<Link className="list-group-item" to="/home">Home</Link>
```

注册路由：

```react
<Routes>
	<Route path="/about" element={<About/>}/>
	<Route path="/home" element={<Home/>} />
</Routes>
```

记得要进行包裹

```react
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
```

注意BrowserRouter可以使用HashRouter替换使用，不过使用HashRouter的话url路径里会多一个#，且#后面的内容不会发给服务器，后面会讲到

## 路由组件与一般组件区别

1.写法不同：

​            一般组件：`<Demo/>`

​            路由组件：`<Route path="/demo" component={Demo}/>`

2.存放位置不同：

​            一般组件：components

​            路由组件：pages

3.接收到的props不同(**react-router-dom v6获取不到这些属性了**)：

​            一般组件：写组件标签时传递了什么，就能收到什么

​            路由组件：接收到三个固定的属性

​                      history:

​                            go: ƒ go(n)

​                            goBack: ƒ goBack()

​                            goForward: ƒ goForward()

​                            push: ƒ push(path, state)

​                            replace: ƒ replace(path, state)

​                      location:

​                            pathname: "/about"

​                            search: ""

​                            state: undefined

​                      match:

​                            params: {}

​                            path: "/about"

​                            url: "/about"

## NavLink的使用

目前我们点击对应的路由时，是没有高亮显示的。

NavLink可以实现路由链接的高亮，通过`activeClassName`属性指定样式名，默认是`"active"`

为了解决，需要使用NavLink

```react
import { NavLink, Link, Route, Routes } from 'react-router-dom';

<NavLink className="list-group-item" to="/about">About</NavLink>
<NavLink className="list-group-item" to="/home">Home</NavLink>
```

引用了bootstarp.css，高亮时默认属性名就是actived，所以此处不用写`activeClassName`

# NavLink的封装

看这个例子：

```js
<NavLink className="list-group-item" to="/about">About</NavLink>
<NavLink className="list-group-item" to="/home">Home</NavLink>
<NavLink className="list-group-item" to="/about">About</NavLink>
<NavLink className="list-group-item" to="/home">Home</NavLink>
<NavLink className="list-group-item" to="/about">About</NavLink>
<NavLink className="list-group-item" to="/home">Home</NavLink>
<NavLink className="list-group-item" to="/about">About</NavLink>
<NavLink className="list-group-item" to="/home">Home</NavLink>
<NavLink className="list-group-item" to="/about">About</NavLink>
<NavLink className="list-group-item" to="/home">Home</NavLink>
```

很多重复性代码，优化空间很大。

我们可以把相同的代码就行封装，只留下不同的即可

```react
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
export default class MyNavLink extends Component {
  render() {
    return (
      <NavLink
        activeClassName="demo"
        className="list-group-item"
        {...this.props}
      ></NavLink>
    );
  }
}

```

```react
<MyNavLink to="/about" children="About">About</MyNavLink>
<MyNavLink to="/home" children="Home">Home</MyNavLink>
```

这里有一个细节，标签属性我们可以通过props传递

但是标签体内容呢？比如About Home

其实默认也会传递

比如我在这里写的是

```react
<MyNavLink to="/about" children="About">你看我是标签体内容哈</MyNavLink>
```

那么我在封装的组件中打印props：

```react
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
export default class MyNavLink extends Component {
  render() {
      
    console.log(this.props);
      
    return (
      <NavLink
        activeClassName="demo"
        className="list-group-item"
        {...this.props}
      ></NavLink>
    );
  }
}

```

打印结果：

```js
{to: '/about', children: '你看我是标签体内容哈'}
```

所以默认会传递children属性，值为标签体内容

## Switch的使用

通常情况下，**path和component是一一对应的关系。**

Switch可以提高路由匹配效率(单一匹配)。

```react
<Switch>
  <Route path="/about" component={About}/>
  <Route path="/home" component={Home}/>
  <Route path="/home" component={Test}/>
</Switch>
```

这样只要匹配到了第一个home就不会再往下匹配了

## 多级路径刷新页面样式丢失问题

public/index.html 中 引入样式时不写 `./` 写 `/` （常用）【绝对路径】

public/index.html 中 引入样式时不写 `./` 写 `%PUBLIC_URL%` （常用）

使用`HashRouter`

## 路由的严格匹配与模糊匹配

默认使用的是模糊匹配（简单记：【输入的路径】必须包含要【匹配的路径】，且顺序要一致）

- /home/a/b  /home可以  /home  /home/a/b不可以   /a/home/b /home不可以

开启严格匹配：`<Route exact={true} path="/about" component={About}/>`

严格匹配不要随便开启，需要再开，有些时候开启会导致无法继续匹配二级路由

## Redirect的使用

一般写在所有路由注册的最下方，当所有路由都无法匹配时，跳转到Redirect指定的路由

```react
<Switch>
	<Route path="/about" component={About}/>
	<Route path="/home" component={Home}/>
	<Redirect to="/about"/>
</Switch>
```

注意：react-router-dom v6版本写法已经改变

```react
import { Route, Routes, Navigate } from 'react-router-dom';
<Routes>
	<Route path="/about" element={<About />} />
	<Route path="/home" index element={<Home />} />
	<Route index element={<Navigate to="/home" />} />
</Routes>
```

## 嵌套路由

我把react-router-dom回退到5.2.0版本了 v6咱玩不起

1. 注册子路由时要写上父路由的path值 /home/news
2. 路由的匹配是按照注册路由的顺序进行的

Home组件中：

```react
import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import News from './News';
import Message from './Message';
import MyNavLink from '../../components/MyNavLink';
export default class Home extends Component {
  render() {
    return (
      <div>
        <h2>Home组件内容</h2>
        <ul className="nav nav-tabs">
          <li>
            <MyNavLink to="/home/news">News</MyNavLink>
          </li>
          <li>
            <MyNavLink to="/home/message">Message</MyNavLink>
          </li>
        </ul>
        {/* 注册路由 */}
        <Switch>
          <Route path="/home/news" component={News} />
          <Route path="/home/message" component={Message} />
          <Redirect to="/home/news" />
        </Switch>
      </div>
    );
  }
}
```

## 向路由组件传递params参数

- 路由链接(携带参数)：`<Link to='/demo/test/tom/18'}>详情</Link>`
- 注册路由(声明接收)：`<Route path="/demo/test/:name/:age" component={Test}/>`
- 接收参数：this.props.match.params

message组件

```react
import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Detail from './Detail';
export default class Message extends Component {
  state = {
    messageArr: [
      { id: '01', title: '消息一' },
      { id: '02', title: '消息二' },
      { id: '03', title: '消息三' },
    ],
  };
  render() {
    const { messageArr } = this.state;
    return (
      <div>
        <ul>
          {messageArr.map((msgObj) => {
            return (
              <li key={msgObj.id}>
                {/* 想路由组件传递params参数 */}
                <Link
                  to={`/home/message/detail/${msgObj.id}/${msgObj.title}`}
                >{msgObj.title}</Link>
              </li>
            );
          })}
        </ul>
        <hr />
        {/* 接收params参数 */}
        <Route
          path="/home/message/detail/:id/:title"
          component={Detail}
        ></Route>
      </div>
    );
  }
}
```

Detail组件：

```react
import React, { Component } from 'react';
const detailData =  [
    { id: '01', title: '11111' },
    { id: '02', title: '2222' },
    { id: '03', title: '3333' },
  ]
export default class Detail extends Component {
  render() {
    const { id, title } = this.props.match.params;
    const findResult = detailData.find((detailobj) => {
      return detailobj.id === id;
    });
    return (
      <div>
        <ul>
          <li>ID:{id}</li>
          <li>TITLE:{title}</li>
          <li>CTX:{findResult.title}</li>
        </ul>
      </div>
    );
  }
}
```

## 向路由组件传递search参数

- 路由链接(携带参数)：`<Link to='/demo/test?name=tom&age=18'}>详情</Link>`
- 注册路由(无需声明，正常注册即可)：`<Route path="/demo/test" component={Test}/>`
- 接收参数：this.props.location.search
- 备注：获取到的search是urlencoded编码**字符串**，需要借助querystring解析
  

Message组件：

```react
{/* 想路由组件传递search参数 */}
<Link to={`/home/message/detail/?id=${msgObj.id}&title=${msgObj.title}`}>{msgObj.title}</Link>


{/* search参数无需接收  正常注册路由即可 */}
<Route path="/home/message/detail" component={Detail}></Route>
```

Detail组件：

```react
import React, { Component } from 'react';
import qs from 'querystring';
const detailData = [
  { id: '01', title: '11111' },
  { id: '02', title: '2222' },
  { id: '03', title: '3333' },
];
export default class Detail extends Component {
  render() {
    //search参数
    //?id=01&title=消息一  字符串的形式
    // console.log(this.props.location.search);
      
    const { search } = this.props.location;
      //解析成对象形式并去掉？
    const { id, title } = qs.parse(search.slice(1));

    const findResult = detailData.find((detailobj) => {
      return detailobj.id === id;
    });
    return (
      <div>
        <ul>
          <li>ID:{id}</li>
          <li>TITLE:{title}</li>
          <li>CTX:{findResult.title}</li>
        </ul>
      </div>
    );
  }
}

```

## 向路由组件传递state参数

- 路由链接(携带参数)：`<Link to={{ pathname:'/demo/test', state:{name:'tom',age:18} }}>详情</Link>`
- 注册路由(无需声明，正常注册即可)：`<Route path="/demo/test" component={Test}/>`
- 接收参数：this.props.location.state
- 备注：刷新也可以保留住参数【history对象记录着在】如果清空浏览器历史记录就会报错

Message组件：

```react
<Link to={{ pathname: '/home/message/detail',state: { id: msgObj.id, title: msgObj.title },}}>{msgObj.title} </Link>

{/* state参数无需接收  正常注册路由即可 */}
<Route path="/home/message/detail" component={Detail}></Route>
```

Detail组件：

```react
 // state参数
 // {id: '01', title: '消息一'}
 // console.log(this.props.location);
 // || {}防止history清除报错
 const { id, title } = this.props.location.state || {};
```

## 编程式路由导航

借助this.prosp.history对象上的API对操作路由跳转、前进、后退
- this.prosp.history.push()
- this.prosp.history.replace()
- this.prosp.history.goBack()
- this.prosp.history.goForward()
- this.prosp.history.go()

```react
replace = (id, title) => {
    // replace跳转+携带params参数
    this.props.history.replace(`/home/message/detail/${id}/${title}`);

    // replace跳转+携带search参数
    // this.props.history.replace(`/home/message/detail/?id=${id}&title=${title}`);

    // replace跳转+携带params参数
    // this.props.history.replace(`/home/message/detail`,{id:id,title:title});
  };
  push = (id, title) => [
    // push跳转+携带params参数
    this.props.history.push(`/home/message/detail/${id}/${title}`),

    // push跳转+携带search参数
    // this.props.history.push(`/home/message/detail/?id=${id}&title=${title}`);

    // push跳转+携带state参数
    // this.props.history.push(`/home/message/detail`,{id:id,title:title});
  ];
```

```react
<button onClick={() => { this.push(msgObj.id, msgObj.title); }}>push查看</button>
<button onClick={() => { this.replace(msgObj.id, msgObj.title); }}>replace查看</button>
```

## withRouter

`withRouter`可以加工一般组件，让一般组件**具备路由组件所特有的API**
`withRouter`的返回值是一个新组件

```react
import {withRouter} from 'react-router-dom'

export default withRouter(header)
```

## BrowserRouter与HashRouter的区别

底层原理不一样：

- BrowserRouter使用的是H5的history API，不兼容IE9及以下版本。
- HashRouter使用的是URL的哈希值。

path表现形式不一样

- BrowserRouter的路径中没有#,例如：localhost:3000/demo/test
- HashRouter的路径包含#,例如：localhost:3000/#/demo/test

刷新后对路由state参数的影响

- BrowserRouter没有任何影响，因为state保存在history对象中。

- HashRouter刷新后会导致路由state参数的丢失！！！


备注：HashRouter可以用于解决一些路径错误相关的问题。
