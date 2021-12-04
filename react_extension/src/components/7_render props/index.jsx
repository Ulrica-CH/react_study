import React, { Component } from 'react';

export default class Parent extends Component {
  render() {
    return (
      <div>
        <h1>父组件Parent</h1>
        {/* 传递一个render属性，值是一个函数，函数返回的是一个组件B */}
        <A render={(name) => <B name={name} />}></A>
      </div>
    );
  }
}
class A extends Component {
  state = { name: 'jack' };
  render() {
    return (
      <div>
        <h3>子组件A</h3>
        {/* children props方式来接受 */}
        {/* <h4>{this.props.children}</h4> */}

        {/* 通过this.props.render()来接受，类似于this.props.children */}
        {/* 但是可以传递数据 如this.state.name */}
        <h4>{this.props.render(this.state.name)}</h4>
      </div>
    );
  }
}
class B extends Component {
  render() {
    return (
      <div>
        <h5>孙组件B</h5>
        {/* 接收的name在这里展示 */}
        <h4>{this.props.name}</h4>
      </div>
    );
  }
}
