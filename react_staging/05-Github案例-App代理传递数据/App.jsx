import React, { Component } from 'react';
import Search from './components/Search';
import List from './components/List';
export default class App extends Component {
  state = {
    users: [],
    //首次页面显示
    isFirst: true,
    //请求时显示
    isLoading: false,
    //错误页面显示
    err: '',
  };
  //通过状态对象更新组件状态
  updateStates = (updateObj) => {
    this.setState(updateObj);
  };
  render() {
    return (
      <div>
        <Search updateStates={this.updateStates} />
        <List {...this.state} />
      </div>
    );
  }
}
