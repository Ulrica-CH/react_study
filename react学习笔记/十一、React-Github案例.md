# 一、案例分析

输入框搜索github用户名，发起请求并显示到页面。

组件抽离：

- App跟组件
- Search搜索组件
- List信息展示组件

关键技术：

- 子组件传递信息给父组件
- 配置代理的使用 http-proxy-middleware库
- axios的使用

## 组件抽离：

App组件

```react
import React, { Component } from 'react';
import Search from './components/Search';
import List from './components/List';
export default class App extends Component {
  render() {
    return (
      <div>
        <Search />
        <List  />
      </div>
    );
  }
}

```

Search组件

```react
import React, { Component } from 'react';
import axios from 'axios';

export default class Search extends Component {
  render() {
    return (
      <section className="jumbotron">
        <h3 className="jumbotron-heading">Search Github Users</h3>
        <div>
          <input
            type="text"
            placeholder="请输入github用户名字"
          />
          &nbsp;<button>搜索</button>
        </div>
      </section>
    );
  }
}

```

List组件

```react
import React, { Component } from 'react';
import './index.css';

export default class List extends Component {
  render() {
    return (
      <div className="row">
        <div className="card">
          <a href="https://github.com/reactjs" target="_blank">
            <img src="https://avatars.githubusercontent.com/u/6412038?v=3" style={{width:'100px'}}/>
          </a>
          <p className="card-text">reactjs</p>
        </div>
      </div>
    );
  }
}

```

## 配置代理，发起请求

如果我们多次请求这个网址，可能会被认为攻击而被阻止。

所以我们使用Node搭建第三方服务器，在github不返回数据时，使用node提供的模拟数据

服务器文件放到个人github仓库里，文件名server npm start运行即可

所以需要配置代理，在请求时使用代理来请求github网址。

### 配置代理

src目录下新建setupProxy.js

```js
const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    proxy('/api1', {
      //api1是需要转发的请求(所有带有/api1前缀的请求都会转发给5000)
      target: 'http://localhost:5000', //配置转发目标地址(能返回数据的服务器地址)
      changeOrigin: true, //控制服务器接收到的请求头中host字段的值
      /*
      	changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
      	changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:3000
      	changeOrigin默认值为false，但我们一般将changeOrigin值设为true
      */
      pathRewrite: { '^/api1': '' }, //去除请求前缀，保证交给后台服务器的是正常请求地址(必须配置)
    })
  );
};
```

Search.jsx使用axios发起请求：

```react
import React, { Component } from 'react';
import axios from 'axios';

export default class Search extends Component {
    axios.get(`/api1/search/users?q=${keyWord}`).then(
      (res) => {
          //请求数据成功显示数据
        console.log(res)
      });
  render() {
    return (
      <section className="jumbotron">
        <h3 className="jumbotron-heading">Search Github Users</h3>
        <div>
          <input
            type="text"
            placeholder="请输入github用户名字"
          />
          &nbsp;<button>搜索</button>
        </div>
      </section>
    );
  }
}

```

## 数据显示

App.jsx:

```react
state = { users: []};
saveUsers = (users) => {
    this.setState(users);
  };
  render() {
    return (
      <div>
        <Search saveUsers={this.saveUsers} />
        <List  />
      </div>
    );
  }
```

Search.jsx:

```react
export default class Search extends Component {
  search = () => {
      //多重解构赋值获取输入内容
    const {
      keyWordElement: { value: keyWord },
    } = this;
    axios.get(`/api1/search/users?q=${keyWord}`).then(
      (res) => {
          this.props.saveUsers(res.data.items)
      });
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

这样Search.jsx拿到的数据就可以传递给App.jsx，但是要传递给List.jsx进行显示：

App.jsx:

```react
render() {
    return (
      <div>
        <Search updateStates={this.updateStates} />
        <List users = {this.state} />
      </div>
    );
  }
```

List.jsx:

```react
import React, { Component } from 'react';
import './index.css';

export default class List extends Component {
  render() {
    const { users, isFirst, isLoading, err } = this.props;
    return (
      <div className="row">
        {users.map((userObj) => {
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

注意：

- rel="noreferrer"
-  alt="head"
- 不填写会报警告

## 多页面显示

- 首次进入页面应该显示欢迎，请求数据时显示loading，失败时显示错误信息
- 怎么实现？
- 首先初始数据，然后调用相关方法？
- **简洁一点，放到一个方法里，根据传递的参数进行判断**

初始化数据

修改saveUsers为updateSStates

App.jsx:

```react
import React, { Component } from 'react';
import Search from './components/Search';
import List from './components/List';
export default class App extends Component {
  state = {
    users: [],
    //控制首次页面显示
    isFirst: true,
    //控制请求时显示
    isLoading: false,
    //错误页面显示
    err: '',
  };
  //通过状态对象更新组件状态
  updateStates = (updateObj) => {
    this.setState(updateObj);
  };
  render() {
    return (
      <div>
        <Search updateStates={this.updateStates} />
        <List {...this.state} />
      </div>
    );
  }
}
```

Search.jsx:

```react
import React, { Component } from 'react';
import axios from 'axios';

export default class Search extends Component {
  search = () => {
    const {
      keyWordElement: { value: keyWord },
    } = this;
    //发起请求前loading
    this.props.updateStates({ isFirst:false, isLoading: true });
    axios.get(`/api1/search/users?q=${keyWord}`).then(
      (res) => {
          //请求数据成功显示数据
        this.props.updateStates({ isLoading: false, users: res.data.items });
      },
      (err) => {
          //失败后获取失败信息
        this.props.updateStates({isLoading:false,err});
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

List.jsx:通过三元表达式来判断页面显示：

```react
import React, { Component } from 'react';
import './index.css';

export default class List extends Component {
  render() {
    const { users, isFirst, isLoading, err } = this.props;
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

这样在初始页面显示欢迎您，请求数据时显示搜索中，成功时渲染数据，失败时返回错误信息，

更好的用户体验。

具体代码详见https://github.com/Ulrica-CH/react_study