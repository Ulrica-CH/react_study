# 一、react脚手架介绍

xxx脚手架: 用来帮助程序员快速创建一个基于xxx库的模板项目

- 包含了所有需要的配置（语法检查、jsx编译、devServer…）
- 下载好了所有相关的依赖
- 可以直接运行一个简单效果

react提供了一个用于创建react项目的脚手架库: **create-react-app**

- 项目的整体技术架构为:  react + webpack + es6 + eslint
- 使用脚手架开发的项目的特点: 模块化, 组件化, 工程化

## 下载安装脚手架 创建项目并启动

- 全局安装：npm i -g create-react-app
- 切换到想创项目的目录，使用命令：create-react-app hello-react
- 进入项目文件夹：cd hello-react
- 启动项目：npm start

页面效果：

![](http://cdn.michstabe.cn/blog/211109/7l7498B1H7.png?imageslim)

注意如果创建项目报错：

![](http://cdn.michstabe.cn/blog/211109/b4mK102K6h.png?imageslim)

执行npm cache clean --force在重新创建即可

# 二、脚手架文件介绍

![mark](http://cdn.michstabe.cn/blog/211109/GEaADHIJl5.png?imageslim)

public ---- 静态资源文件夹

- ​		favicon.icon ------ 网站页签图标
- ​		**index.html --- 主页面**
- ​		logo192.png ------- logo图
- ​		logo512.png ------- logo图
- ​		manifest.json ----- 应用加壳的配置文件
- ​		robots.txt -------- 爬虫协议文件

index.html文件：

```react
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
    
  <!-- 代表public文件夹的路径 -->
  <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    
  <!-- 开启理想视口，用于移动端适配 -->
  <meta name="viewport" content="width=device-width, initial-scale=1" />
    
  <!-- 用于配置浏览器页签+地址栏的颜色（仅支持安卓手机浏览器） -->
  <meta name="theme-color" content="#000000" />
    
  <!-- seo搜索 -->
  <meta name="description" content="Web site created using create-react-app" />
    
  <!-- 用于指定网页添加到手机屏幕后的图标 -->
  <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    
<!-- 应用加壳时的配置文件 -->
  <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />

  <title>React App</title>
</head>

<body>
  <!-- 若浏览器不支持js则展示标签内容 -->
  <noscript>You need to enable JavaScript to run this app.</noscript>
  <!-- 容器 -->
  <div id="root"></div>

</body>

</html>
```

src ---- 源码文件夹

- App.css -------- App组件的样式

- **App.js------App组件**
- App.test.js ---- 用于给App做测试，不常用
- index.css ------ 通用样式样式
- **index.js------入口文件**
- logo.svg ------- logo图
- reportWebVitals.js
  - 页面性能分析文件(需要web-vitals库的支持)
- setupTests.js
  - 组件单元测试的文件(需要jest-dom库的支持)

App.js文件：

```react
import logo from './logo.svg';
import './App.css';

//封装一个组件
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

//导出组件
export default App;
```

index.js文件:

```react
//引入核心库
import React from 'react';
import ReactDOM from 'react-dom';
//引入通用样式文件
import './index.css';
//导入App组件
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
```

React.StrictMode:严格模式检测

# 三、简化实现最简单的页面结构

只需要三个重要文件index.html index.js App.js

![](http://cdn.michstabe.cn/blog/211109/hkFdkA04Gg.png?imageslim)

index.html:

```react
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>react脚手架</title>
</head>
<body>
    <div id="root"></div>
</body>
</html>
```

App.js:

```react
import React from 'react';
class App extends React.Component {
  render() {
    return (
      <div>
        <h2>Hello react-cli</h2>
      </div>
    );
  }
}
export default App;
```

index.js:

```react
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
ReactDOM.render(<App />, document.getElementById('root'));

```

页面效果：

![](http://cdn.michstabe.cn/blog/211109/B1H4LlaE64.png?imageslim)

新建组件建议放到components文件夹里并创建对应组件文件夹方便管理：

![](http://cdn.michstabe.cn/blog/211109/6KBciB9937.png?imageslim)

此时APP.js要引入组件：

```react
import React from 'react';
import Hello from './components/Hello/Hello';
import Welcome from './components/Welcome/Welcome';
class App extends React.Component {
  render() {
    return (
      <div>
        <h2>Hello react-cli</h2>
        <Hello />
        <Welcome />
      </div>
    );
  }
}
export default App;

```

Welcome组件：

```react
import React from 'react';
import './Welcome.css'
class Welcome extends React.Component {
  render() {
    return (
      <div>
        <h2 className="title">Hello react-cli---Welcome组件</h2>
      </div>
    );
  }
}
export default Welcome;

```

Welcome.css:

```react
.title{
    background-color: green;
}
```

不多说，都应该懂

页面效果：

![](http://cdn.michstabe.cn/blog/211109/61Im2hgfKE.png?imageslim)

## 关于简写：

```react
class App extends React.Component
```

可以改写：

```react
const { Component } = React;
class App extends Component
```

或者：

```react
import React,{Component} from 'react';
class App extends Component
```

这种写法是因为react本身导出了很多模块。

## 关于开发习惯：

有的公司为了便于开发会把components文件夹下文件改写：

![mark](http://cdn.michstabe.cn/blog/211109/3LDd3heDCF.png?imageslim)

这样引入的的时候写法就简便了：

```react
import Hello from './components/Hello';
import Welcome from './components/Welcome'
```

但是查看文件就比较麻烦了：

![](http://cdn.michstabe.cn/blog/211109/EGDHDj4fBL.png?imageslim)

不过也得了解，去了公司要按规矩办事。

## 关于组件和普通文件：

我们发现APP.js Welcome.js Hello.js文件都是组件

index.js是入口文件

怎么区分呢？

可以把组件.js后缀修改为.jsx

![](http://cdn.michstabe.cn/blog/211109/aegbBdFk15.png?imageslim)

引入的时候直接写文件名就可以，不用加.jsx后缀，默认支持

```react
import Hello from './components/Hello/Hello';
import Welcome from './components/Welcome/Welcome';
```

App.js文件一般不用修改。

## 关于样式模块化：

我们上面如果Hello组件，Welcome组件都设置了样式

```react
Hello组件
.title{
    background-color: green;
}
Welcome组件
.title{
    background-color: blue;
}
```

那么最后页面效果？

![](http://cdn.michstabe.cn/blog/211109/Eb441c944D.png?imageslim)

因为两个组件都集中到了APP组件中，且Welcome最后引入，那么title样式会覆盖Hello组件的title样式？

怎么解决：

Hello.css修改为Hello.module.css

然后修改Hello.js:

```react
import React from 'react';
//注意写法
import hello from './Hello.module.css'
class Hello extends React.Component {
  render() {
    return (
      <div>
        <h2 className={hello.title}>Hello react-cli---Hello组件</h2>
      </div>
    );
  }
}
export default Hello;

```

这样就解决了：

![](http://cdn.michstabe.cn/blog/211109/jL12fc7hcj.png?imageslim)

## react快捷创建组件插件

自己去手写创建组件效率过慢

安装插件：

![](http://cdn.michstabe.cn/blog/211109/C8gKa816Gl.png?imageslim)

新建目录：

![](http://cdn.michstabe.cn/blog/211109/4fe1CmC0Kj.png?imageslim)

然后输入rcc enter：

```react
import React, { Component } from 'react'

export default class Test extends Component {
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

```

输入rfc enter：

```react
import React from 'react'

export default function Test() {
    return (
        <div>
            
        </div>
    )
}
```

极大提高效率。更多用法可查询组件介绍。

## 组件化开发流程

- 1. 拆分组件: 拆分界面,抽取组件

- 2. 实现静态组件: 使用组件实现静态页面效果

- 3. 实现动态组件

     3.1 动态显示初始化数据

     ​	3.1.1 数据类型

     ​	3.1.2 数据名称

     ​	3.1.3 保存在哪个组件?

     3.2 交互(从绑定事件监听开始)