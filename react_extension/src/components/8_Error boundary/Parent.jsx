import React, { Component } from 'react';
import Child from './Child';
export default class Parent extends Component {
  state = { hasError: '' };
  //生命周期函数，一旦后代组件报错，就会触发
  static getDerivedStateFromError(error) {
    return {
      hasError: error,
    };
  }
  compomentDidCatch() {
    //一般用于统计页面发生的错误，发送请求给后台进行处理
  }
  render() {
    return (
      <div>
        this.state.hasError ? <h2>网络加载缓慢，请等待...</h2> : <Child />
      </div>
    );
  }
}
