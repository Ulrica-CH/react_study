# 一、组件三大属性-state

- state是组件对象最重要的属性, **值是对象**(可以包含多个key-value的组合)
- 组件被称为"状态机", 通过**更新组件的state来更新对应的页面显示**(重新渲染组件)
- 注意组件中自定义方法中的this问题（事件调用）

<script type="text/babel">
        //1.创建组件
        class Weather extends React.Component {
            constructor(props) {
                super(props)
                //初始化状态
                this.state = { isHot: true }
            }
            render() {
                const { isHot } = this.state
                return <h1 onClick={this.changeWeather}>今天天气很{isHot ? '炎热' : '凉爽'}</h1>
            }
            changeWeather() {
                //changeWeacher放到哪里？ -- Weather的原型对象上，供实例使用
                //由于changeWeacher是作为onClick的回调，所以不是通过实例调用的，是直接调用的
                //类中的方法默认开启了局部的严格模式，所以changeWeacher中的this为undefined
                console.log(this); //undefined
            }
        }
        //渲染组件到页面
        ReactDOM.render(<Weather />, document.getElementById('test'))
    </script>

- 由于changeWeacher是作为onClick的回调，所以不是通过实例调用的，是直接调用的
- 类中的方法默认开启了局部的严格模式，所以changeWeacher中的this为undefined
- 如何修改this指向？

```html
//强制修改this指向
//后面的this.changeWeacher是weather原型对象上的
//bind返回的是一个函数
//前面的this.changeWeacher时返回的新函数，并且this指向的是Weather实例对象
this.changeWeather = this.changeWeather.bind(this)
```

- 修改组件中的状态值 setState

```html
//最后如何修改isHot的值来进行切换呢
                //1.获取值
                const isHot = this.state.isHot
                //注意：2.不允许直接修改值
                // this.state.isHot = !isHot 错误写法 打印台显示数据改变，但是react检测不到
                //3.要是有React.Component的方法setState
                this.setState({ isHot: !isHot })

                //总结
                //状态必须通过setState进行更新，且更新是合并，不是替换
                //state不可以直接修改
```

- 简写方式：赋值语句形式+箭头函数
- 类中，要添加一个属性，可以采用直接赋值的方式

```html
<script>
        class Person {
            constructor(name, age) {
                this.name = name
                this.age = age
            }
            grade = '高一'
        }
        const p1 = new Person('jjj', 20)
        console.log(p1); //Person {grade: '高一', name: 'jjj', age: 20}
    </script>
```

- 所以constructor中的state可以采用直接赋值的方式
- 同理changeWeather也可以采用直接直接赋值的方式，把他放到weather实例上
- 但要使用箭头函数，因为普通函数this严格模式下为undefined、箭头函数this为上层作用域的this也就是weath实例
- 所以简写后

```html
<script type="text/babel">
        //1.创建组件
        class Weather extends React.Component {
            //简化不使用constructor
            //我们为了修改state的初始状态才被动的去使用constructor
            //类中 我们可以使用直接赋值的方式去添加属性 如 a = 1 
            //constructor可以省略了
            // constructor(props) {
            //     super(props)
            // }
            
            //所以这里可以直接state
            state = { isHot: true, wind: '微风' }
            render() {
                const { isHot, wind } = this.state
                return <h1 onClick={this.changeWeather}>今天天气很{isHot ? '炎热' : '凉爽'},{wind}</h1>
            }
            //这里也可以采用直接赋值的方式把方法放到实例本身
            //注意使用箭头函数 this查找到上层作用域也就是weather实例
            //普通函数this为undefined
            changeWeather = () => {
                const isHot = this.state.isHot
                this.setState({ isHot: !isHot })
            }
        }
        //渲染组件到页面
        ReactDOM.render(<Weather />, document.getElementById('test'))
    </script>
```

# 二、组件三大属性-props

## 理解

1. 每个组件对象都会有props(properties的简写)属性
2. 组件标签的所有属性都保存在props中

## 作用

1. 通过标签属性从组件外向组件内传递变化的数据
2. 注意:组件内部不要修改props数据

```html
<script type="text/babel">
        //创建类式组件
        class Person extends React.Component {
            render() {
                const {name,age,sex} = this.props
                return (
                    <ul>
                        <li>姓名：{name}</li>
                        <li>性别：{sex}</li>
                        <li>年龄：{age}</li>
                    </ul>
                )
            }
        }
        //渲染组件到页面
        ReactDOM.render(<Person name="xy" age = "18" sex = "男"/>, document.getElementById('test'))
    </script>
```

![props使用](E:\Typora笔记\img\props使用.png)

## 扩展运算符的复习

```html
<body>
    <script>
        let arr1 = [1, 2, 3, 4]
        let arr2 = [5, 6, 7, 8]

        //1.展开一个数组
        console.log(...arr1); //1 2 3 4

        //2.合并一个数组
        console.log([...arr1, ...arr2]); //[1,2,3,4,5,6,7,8]

        //3.在函数中使用
        function sum(...nums) {
            return nums.reduce((preValue, currentValue) => {
                return preValue + currentValue
            })
        }
        console.log(sum(1, 2, 3, 4)); //10
        console.log(sum(1, 2)); //3

        //4.构造字面量对象时使用展开语法
        let person = { name: 'Tom', age: 20 }
        let person2 = { ...person }
        person.name = 'Jack'
        console.log(person2); //{name: 'Tom', age: 20}

        //错误写法，展开运算符不能展开对象
        // console.log(...person);

        //5.合并
        let person3 = { ...person, name: 'Rose', address: "China" }
        console.log(person3); //{name: 'Rose', age: 20, address: 'China'}
    </script>
</body>
```

## 批量传递props

```html
<script type="text/babel">
        //创建类式组件
        class Person extends React.Component {
            render() {
                const { name, age, sex } = this.props
                return (
                    <ul>
                        <li>姓名：{name}</li>
                        <li>性别：{sex}</li>
                        <li>年龄：{age}</li>
                    </ul>
                )
            }
        }
        const p = { name: 'Jack', age: 20, sex: '男' }
        //渲染组件到页面
        ReactDOM.render(<Person {...p} />, document.getElementById('test'))
    </script>
```

注意{...p} 与js中的{}含义不一样，js中是构造对象的固定写法，react中的{}是放在标签中的写法

而且这种写法只能用于标签写法中ReactDOM.render(<Person {...p} />, document.getElementById('test'))

## 对props进行限制

如果想把页面上的age都+1，但是原来数据不改变，可以这样

```HTML
<li>年龄：{age + 1}</li>
```

但是如果我们传递的age如果是字符串属性，那么就是字符串拼接而不是相加了

也可以这样写

```html
ReactDOM.render(<Person name="Tom" age={20} sex="女"/>, document.getElementById('test'))
```

这样可以正常的age+1，但是别人在复用我们写的组件时，不知道age+1的需求呢？他还是写成age="20"这种形式呢？

另外，如果我们不对sex进行赋值，那页面就会不会显示，交互不是很好，所以我们需要写一个默认值，同理age也是如此

name属性是必须的，不能不进行赋值

所以我们需要用**官方的方法对props进行限制**

在react15.5版本及以下我们可以这样写：

```html
Person.propTypes = {
	name:React.PropTypes.属性
}
```

但是在react15.5版本以后，移除了这种方法，取而代之的是要引入prop-types.js文件

写法也发生改变

```html
<!-- 引入prop-types文件，对props进行限制 -->
<script src="../js/prop-types.js"></script>

	    //对标签属性进行类型，必要性的限制
        Person.propTypes = {
            name: PropTypes.string.isRequired,
            age: PropTypes.number,
            sex: PropTypes.string,
            speak:PropTypes.func //限制speak为函数，注意写法
        }

        //指定默认标签属性值
        Person.defaultProps = {
            sex: '不男不女',
            age: 18
        }

        function speak() {
            console.log('说话');
        }

        const p = { name: 'jack', sex: '男', age: 19 }
        //渲染组件到页面
        ReactDOM.render(<Person {...p} />, document.getElementById('test1'))
        ReactDOM.render(<Person name="Tom" age={20} sex="女" speak={speak}/>, document.getElementById('test2'))
```

## props简写

类中static修饰符的使用

如果直接采用赋值，是给类的实例添加属性

如果使用static进行修饰，就是给类添加属性

**类（class）通过 static 关键字定义静态方法。不能在类的实例上调用静态方法，而应该通过类本身调用**

```html
<script type="text/babel">
        //创建类式组件
        class Person extends React.Component {
            render() {
                const { name, age, sex } = this.props
                return (
                    <ul>
                        <li>姓名：{name}</li>
                        <li>性别：{sex}</li>
                        <li>年龄：{age}</li>
                    </ul>
                )
            }
            //如果再类里直接给里添加属性，不是给实例，那么需要用static修饰
            static propTypes = {
                name: PropTypes.string.isRequired,
                age: PropTypes.number,
                sex: PropTypes.string,
                speak: PropTypes.func //限制speak为函数，注意写法func
            }
            static defaultProps = {
                sex: '不男不女',
                age: 18
            }
        }
        function speak() {
            console.log('说话');
        }
        const p = { name: 'jack', sex: '男', age: 19 }
        //渲染组件到页面
        ReactDOM.render(<Person {...p} />, document.getElementById('test1'))
        ReactDOM.render(<Person name="Tom" age={20} sex="女" speak={speak} />, document.getElementById('test2'))
    </script>
```

## 类中的构造器与props

类中的构造函数一定要写吗？根据官方文档，使用构造器可以做两件事

1.初始化state

```html
this.state = { isHot: true, wind: '微风' }
```

2.为事件监听函数绑定实例

```html
this.changeWeather = this.changeWeather.bind(this)
```

但是这两种我们都有简写方式而不用使用constructor

所以constructor可写可不写

但是如果使用constructor，一定要进行props的传递与接收

```html
constructor(props) {
	super(props)
	console(this.props)
}
```

如果不接受，会造成构造器中实例this为undefined（参考官方文档）

**一句话概括：构造器使用的话，是否接收传递props，取决于：是否希望在构造器中通过this访问props**

## 函数式组件使用props

因为函数可以传参

```html
<script type="text/babel">
        //创建函数式组件
        function Person(props) {
            const { name, sex, age } = props
            return (
                <ul>
                    <li>姓名：{name}</li>
                    <li>性别：{sex}</li>
                    <li>年龄：{age}</li>
                </ul>
            )
        }
        //对标签属性进行类型，必要性的限制
        Person.propTypes = {
            name: PropTypes.string.isRequired,
            age: PropTypes.number,
            sex: PropTypes.string,
            speak: PropTypes.func //限制speak为函数，注意写法
        }
        //指定默认标签属性值
        Person.defaultProps = {
            sex: '不男不女',
            age: 18
        }
        //渲染组件到页面
        ReactDOM.render(<Person name="Tom" age={20} />, document.getElementById('test2'))
    </script>
```

# 三、组件三大属性-refs 

##  理解

组件内的标签可以定义ref属性来标识自己

## 应用（字符串形式的ref）

自定义组件，功能：

- 点击按钮，提示第一个输入框的值

- 当第二个输入框失去焦点时，提示输入框的值

```html
<script type="text/babel">
        //创建类式组件
        class Person extends React.Component {
            showData1=() => {
            	console.log(this.refs) //{input1: input, input2: input} 自定义value值:标签节点
                const {input1} = this.refs
                alert(input1.value)
            }
            showData2 =() => {
                const {input2} = this.refs
                alert(input2.value)
            }
            render() {
                return (
                    <div>
                        <input ref="input1" type="text" placeholder="点击按钮提示数据" />&nbsp;
                        <button onClick={this.showData1}>点击提示左侧数据</button>&nbsp;
                        <input onBlur={this.showData2} ref="input2" type="text" placeholder="失去焦点提示数据" />
                    </div>
                )
            }
        }
        //渲染组件到页面
        ReactDOM.render(<Person />, document.getElementById('test'))
    </script>
```

**注意：这是字符串形式的ref，已经不再推荐使用（效率不高）。**

## 回调形式的ref

```html
<script type="text/babel">
        //创建类式组件
        class Person extends React.Component {
            showData1 = () => {
                console.log(this.refs); //{input1: input, input2: input}
                const { input1 } = this
                alert(input1.value)
            }
            showData2 = () => {
                const { input2 } = this
                alert(input2.value)
            }
            render() {
                return (
                    <div>
                        <input ref={(currentNode) => { this.input1 = currentNode }} type="text" placeholder="点击按钮提示数据" />&nbsp;
                        <button onClick={this.showData1}>点击提示左侧数据</button>&nbsp;
                        <input ref={(currentNode) => { this.input2 = currentNode }} onBlur={this.showData2} type="text" placeholder="失去焦点提示数据" />
                    </div>
                )
            }
        }
        //渲染组件到页面
        ReactDOM.render(<Person />, document.getElementById('test'))


    </script>
```

回调函数的参数是ref所在的标签节点，只有ref标记的react才会去调用

```html
//利用箭头函数特性进行简写
<input ref={c => this.input1 = c} type="text" placeholder="点击按钮提示数据" />&nbsp;
//这样的不会调用
<input hahahah={() => { console.log(1); }} type="text" placeholder="点击按钮提示数据" />&nbsp;
```

![](http://r1zn5ovlm.hd-bkt.clouddn.com/blog/211104/8cG38L5lel.png?imageslim)

回调形式ref的执行次数问题

内联的回调，渲染时调用一次，但是更新时会调用两次，看代码

```html
<script type="text/babel">
        //创建类式组件
        class Person extends React.Component {
            state = { isHot: true }
            changeWeather = () => {
                const { isHot } = this.state
                this.setState({ isHot: !isHot })

            }
            showData = () => {
                const { input1 } = this
                alert(input1.value)
            }
            render() {
                return (
                    <div>
                        <h2>天气{this.state.isHot ? '炎热' : '凉爽'}</h2>
                        <input ref={c => { this.input1 = c, console.log(c) }} type="text" placeholder="点击按钮提示数据" />&nbsp;
                        <button onClick={this.showData}>点击提示数据</button>
                        <button onClick={this.changeWeather}>更新来看回调ref调用几次</button>
                    </div>
                )
            }
        }
        //渲染组件到页面
        ReactDOM.render(<Person />, document.getElementById('test'))
    </script>
```

当我没进行更新时，只会调用一次。

![](http://r1zn5ovlm.hd-bkt.clouddn.com/blog/211104/i2kmaB940H.png?imageslim)

此时我点击按钮进行更新页面：

![](http://r1zn5ovlm.hd-bkt.clouddn.com/blog/211104/CAEj7244K2.png?imageslim)

可以看到，更新时调用了两次。

![mark](http://r1zn5ovlm.hd-bkt.clouddn.com/blog/211104/dJaAI1B042.png?imageslim)

如何解决？进行类绑定的回调

```html
saveInput = (c) => {
                this.input1 = c
                console.log(c);
            }
{/*进行类绑定类解决 注意：这是jsx语法注释写法{/**/}*/}
<input ref={this.saveInput} type="text" placeholder="点击按钮提示数据" />&nbsp;
```

不过影响不大，日常开发基本都用**内联**，方便一点

## React.createRef()

```html
// React.createRef调用后可以返回一个容器
// 该容器可以存储被ref所标识的节点,该容器是“专人专用”的
myRef = React.createRef() 
<input ref={this.myRef}/>

```

```html
<script type="text/babel">
        //创建类式组件
        class Person extends React.Component {
            myRef = React.createRef()
            showData = () => {
                console.log(this.myRef);
            }   
            render() {
                return (
                    <div>
                        <input ref={this.myRef} type="text" placeholder="点击按钮提示数据" />&nbsp;
                        <button onClick={this.showData}>点击提示数据</button>
                    </div>
                )
            }
        }
        //渲染组件到页面
        ReactDOM.render(<Person />, document.getElementById('test'))
    </script>
```

![mark](http://r1zn5ovlm.hd-bkt.clouddn.com/blog/211104/915A5a2e0C.png?imageslim)

如何取值？

```html
showData = () => {
                console.log(this.myRef.current.value);
            } 
```

注意：

- current的写法是固定的不能改
- React.createRef调用后可以返回一个容器，该容器可以存储被ref所标识的节点,该容器是“**专人专用**”的
- 如果想要多次使用，需要多次创建
- 如果多次使用只创建一个，后面的会覆盖之前的

```
myRef1 = React.createRef()
myRef2 = React.createRef()
<input ref={this.myRef2} type="text" placeholder="点击按钮提示数据" />&nbsp;
<input ref={this.myRef2} type="text" placeholder="点击按钮提示数据" />&nbsp;
```

