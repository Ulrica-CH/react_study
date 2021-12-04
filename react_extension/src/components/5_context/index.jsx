import React, { Component } from 'react';

const MyContext = React.createContext();
export default class A extends Component {
  state = { username: 'jack', age: 20 };
  render() {
    const { username, age } = this.state;
    return (
      <div>
        <h1>我是A组件</h1>
        <h1>我的名字是{this.state.username}</h1>
        <MyContext.Provider value={{ username, age }}>
          <B />
        </MyContext.Provider>
      </div>
    );
  }
}

class B extends Component {
  render() {
    return (
      <div>
        <h3>我是B组件</h3>
        <h3>我从A组件接收名字是</h3>
        <C />
      </div>
    );
  }
}

// class C extends Component {
//   //第一种方式:仅适用于类组件
//   static contextType = MyContext; // 声明接收context
//   render() {
//     return (
//       <div>
//         <h5>我是C组件</h5>
//         <h5>我从A组件接收到的名字是{this.context.username} --- 年龄是{this.context.age}</h5>
//       </div>
//     );
//   }
// }
function C() {
  return (
    <div>
      <h5>我是C组件</h5>
      <MyContext.Consumer>
        {(value) => {
          //   console.log(value);
          return `从A组件接收到的名字是${value.username}`;
        }}
      </MyContext.Consumer>
    </div>
  );
}
