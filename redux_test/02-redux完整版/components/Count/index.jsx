import React, { Component } from 'react';
import store from '../../redux/store';
import { increment, decrement } from '../../redux/count_action';
export default class Count extends Component {
  state = {};
  //redux只是更改并保存状态，默认不会刷新，所以需要监听，状态更改后，调用render刷新
  //this.setState()默认会调用render
  // componentDidMount() {
  //     store.subscribe(() => {
  //         this.setState({})
  //     })
  // }
  //相加
  increment = () => {
    const { value } = this.selectedValue;
    store.dispatch(increment(value * 1));
  };
  //相减
  decrement = () => {
    const { value } = this.selectedValue;
    store.dispatch(decrement(value * 1));
  };
  //和为基数再相加
  incrementIfOdd = () => {
    const { value } = this.selectedValue;
    const count = store.getState();
    if (count % 2 !== 0) {
      store.dispatch(increment(value * 1));
    }
  };
  //异步相加
  incrementAsync = () => {
    const { value } = this.selectedValue;
    setTimeout(() => {
      store.dispatch(increment(value * 1));
    }, 2000);
  };
  render() {
    return (
      <div>
        <h1>求和为：{store.getState()}</h1>
        <select ref={(c) => (this.selectedValue = c)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        &nbsp;
        <button onClick={this.increment}>+</button>&nbsp;
        <button onClick={this.decrement}>-</button>&nbsp;
        <button onClick={this.incrementIfOdd}>和为基数再相加</button>&nbsp;
        <button onClick={this.incrementAsync}>异步相加</button>
      </div>
    );
  }
}
