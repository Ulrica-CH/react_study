# 一、事件处理

- 通过onXxx属性指定事件处理函数(注意大小写)
  - React使用的是自定义(合成)事件, 而不是使用的原生DOM事件----为了更好的兼容性
  - React中的事件是通过事件委托方式处理的(委托给组件最外层的元素) ----为了的高效
- 通过event.target得到发生事件的DOM元素对象----**不要过度使用ref**
- **发生事件的元素是需要操作的元素时**，可以避免使用`ref`

```html
<script type="text/babel">
        //创建类式组件
        class Person extends React.Component {
            myRef1 = React.createRef()
            myRef2 = React.createRef()
            
            showData1 = () => {
                console.log(this.myRef1.current.value);
            }
            showData2 = (e) => {
                console.log(e.target.value);
            }
            render() {
                return (
                    <div>
                        <input ref={this.myRef1} type="text" placeholder="点击按钮提示数据" />&nbsp;
                        <button onClick={this.showData1}>点击提示数据</button>
                        
                        {/*这种的事件发生对象和取值都是本身，可以使用event.target来获取*/}
                        {/*react执行回调默认传递了event事件对象*/}
                        {/*<input onBlur={this.showData2} ref={this.myRef2} type="text" placeholder="失去焦点提示数据" />&nbsp;*/}
                        <input onBlur={this.showData2} type="text" placeholder="失去焦点提示数据" />&nbsp;
                    </div>
                )
            }
        }
        //渲染组件到页面
        ReactDOM.render(<Person />, document.getElementById('test'))
    </script>
```

```html
//传递的是event事件对象，接受的e是函数的形参，别搞混了
showData2 = (e) => {
                console.log(e.target.value);
            }
<input onBlur={this.showData2} type="text" placeholder="失去焦点提示数据" />&nbsp;
```

# 二、受控组件

- 在 HTML 中，表单元素（如`<input>`、 `<textarea>` 和 `<select>`）通常自己维护 state，并根据用户输入进行更新。
- 而在 React 中，可变状态（mutable state）通常**保存在组件的 state 属性中**，并且只能通过使用 `setState()`来更新。
- 我们可以把两者结合起来，使 React 的 state 成为“唯一数据源”。
- 渲染表单的 **React 组件还控制着用户输入过程中表单发生的操作**。被 React 以这种方式控制取值的表单输入元素就叫做“受控组件”。

```html
<script type="text/babel">
        //创建类式组件
        class Login extends React.Component {
            state = {
                username: "",
                password: ""
            }
            saveUsername = (e) => {
                this.setState({ username: e.target.value })
            }
            savePassword = (e) => {
                this.setState({ password: e.target.value })
            }
            showMessage = (e) => {
                e.preventDefault()
                alert(`用户名：${this.state.username},密码：${this.state.password}`)
            }
            render() {
                return (
                    <form onSubmit={this.showMessage}>
                        用户名: <input type="text" name="username" onChange={this.saveUsername} />
                        密码: <input type="password" name="password" onChange={this.savePassword} />
                        <button>登录</button>
                    </form>
                )
            }
        }

        //渲染组件到页面
        ReactDOM.render(<Login />, document.getElementById('test'))
    </script>
```

- 每当输入框的输入内容发生变化时，都会被**写入到组件的state**中，这种组件在React中被理解为受控组件。
- 受控组件的值，始终是由React的state驱动的。
- 这种组件的数据是**由React组件进行管理的**，所以在大多数情况下，官方推荐使用受控组件。

# 三、非受控组件

- 要编写一个非受控组件，而不是为每个状态更新都编写数据处理函数，你可以[使用 ref](https://link.zhihu.com/?target=https%3A//zh-hans.reactjs.org/docs/refs-and-the-dom.html)来从 DOM 节点中获取表单数据。
- 因为非受控组件将真实数据储存在 DOM 节点中，所以在使用非受控组件时，有时候反而更容易同时集成 React 和非 React 代码。如果你不介意代码美观性，并且希望快速编写代码，使用非受控组件往往可以减少你的代码量。否则，你应该使用受控组件。

```html
 <script type="text/babel">
        //创建类式组件
        class Login extends React.Component {
            showValue =(e) => {
                e.preventDefault()
                alert(`用户名：${this.username.value},密码:${this.password.value}`);
            }
            render() {
                return (
                    <form onSubmit={this.showValue}>
                        用户名: <input type="text" name="username" ref={(c) => this.username = c} />
                        密码: <input type="password" name="password" ref={(c) => this.password = c} />
                        <button>登录</button>
                    </form>
                )
            }
        }

        //渲染组件到页面
        ReactDOM.render(<Login />, document.getElementById('test'))
    </script>
```

- 输入框输入的值，存储在了DOM节点中
- 然后通过ref来获取该DOM节点取值
- **现用现取**

## 总结：

- 页面中所有**输入类的DOM**如果是现用现取的称为非受控组件，
- 而通过setState将输入的值维护到了state中，需要时再从state中取出，这里的数据就受到了state的控制，称为受控组件。

# 四、高阶函数与函数柯里化

看下受控组件的相关代码

```html
saveUsername = (e) => {
     this.setState({ username: e.target.value })
            }
savePassword = (e) => {
     this.setState({ password: e.target.value })
            }
<form onSubmit={this.showMessage}>
	用户名: <input type="text" name="username" onChange={this.saveUsername} />
	密码: <input type="password" name="password" onChange={this.savePassword} />
	<button>登录</button>
</form>
```

如果新增了身份证，手机号等输入选项，难道也要一次绑定事件函数吗？

我们可以使用一个函数，不同输入框传递不同的参数

```html
saveFormdata =(data) => {
	console.log(data);
}
<form onSubmit={this.showMessage}>
	用户名: <input type="text" name="username" onChange={this.saveFormdata('username')} />
	密码: <input type="password" name="password" onChange={this.saveFormdata('password')} />
</form>
```

写成这样，但是却出现了一个问题。

react在执行的时候，这样的写法相当于我们是把saveFormdata函数的返回值赋给了onChange，所以我们此时在输入框输入值是监听不到的，函数已经执行完。怎么解决？

**高阶函数**

```html
saveFormdata = (data) => {
	console.log(data);
	return (e) => {
		console.log(data, e.target.value);
                }
	}
<form onSubmit={this.showMessage}>
	用户名: <input type="text" name="username" onChange={this.saveFormdata('username')} />
	密码: <input type="password" name="password" onChange={this.saveFormdata('password')} />
	<button>登录</button>
</form>
```

![mark](http://r1zn5ovlm.hd-bkt.clouddn.com/blog/211105/Hf6718Edjc.png?imageslim)

此时我们拿到数据了，如果要进行setState怎么写呢？

```html
return (e) => {
	this.setState({data:e.target.value});
	}
```

![mark](http://r1zn5ovlm.hd-bkt.clouddn.com/blog/211105/g0j5dje77K.png?imageslim)

所以这种写法是不对的，要使用对象属性

![mark](http://r1zn5ovlm.hd-bkt.clouddn.com/blog/211105/4aJjBE1m4i.png?imageslim)

关于对象属性：

```html
<script>
        let a = 1
        let b = 2
        let obj = {}
        obj.c = 3
        obj[a] = 4
        console.log(obj); //{1: 4, c: 3}
    </script>
```

什么是高阶函数？

若A函数，接收的参数是一个函数，那么A就可以成为高阶函数。

若A函数，调用的返回值仍然是一个函数，那么A就可以称之为高阶函数。

向上面那种情况，saveFormdata调用的返回值是一个函数，那么saveFormdata就是一个高阶函数。

之前我们在节点标签里执行回调函数的时候，有说过不要加小括号，类似这样

```html
onChange={this.saveFormdata('username')
```

那么现在我们可以换一种说法：**可以加小括号，但要保证返回值是一个函数**

可以想一下，我们正常不加小括号时，我们是直接将函数赋值给了onChange，那在执行的时候，是执行的函数，就不会有问题了

# 五、函数柯里化

通过**函数调用且继续返回函数**的方式，实现**多次接收参数但最后一次统一处理**的函数编码方式

简单例子：

```html
<script>
function sum(a, b, c) {
            return a + b + c
        }
        console.log(sum(1, 2, 3)); //6

        function sum2(a) {
            return (b) => {
                return (c) => {
                    return a + b + c

                }
            }
        }
        console.log(sum2(1)(2)(3)); //6
</script>
```

看我们的代码

```html
saveFormdata = (data) => {
	console.log(data);
	return (e) => {
		this.setState({[data]:e.target.value});
                }
	}
```

saveFormdata是函数柯里化实现吗？

是，因为saveFormdsata调用且返回了函数，并且最后进行了统一处理。

更多细节可以自行了解下。

# 六、来点秀的，不用高阶函数及柯里化去实现受控组件

我们还是要明白：

- onChange接收的一定要是一个函数
- React执行回调会传递事件对象event
- 这两天就可以了

代码改下：

```html
saveFormdata = (data, e) => {
	this.setState({ [data]: e.target.value });
	}
<form onSubmit={this.showMessage}>
	用户名: <input type="text" name="username" onChange={(event) => { this.saveFormdata('username', event) }} />
	密码: <input type="password" name="password" onChange={(event) => { this.saveFormdata('password', event) }} />
	<button>登录</button>
</form>
```

来看下：

- onChange是不是接受的函数？() => {}
- 那么react执行回调是不是传递event给这个函数，我这个函数再去调用saveFormdata去执行后续操作
- 没毛病，6