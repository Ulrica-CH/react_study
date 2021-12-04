---
title: React入门概述
date: 2021-11-02 12:54:00
---
# 一、React概述

## 1.1 react介绍
- 用于动态构建用户界面的 JavaScript 库(**只关注于视图**)
- 发送请求获取数据
- 处理数据（过滤，整理格式等）
- 操作DOM呈现页面（React做的事情）
- R**eact是一个将数据渲染为HTML视图的开源JavaScript库**
## 1.2 原生JavaScript的缺点
- 原生JavaScript操作DOM繁琐，效率低（DOM-API操作UI）
- 使用JavaScript直接操作DOM，浏览器会进行大量的重绘重排
- 原生JavaScript没有组件化编码方案，代码复用率很低
## 1.3 浏览器重绘重排
- 浏览器重绘(repaint)重排(reflow)与优化[浏览器机制]
- 重绘(repaint)：当一个元素的外观发生改变，但没有改变布局,重新把元素外观绘制出来的过程，叫做重绘
- 重排(reflow)：当DOM的变化影响了元素的几何信息(DOM对象的位置和尺寸大小)，浏览器需要重新计算元素的几何属性，将其安放在界面中的正确位置，这个过程叫做重排
## 1.4 模块化与组件化
- 模块
  - 理解：向外提供特定功能的js程序, 一般就是一个js文件
  - 为什么要拆成模块：随着业务逻辑增加，代码越来越多且复杂。
  - 作用：复用js, 简化js的编写, 提高js运行效率
- 组件
  - 理解：用来实现局部功能效果的代码和资源的集合(html/css/js/image等等)
  - 为什么要用组件： 一个界面的功能更复杂
  - 作用：复用编码, 简化项目编码, 提高运行效率
  - 模块化：当应用的js都以模块来编写的, 这个应用就是一个模块化的应用
  - 组件化：当应用是以多组件的方式实现, 这个应用就是一个组件化的应用
## 1.5 React的特点
- 采用**组件化模式、声明式编码**，提高开发效率及组件复用率
- 在 React Native中可以使用React语法进行移动端开发
- 使用**虚拟DOM+Diff算法**，尽量减少与真实DOM的交互
## 1.6. React高效的原因
- 使用虚拟(virtual)DOM, 不总是直接操作页面真实DOM。
- DOM Diffing算法, 最小化页面重绘。
#  二、Hello React
## 2.1 相关库介绍
旧版本 16.8.4 (March 5, 2019) 新版本 有不一样的会说明

- **react.js**：React核心库。
- **react-dom.js**：提供操作DOM的React扩展库。
- **babel.min.js**：解析JSX语法代码转为JS代码的库。
- 【补充】babel.js的作用

- 浏览器**不能直接解析JSX代码, 需要babel转译**为纯JS的代码才能运行
- 只要用了JSX，都要加上**type="text/babel"**, 声明需要babel来处理

## 2.2 使用JSX创建虚拟DOM
```react
const VDOM = <h1>Hello,React</h1>
```
## 2.3 渲染虚拟DOM(元素)
```react
ReactDOM.render(virtualDOM, containerDOM)
```
- 作用: 将虚拟DOM元素渲染到页面中的真实容器DOM中显示
  
  参数一: 纯js或jsx创建的虚拟dom对象
  

参数二: 用来包含虚拟DOM元素的真实dom元素对象(一般是一个div)

```react
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>hello_react</title>
</head>

<body>
  <!-- 准备好一个“容器” -->
  <div id="test"></div>

  <!-- 引入react核心库 -->
  <script type="text/javascript" src="../js/react.development.js"></script>
  <!-- 引入react-dom，用于支持react操作DOM -->
  <script type="text/javascript" src="../js/react-dom.development.js"></script>
  <!-- 引入babel，用于将jsx转为js -->
  <script type="text/javascript" src="../js/babel.min.js"></script>

  <script type="text/babel"> /* 此处一定要写babel */
		//1.创建虚拟DOM
		const VDOM = <h1>Hello,React</h1> /* 此处一定不要写引号，因为不是字符串 */
		//2.渲染虚拟DOM到页面
		ReactDOM.render(VDOM,document.getElementById('test'))
	</script>
</body>

</html>
```

 


![Hello React](http://cdn.michstabe.cn/clipboard.png)

# 三、创建虚拟DOM的两种方式

## 3.1 纯JS方式(一般不用)

```react
<div id="test"></div>

<script type="text/javascript" src="../js/react.development.js"></script>
<script type="text/javascript" src="../js/react-dom.development.js"></script>

<script type="text/javascript" > 
	//1.创建虚拟DOM
	const VDOM = React.createElement('h1',{id:'title'},React.createElement('span',{className:'class'},'Hello,React'))
	//2.渲染虚拟DOM到页面
	ReactDOM.render(VDOM,document.getElementById('test'))
</script>
```

## 3.2 JSX方式

JSX方式就是js创建虚拟DOM的语法糖

```react
<div id="test"></div>

<script type="text/javascript" src="../js/react.development.js"></script>
<script type="text/javascript" src="../js/react-dom.development.js"></script>
<script type="text/javascript" src="../js/babel.min.js"></script>

<script type="text/babel" > /* 此处一定要写babel */
	//1.创建虚拟DOM
	const VDOM = (  /* 此处一定不要写引号，因为不是字符串 */
		<h1 id="title">
			<span>Hello,React</span>
		</h1>
	)
	//2.渲染虚拟DOM到页面
	ReactDOM.render(VDOM,document.getElementById('test'))
</script>
```

#  四、虚拟DOM与真实DOM

打印输出虚拟DOM和真实DOM进行比较

```react
const VDOM = (  /* 此处一定不要写引号，因为不是字符串 */
	<h1 id="title">
		<span>Hello,React</span>
	</h1>
)
//2.渲染虚拟DOM到页面
ReactDOM.render(VDOM,document.getElementById('test'))

const TDOM = document.getElementById('demo')
console.log('虚拟DOM',VDOM);
console.log('真实DOM',TDOM);
debugger;
```

![](http://cdn.michstabe.cn/blog/211204/9ff64mG4lc.png?imageslim)

- 虚拟DOM本质是Object类型的对象（一般对象）
- 虚拟DOM**比较“轻**”，真实DOM比较“重”，因为虚拟DOM是React内部在用，无需真实DOM上那么多的属性
- 虚拟DOM**最终会被React转化为真实DOM**，呈现在页面上

#  五、JSX入门

## 5.1 概述

- 全称: JavaScript XML
- React定义的一种**类似于XML的JS扩展语法: JS + XML本质是React.createElement(component, props, ...children)方法的语法糖**
- 作用: 用来简化创建虚拟DOM
- 写法：`var ele = <h1>Hello JSX!</h1>`
  - 注意1：它**不是字符串, 也不是HTML/XML标签**
  - 注意2：它最终产生的就是一个**JS对象**
- 标签名任意: HTML标签或其它标签
- 标签属性任意: HTML标签属性或其它

## 5.2 基本语法规则

- 定义虚拟DOM时，**不要写引号**。

- 标签中混入JS表达式时要用 { }。

- 样式的类名指定不要用 class，要用 **className**。（因为class是ES6中类的关键字，所以不让用）

- 只有一个根标签

- 标签必须闭合

- 标签首字母

- - (1). 若小写字母开头，则将该标签转为html中同名元素，**若html中无该标签对应的同名元素，则报错。**
  - (2). 若大写字母开头，React就去渲染对应的组件，若组件没有定义，则报错。

#  六、区分js表达式与js语句

表达式：一个表达式会产生一个值，可以放在任何一个需要值的地方

- 下面这些都是表达式：

  (1) a

  (2) a+b

  (3) demo(1) // 函数调用表达式

  (4) arr.map()

  (5) function test () {}  

- 下面这些都是语句：
  - if(){ }
  - for(){ }

  - switch( ){case:xxxx}

```react
<body>
    <!-- 创建一个容器 -->
    <div id="test"></div>
    <!-- 引入核心库 -->
    <script src="../js/react.development.js"></script>
    <!-- 引入react-dom 用于支持react操作dom -->
    <script src="../js/react-dom.development.js"></script>
    <!-- 引入babel 用于将jsx转为js -->
    <script src="../js/babel.min.js"></script>
    <!-- 注意这里的类型 为babel -->
    <script type="text/babel">
        const data = ['Angular', 'Vue', 'React']
        // 这里创建虚拟DOM不要加引号
        const VDOM = (
            <div>
                <h1>前端框架</h1>
                <ul>
                    {data.map((v, i) => {
                        return <li key={i}>{v}</li>
                    })}
                </ul>
            </div>
        )
        ReactDOM.render(VDOM, document.getElementById('test'))
    </script>
</body>
```

