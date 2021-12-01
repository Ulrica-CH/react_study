# 一、虚拟DOM

vue和react都实现了虚拟DOM，来提高性能。

首先会创建虚拟DOM对象，然后转换为真实DOM，在渲染页面

那在我进行状态数据更新时

新旧虚拟DOM会进行差异对比

然后根据差异更新DOM，在进行局部的页面重绘

# 二、验证Diffing算法的存在

```html
<script type="text/babel">
        //创建类式组件
        class Time extends React.Component {
            state = { date: new Date() }

            componentDidMount() {
                setInterval(() => {
                    this.setState({
                        date: new Date()
                    })
                },1000)
            }
            render() {
                return (
                    <div>
                        <h1>hello</h1>
                        <input type="text"/>
                        <span>现在是:{this.state.date.toTimeString()}</span>
                    </div>
                )
            }
        }
        //渲染组件到页面
        ReactDOM.render(<Time />, document.getElementById('test'))
    </script>
```

页面效果：

![](http://r1zn5ovlm.hd-bkt.clouddn.com/blog/211109/6jgkKFLH33.png?imageslim)

![](http://r1zn5ovlm.hd-bkt.clouddn.com/blog/211109/9cgI17k5he.png?imageslim)

时间是不断在更新的，也就是进行了重新渲染，但是input框内的内容没有发生变化，这也就验证了Divff算法存在

而且可以的，Diff算法对比的最小单位是标签，比如span

那可能有疑问，span中加入input，会更新吗？

```html
<span>现在是:{this.state.date.toTimeString()}
<input type="text" />
</span>
```

![](http://r1zn5ovlm.hd-bkt.clouddn.com/blog/211109/iEB158Gl6F.png?imageslim)

![](http://r1zn5ovlm.hd-bkt.clouddn.com/blog/211109/j9fl0IJce3.png?imageslim)

时间在变化，可是span中的input中的内容没有改变，

**可以说明，虽然比对最小单位是span，但会进行层次比对，不会到span就截至，会递归比对**





# 三、一道面试题

- react/vue中的key有什么作用？（key的内部原理是什么？）
- 或者为什么遍历列表时，key最好不要用index?

首先来看key的作用：

简单地说：key是虚拟DOM对象的标识，在更新显示时key起着极其重要的作用。

详细的说：当状态中的数据发生变化时，react会根据【新数据】生成【新的虚拟DOM】，随后react进行【新虚拟DOM】与【旧虚拟DOM】的diff比对，比较规则：

- 1、旧虚拟DOM中找到了与新虚拟DOM相同的key：
  - 若虚拟DOM中内容没变，直接使用之前的真实DOM
  - 若虚拟DOM中内容变了，则生成新的真实DOM，随后替换掉页面中的之前的真实DOM

- 2、旧虚拟DOM中未找到与新虚拟DOM相同的key
  - 根据数据创建新的真实DOM，随后渲染到页面

用index作为key可能引发的问题：

- 若对数据进行逆序添加，逆序删除等破坏顺序操作：
  - 会产生没有必要的真实DOM更新 ==> 界面效果没问题，但是效率低

- 如果结构中还包含输入类的DOM：
  - 会产生错误的DOM更新 ==> 界面有问题

**注意！如果不存在对数据的逆序添加删除等破坏数据操作，仅用于渲染列表用于展示，使用index作为key是没有问题的。**

ok，show me code

```html
<script type="text/babel">
        //创建类式组件
        class Person extends React.Component {
            state = {
                persons: [
                    { id: 1, name: '小张', age: 18 },
                    { id: 2, name: '小李', age: 19 }
                ]
            }
            add = () => {
                const { persons } = this.state
                const p = { id: persons.length + 1, name: '小王', age: 20 }
                this.setState({ persons: [p, ...persons] })
            }

            render() {
                return (
                    <div>
                        <h2>展示人员信息</h2>
                        <button onClick={this.add}>添加一个小王</button>
                        <ul>
                            {
                                this.state.persons.map((personObj, index) => {
                                    return <li key={index}>{personObj.name} --- {personObj.age}</li>
                                })
                            }
                        </ul>
                    </div>
                )
            }
        }
        //渲染组件到页面
        ReactDOM.render(<Person />, document.getElementById('test'))
    </script>
```

![](http://r1zn5ovlm.hd-bkt.clouddn.com/blog/211109/F1h5Fc7lF3.png?imageslim)

当我点击按钮：

![](http://r1zn5ovlm.hd-bkt.clouddn.com/blog/211109/JaKaGiI0C8.png?imageslim)

没什么问题，但是这背后发生了很大性能浪费。

但是我们进行下慢动作回放：

慢动作回放----使用index索引值作为key

 

```html
初始数据：
{id:1,name:'小张',age:18},
{id:2,name:'小李',age:19},

初始的虚拟DOM：
<li key=0>小张---18<input type="text"/></li>
<li key=1>小李---19<input type="text"/></li>

更新后的数据：
{id:3,name:'小王',age:20},
{id:1,name:'小张',age:18},
{id:2,name:'小李',age:19},

更新数据后的虚拟DOM：
<li key=0>小王---20<input type="text"/></li>
<li key=1>小张---18<input type="text"/></li>
<li key=2>小李---19<input type="text"/></li>
```

还记得我们的比较规则吗？

- a. 旧虚拟DOM中找到了与新虚拟DOM相同的key：
  - 若虚拟DOM中内容没变, 直接使用之前的真实DOM
  - 若虚拟DOM中内容变了, 则生成新的真实DOM，随后替换掉页面中之前的真实DOM

- b. 旧虚拟DOM中未找到与新虚拟DOM相同的key
  - 根据数据创建新的真实DOM，随后渲染到到页面

对比key =0 小王不等于小张，生成新的真实DOM渲染

对比key =1 小张不等于小李，生成新的真实DOM渲染

找不到key = 3 生成DOM渲染到页面

ok 先到这 我们来看一下以id作为key

```html
<ul>
	{
		this.state.persons.map((personObj)=>{
			return <li key={personObj.id}>{personObj.name}---{personObj.age}</li>
			})
	}
</ul>
```

```html
慢动作回放----使用id唯一标识作为key

初始数据：
{id:1,name:'小张',age:18},
{id:2,name:'小李',age:19},
初始的虚拟DOM：
<li key=1>小张---18<input type="text"/></li>
<li key=2>小李---19<input type="text"/></li>

更新后的数据：
{id:3,name:'小王',age:20},
{id:1,name:'小张',age:18},
{id:2,name:'小李',age:19},
更新数据后的虚拟DOM：
<li key=3>小王---20<input type="text"/></li>
<li key=1>小张---18<input type="text"/></li>
<li key=2>小李---19<input type="text"/></li>
```

对比key =1 小张等于小张，使用之前的真实DOM

对比key =2 小李等于小李，使用之前的真实DOM

找不到key = 3 生成DOM渲染到页面

**对比这两个以index作为key和以id作为key，可以看出以id作为key效率更高**

**这是三个数据，如果300万个数据呢？**

**所以尽量不要以index作为key**



再看另外index作为key引发的问题

如果结构中还包含输入类的DOM：

- 会产生错误的DOM更新 ==> 界面有问题

```html
<h2>展示人员信息</h2>
<button onClick={this.add}>添加一个小王</button>
<h3>使用index（索引值）作为key</h3>
 <ul>
	{
		this.state.persons.map((personObj, index) => {
			return <li key={index}>{personObj.name}---{personObj.age}<input type="text" /></li>
 			})
     }
</ul>
<hr />
<hr />

<h3>使用id（数据的唯一标识）作为key</h3>
<ul>
	{
		this.state.persons.map((personObj) => {
			return <li key={personObj.id}>{personObj.name}---{personObj.age}<input type="text" /></li>
		})
	}
</ul>
```

首先我现在输入框输入内容：

![](http://r1zn5ovlm.hd-bkt.clouddn.com/blog/211109/lKIeA80IaF.png?imageslim)

添加小王以后的信息显示：

![](http://r1zn5ovlm.hd-bkt.clouddn.com/blog/211109/i6FhjE5fDj.png?imageslim)

看出差异了吗？

index作为key 中的input框的内容错乱

id作为key 中的input框正常

为什么？

index中key=0 key=1 input复用 内容不变，但是前面的内容重新生成了真实DOM，内容自然对不上

id中key = 0 key = 1 input框复用，前面内容复用，使用之前的真实DOM key =3新增

不理解看看上面规则

**总结：如果不存在对数据的逆序添加删除等破坏数据操作，仅用于渲染列表用于展示，使用index作为key是没有问题的，尽量不使用**

