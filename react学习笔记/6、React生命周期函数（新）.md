# 一、看一下官方文档的说法

![](http://cdn.michstabe.cn/blog/211107/39A52g8i0l.png?imageslim)

![](http://cdn.michstabe.cn/blog/211107/KJI4eK1FlA.png?imageslim)

总结一下：

- 为了后续的版本和异步渲染等操作，有三个生命周期函数不被推荐使用，在后续版本中会被废除。
- 分别是componentWillMount()、componentWillUpdate()、componentWillReceiveProps()、
- 按照官方文档说法
  - 在16.3版本以后，我们在这样去写会报警告
  - 在17.0版本，会删除这三个生命周期钩子（还没被删除，但是也要避免以前的写法）
  - 我们使用17.0版本的react.js文件来看一下

```react
<body>
    <!-- 创建一个容器 -->
    <div id="test"></div>
    <!-- 引入核心库 -->
    <script src="/react/js/17.0.1版本/react.development.js"></script>
    <!-- 引入react-dom 用于支持react操作dom -->
    <script src="/react/js/17.0.1版本/react-dom.development.js"></script>
    <!-- 引入babel 用于将jsx转为js -->
    <script src="/react/js/17.0.1版本/babel.min.js"></script>
    <!-- 注意这里的类型 为babel -->
    <script type="text/babel">
        //创建类式组件
        class Count extends React.Component {
            constructor(props) {
                console.log('Count --- constructor');
                super(props)
                this.state = { count: 0 }
            }
            add = () => {
                let { count } = this.state
                count += 1
                this.setState({ count })
            }
            force = () => {
                this.forceUpdate()
            }
            //组件将要挂载的钩子
            componentWillMount() {
                console.log('Count --- componentWillMount');
            }
            //组件挂载完毕的钩子
            componentDidMount() {
                console.log('Count --- componentDidMount');

            }
            //控制组件更新的阀门
            shouldComponentUpdate() {
                console.log('Count --- shouldComponentUpdate');
                //不写这个钩子 默认返回true 写了这个钩子一定自己返回个值
                //true代表允许更新，继续往下执行 false代表不允许更新，不会进行后续的操作
                return false
            }
            //组件将要更新的钩子
            componentWillUpdate() {
                console.log('Count --- componentillUpdate');
            }
            //组件更新完毕的钩子
            componentDidUpdate() {
                console.log('Count --- componentDidUpdate');
            }
            //初次渲染，状态更新时调用
            render() {
                console.log('Count --- render');
                const count = this.state
                return (
                    <div>
                        <h2>求和:{this.state.count}</h2>
                        <button onClick={this.add}>+1</button>
                        <button onClick={this.force}>不更改状态，强制更新</button>
                    </div>
                )
            }
        }
        class A extends React.Component {
            state = { carName: '大奔' }
            changeCarName = () => {
                this.setState({ carName: '奥迪' })
            }
            render() {
                return (
                    <div>
                        <h2>我是A组件</h2>
                        <button onClick={this.changeCarName}>换车</button>
                        {/*子组件B*/}
                        <B carName={this.state.carName}/>
                    </div>
                )
            }

        }
        class B extends React.Component {
            //组件将要接收新的props的钩子 可以传递值
            componentWillReceiveProps(props) {
                console.log('B --- componentWillReceiveProps',props);
            }
            //初次渲染，状态更新时调用
            render() {
                return (
                    <div>
                        <h2>B组件，接收到的车:{this.props.carName}</h2>
                    </div>
                )
            }
        }
        //渲染组件到页面
        ReactDOM.render(<Count />, document.getElementById('test'))
    </script>

</body>
```

![](http://cdn.michstabe.cn/blog/211107/Db02bKHa6e.png?imageslim)

可以看到，我是引入了新版本也就是react17.0.1的版本

但是控制台中只是提出了警告，没有报错，说明还可以用但不推荐，而且以后可能会移除

我们加上前缀UNSAFE_

```react
		   //组件将要挂载的钩子
            UNSAFE_componentWillMount() {
                console.log('Count --- componentWillMount');
            }
            //组件将要更新的钩子
            UNSAFE_componentWillUpdate() {
                console.log('Count --- componentillUpdate');
            }
            //组件将要接收新的props的钩子 可以传递值
            UNSAFE_componentWillReceiveProps(props) {
                console.log('B --- componentWillReceiveProps', props);
            }
```

![](http://cdn.michstabe.cn/blog/211107/03D47BhH7l.png?imageslim)

可以看到，不报警告了

我这里渲染的是Count组件，UNSAFE_componentWillReceiveProps()这个钩子没有用到，我就不掩饰了，一样的道理。

来看一下新版的生命周期钩子

![](http://cdn.michstabe.cn/blog/211107/BDlm131m2h.png?imageslim)

总结下：

新版的舍弃了三个钩子上面提到那三个

新增了两个钩子。getDerivedStateFromProps()、getSnapshotBeforeUpdate()（实际开发中很少用到）

# 二、getDerivedStateFromProps()

直译：得到派生的状态从props中

先看代码吧：

```react
<script type="text/babel">
        //创建类式组件
        class Count extends React.Component {
            constructor(props) {
                console.log('Count --- constructor');
                super(props)
                this.state = { count: 0 }
            }
            add = () => {
                let { count } = this.state
                count += 1
                this.setState({ count })
            }
            force = () => {
                this.forceUpdate()
            }
            getDerivedStateFromProps() {
                console.log('Count --- getDerivedStateFromProps');
            }
            //组件挂载完毕的钩子
            componentDidMount() {
                console.log('Count --- componentDidMount');

            }
            //控制组件更新的阀门
            shouldComponentUpdate() {
                console.log('Count --- shouldComponentUpdate');
                //不写这个钩子 默认返回true 写了这个钩子一定自己返回个值
                //true代表允许更新，继续往下执行 false代表不允许更新，不会进行后续的操作
                return true
            }
            //组件更新完毕的钩子
            componentDidUpdate() {
                console.log('Count --- componentDidUpdate');
            }
            //初次渲染，状态更新时调用
            render() {
                console.log('Count --- render');
                const count = this.state
                return (
                    <div>
                        <h2>求和:{this.state.count}</h2>
                        <button onClick={this.add}>+1</button>
                        <button onClick={this.force}>不更改状态，强制更新</button>
                    </div>
                )
            }
        }
        //渲染组件到页面
        ReactDOM.render(<Count />, document.getElementById('test'))
    </script>
```

按照上面的新生命钩子图，顺序应该是constructor，getDerivedStateFromProps，render，componentDidMount

看下输出

![](http://cdn.michstabe.cn/blog/211107/iCFhHHLHhm.png?imageslim)

报错：把这个方法放在实例上会被忽略，应该用static标识为类上的方法

```react
static getDerivedStateFromProps() {
                console.log('Count --- getDerivedStateFromProps');
            }
```

在看输出：

![mark](http://cdn.michstabe.cn/blog/211107/Hma4d6j0Ce.png?imageslim)

报错解释：应该返回一个状态对象或者null

返回null试试

![](http://cdn.michstabe.cn/blog/211107/hHKfHGgkKh.png?imageslim)

返回一个状态对象：

```react
static getDerivedStateFromProps() {
                console.log('Count --- getDerivedStateFromProps');
                return {count: 100}
            }
```

![](http://cdn.michstabe.cn/blog/211107/70Fd2Df2Fe.png?imageslim)

注意此时 我们修改状态+1，数值100是不变化的，而且不再是默认的数值1

上面我们提到，可以从props中获取值：

```react
static getDerivedStateFromProps(props) {
                console.log('Count --- getDerivedStateFromProps',props);
                return props
            }
 ReactDOM.render(<Count count={1000}/>, document.getElementById('test'))
```

看下输出：这里的返回的是props，且改变状态值页面上不会变化，因为依赖的是props，peops不变，页面自然不变

![](http://cdn.michstabe.cn/blog/211107/jdmfledGIE.png?imageslim)

这个钩子用的情况较特殊：state的值在任何时候都取决于props这个情况下才会用到，其他情况很少用到。

这个钩子可以传递两个参数：

```react
static getDerivedStateFromProps(props,state) {
                console.log('Count --- getDerivedStateFromProps',props,state);
                return props
            }
```

![](http://cdn.michstabe.cn/blog/211107/ge7ah00LCj.png?imageslim)

state是初始状态值，props是返回的状态对象。

至于为什么不能去修改状态值：**因为这个钩子横跨挂载阶段和更新阶段，任何值都要受到传过来的props影响**

若state的值在任何时候都取决于props，可以使用它

# 三、getSnapshotBeforeUpdate()

直译：得到快照在更新之前

看下代码：

```react
static getDerivedStateFromProps(props,state) {
                console.log('Count --- getDerivedStateFromProps',props,state);
                return props
            }
            getSnapshotBeforeUpdate() {
                console.log('Count --- getSnapshotBeforeUpdate');
            }
```

初始页面打印效果：

![](http://cdn.michstabe.cn/blog/211107/alBGFj6mGE.png?imageslim)

但我们点击页面+1后

![](http://cdn.michstabe.cn/blog/211107/ec1bf9eG1J.png?imageslim)

页面上没有改变，因为受props影响

初始state值改变 变为1001了

getSnapshotBeforeUpdate()钩子报错，让我们返回一个快照值或null

null就不说了，什么是快照值？任何类型都可以，可以返回Number，String等等

我们先来看一个钩子 componentDidUpdate：

```react
//便于演示，把这俩钩子先注释掉
//static getDerivedStateFromProps(props, state) {
            //     console.log('Count --- getDerivedStateFromProps', props, state);
            //     return props
            // }
            // getSnapshotBeforeUpdate() {
            //     console.log('Count --- getSnapshotBeforeUpdate');
            // }
//组件更新完毕的钩子 我在这里传递了两个参数，看下输出了什么
            componentDidUpdate(a, b) {
                console.log('Count --- componentDidUpdate', a, b);
            }
```

初始页面：

![](http://cdn.michstabe.cn/blog/211107/agjHBdaD5A.png?imageslim)

点击+1后：

![](http://cdn.michstabe.cn/blog/211107/kIKeHJ2b3i.png?imageslim)

**可以看到 打印出来的是先前的状态值：**

**组件更新完成调用这个钩子，返回的是没更新之前的值**

**+1后 count变为1，但打印的是count：0**

**两个参数都是先前的值**

**a,b具体含义：preProps，preState及之前的props和state**

```react
//组件更新完毕的钩子
            componentDidUpdate(preProps, preState) {
                console.log('Count --- componentDidUpdate', preProps, preState);
            }
```

继续上个问题，快照值我们知道可以返回，但是返回后交给谁了？

看下官方文档

![](http://cdn.michstabe.cn/blog/211107/bJ5dKEfj67.png?imageslim)

**可以看到此方法的任何返回值都作为参数传递给componentDidUdate()**

```react
getSnapshotBeforeUpdate(preProps, preState) {
                console.log('Count --- getSnapshotBeforeUpdate',preProps,preState);
                return '测试值'
            }
componentDidUpdate(preProps, preState,snapshot) {
                console.log('Count --- componentDidUpdate', preProps, preState,snapshot);
            }
```

初始页面打印：

![](http://cdn.michstabe.cn/blog/211107/d596eeBgBg.png?imageslim)

+1后：

![](http://cdn.michstabe.cn/blog/211107/6h695223de.png?imageslim)

可以看到 componentDidMount第三个值就是传递过来的快照值

这里大家可能有疑问getDerivedStateFromProps的打印值是1000，1001,而下面两个钩子打印值都是1000，1000

因为下面两个钩子都是更新前的状态值，而getDerivedStateFromProps是更新后的状态值，自然不一样

至于为什么第一个参数都是打印的1000，因为我们传递的props就是count：1000,不会因为+1而改变。

**注意：这个钩子也不常用**

# 四、getSnapshotBeforeUpdate()的使用场景

一个内容框不断新增内容，可以上滑下滚动查看，不滚动是内容区域信息不变，新增内容在scroll范围内不显示。

```react
<script type="text/babel">
        //创建类式组件
        class List extends React.Component {
            state = { newsArr: [] }
            componentDidMount() {
                setInterval(() => {
                    const { newsArr } = this.state

                    const news = '新闻' + (newsArr.length + 1)

                    this.setState({ newsArr: [news, ...newsArr] })
                },1000)
            }
            getSnapshotBeforeUpdate() {
                return this.refs.list.scrollHeight
            }
            componentDidUpdate(height) {
                this.refs.list.scroll += this.refs.scrollHeihght - height
            }
            render() {
                return (
                    <div ref="list">

                        {this.state.newsArr.map((n,index) => {
                            return <div key={index}>{n}</div>
                        })}

                    </div>
                )
            }
        }
        ReactDOM.render(<List />, document.getElementById('test'))
    </script>
```

# 五、新生命周期总结

## 初始化阶段

由ReactDOM.render()触发 —— 初次渲染

- constructor() —— 类组件中的构造函数
- static getDerivedStateFromProps(props, state) 从props得到一个派生的状态【新增】
- render() —— 挂载组件
- componentDidMount() —— 组件挂载完成 比较常用

## 更新阶段

由组件内部this.setSate()或父组件重新render触发或强制更新forceUpdate()

- **getDerivedStateFromProps() —— 从props得到一个派生的状态 【新增】**
- shouldComponentUpdate() —— 组件是否应该被更新（默认返回true）
- render() —— 挂载组件
- **getSnapshotBeforeUpdate() —— 在更新之前获取快照【新增】**
- componentDidUpdate(prevProps, prevState, snapshotValue) —— 组件完成更新

## 卸载组件

- 由ReactDOM.unmountComponentAtNode()触发
- componentWillUnmount() —— 组件即将卸载

## 重要的勾子

- render：初始化渲染或更新渲染调用
- componentDidMount：开启监听, 发送ajax请求
- componentWillUnmount：做一些收尾工作, 如: 清理定时器

## 即将废弃的勾子

- componentWillMount
- componentWillReceiveProps
- componentWillUpdate
- **现在使用会出现警告，下一个大版本需要加上UNSAFE_前缀才能使用，以后可能会被彻底废弃，不建议使用。**
