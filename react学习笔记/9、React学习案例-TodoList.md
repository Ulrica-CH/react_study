# 一、案例效果及思路

![](http://cdn.michstabe.cn/blog/211110/df7C1A2Jmd.png?imageslim)

- 当输入待办事项，并Enter后可增加任务到待办事项列表中。
- 点击对号表示已完成，左下角对应显示完成数量
- 可以删除单个任务，可以清除已完成的任务
- 当点击左下角单选框后，表示所有任务都已经完成

## 组件抽离 页面实现：

抽离成输入框所在Header组件，列表List组件，单个任务Item组件，以及底部Footer组件，按公司习惯开发（index.jsx index.css）

![](http://cdn.michstabe.cn/blog/211110/EbG0D5lIlI.png?imageslim)

## 实现思想：

把初始数据放到哪个组件？

- List组件，那么我在Header组件中新增任务后，怎么把状态交给List呢
- 父子组件通信可以props，兄弟组件通信还没学过
- 所以应该把初始状态放到App组件中，这样可以实现三个组件的数据传递
- App传递给List通过props
- Header组件怎么传递数据给App组件？ --- 下面会说

首先在App组件中定义数据并传递List组件

```react
export default class App extends Component {
  state = {
    todos: [
      { id: '001', name: '吃饭', done: 'true' },
      { id: '002', name: '睡觉', done: 'true' },
      { id: '003', name: '打代码', done: 'false' },
    ],
  };
  render() {
    const { todos } = this.state;
    return (
      <div className="todo-container">
        <div className="todo-wrap">
          <Header />
          <List todos={todos} />
          <Footer />
        </div>
      </div>
    );
  }
}
```

List组件通过props接收数据：

```react
export default class List extends Component {
  render() {
    const { todos } = this.props;
    return (
      <ul className="todo-main">
        {todos.map((todo) => {
          return <Item key={todo.id} {...todo} />;
        })}
      </ul>
    );
  }
}

```

但是每个任务的具体信息要通过Item组件显示，所以传递数据给Item

```react
{todos.map((todo) => {
          return <Item key={todo.id} {...todo} />;
        })}
```

主要{...todo}是什么意思。提示：组件三大属性其中一个的知识点

Item组件：

```react
export default class Item extends Component {
  state = { mouse: false };
  handleMouse = (flag) => {
    return () => {
      this.setState({ mouse: flag });
    };
  };
  render() {
    const { name, done } = this.props;
    const { mouse } = this.state;
    return (
      <ul>
        <li>
          <label>
            <input type="checkbox" defaultChecked={done} />
            <span>{name}</span>
          </label>
          <button className="btn btn-danger">
            删除
          </button>
        </li>
      </ul>
    );
  }
}
```

defaultChecked:默认选中，可以通过点击更改选中状态(会有bug，以后改正)

这样数据的初始渲染就完成了。

## 新增待办事项

之前有提到过，把初始状态放到App组件中，那么Header怎么提交数据给App组件呢？

App.jsx

```react
//新增todo事项
  addTodo = (todoObj) => {
    const newTodos = [todoObj, ...this.state.todos];
    this.setState({ todos: newTodos });
  };
<Header addTodo={this.addTodo} />
```

也是通过props，但是传递的是一个函数，Header通过props接收，将数据作为参数返回，就实现了传递数据到App

Header.jsx

```react
add = (e) => {
    //解构赋值
    const { target, keyCode } = e;
    //判断是否按下enter键
    if (keyCode !== 13) return;
    if(target.value.trim() === ''){
      alert('输入不能为空')
      return
    }
    //准备一个todo对象传给App
    const todoObj = { id: nanoid(), name: target.value, done: false };
    //通过props回传给App
    this.props.addTodo(todoObj);
    //清空输入框内容
    target.value = ''
  };

render() {
    return (
      <div className="todo-header">
        <input
          onKeyUp={this.add}
          type="text"
          placeholder="请输入你的任务名称，按回车键确认"
        />
      </div>
    );
  }
```

注意这个子传父数据的实现

nanoid是一个第三方库，可以实现生成不重复唯一标识，适用于id

## 实现鼠标移入高亮 显示删除按钮

两个事件：

onMouseEnter:鼠标移入

onMouseLeave:鼠标移出

思路：

- 给每个li添加事件，事件共用一回调函数，通过flag判断，true为移入，false为移出，回调再次返回函数进行修改初始状态
- style中通过三元表达式控制高亮还是正常，删除按钮同理。

```react
state = { mouse: false };
  handleMouse = (flag) => {
    return () => {
      this.setState({ mouse: flag });
    };
  };
  
<ul>
        <li
          onMouseEnter={this.handleMouse(true)}
          onMouseLeave={this.handleMouse(false)}
          style={{ backgroundColor: mouse ? '#ddd' : 'white' }}
        >
          <label>
            <input type="checkbox" defaultChecked={done} />
            <span>{name}</span>
          </label>
          <button
            className="btn btn-danger"
            style={{ display: mouse ? 'block' : 'none' }}
          >
            删除
          </button>
        </li>
      </ul>
```

思考：为什么handleMouse返回函数，不能直接返回值？

## 点击单选框更新state（点击完成，将state对应的done改为false）

Item组件：

```react
//勾选已完成
  handleCheck = (id) => {
    return (e) => {
      this.props.updateTodo(id, e.target.checked);
    };
  };

<input
              type="checkbox"
              这里要修改为checked 不能用defaultChecked 因为defaultChecked初始化一次，以后不能修改
              checked={done}
              onChange={this.handleCheck(id)}
            />
```

App组件:

```react
//updateTodo用于更新一个todo
  updateTodo = (id, done) => {
    const newTodos = this.state.todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, done: done };
      } else return todo;
    });
    this.setState({ todos: newTodos });
  };

<List
            todos={todos}
            updateTodo={this.updateTodo}
            deleteTodo={this.deleteTodo}
          />
```

## 对props进行限制

npm i prop-types

```react
import PropTypes from 'prop-types';

//对props进行限制
  static propTypes = {
    addTodo: PropTypes.func.isRequired,
  };
```

## 删除一个todo

Item组件

```react
//删除todo
  handleDelete = (id) => {
    this.props.deleteTodo(id);
  };

<button
            className="btn btn-danger"
            style={{ display: mouse ? 'block' : 'none' }}
            onClick={() => {
              this.handleDelete(id);
            }}
          >
            删除
          </button>
```

App组件：

```react
//deleteTodo用于删除一个todo
  deleteTodo = (id) => {
    const newTodos = this.state.todos.filter((todo) => {
      return todo.id !== id;
    });
    this.setState({ todos: newTodos });
  };

<List
            todos={todos}
            updateTodo={this.updateTodo}
            deleteTodo={this.deleteTodo}
          />
```

## Footer todo都勾选已完成 底部同步 实现

Footer组件：

```react
const { todos } = this.props;
    //已完成总数
    const doneCount = todos.reduce((pre, todo) => pre + (todo.done ? 1 : 0), 0);
    //todo总数
    const total = todos.length;

<span>已完成{doneCount}</span> / 全部{total}
```

## Footer全选后 todo为全选择 实现

```react
//全选
  handleCheckAll = (e) => {
    this.props.checkAllTodo(e.target.checked);
  };
  
<input
            type="checkbox"
            这里当todo为空时，底部已完成不应为选中，所以加个total!==0判断
            checked={doneCount === total && total !== 0 ? true : false}
            onChange={this.handleCheckAll}
          />
```

App组件

```react
 //全选todo为已完成
  checkAllTodo = (done) => {
    const newTodos = this.state.todos.map((todo) => {
      return { ...todo, done };
    });
```

## Footer 清除已完成实现

Footer

```react
//清除所有已完成
  clearAll = () => {
    this.props.clearAllDone();
  };
  
<button className="btn btn-danger" onClick={this.clearAll}>
          清除已完成任务
        </button>
```

App

```react
//清除所有已完成任务
  clearAllDone = () => {
    const newTodos = this.state.todos.filter((todo) => {
      return !todo.done;
    });
    this.setState({ todos: newTodos });
  };
```

# 二、总结

拆分组件、实现静态组件，注意：**className、style**的写法

动态初始化列表，如何确定将数据放在哪个组件的state中？
某个组件使用：放在其自身的state中
**某些组件使用：放在他们共同的父组件state中**（官方称此操作为：状态提升）

关于父子之间通信：
【父组件】给【子组件】传递数据：通过props传递
【子组件】给【父组件】传递数据：**通过props传递，要求父提前给子传递一个函数**

注意**defaultChecked 和 checked**的区别，类似的还有：defaultValue 和 value

状态在哪里，操作状态的方法就在哪里

