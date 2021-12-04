import React, { Component } from 'react';

export default class Demo extends Component {
  state = { count: 0 };
  add = () => {
    //setState的对象式写法
    //this.setState是异步的，可以通过callback获取更新后的信息
    // const { count } = this.state;
    // this.setState({ count: count + 1 },() => {
    //     console.log(this.state.count);
    // });

    //setState的函数式写法
    //默认传递state props两个参数
    this.setState((state, props) => {
      return { count: state.count + 1 };
    });

    //简写方式
    this.setState((state) => ({ count: this.state.count + 1 }));
  };
  render() {
    return (
      <div>
        <h2>求和为{this.state.count}</h2>
        <button onClick={this.add}>点我+1</button>
      </div>
    );
  }
}
