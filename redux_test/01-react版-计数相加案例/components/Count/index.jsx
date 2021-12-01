import React, { Component } from 'react';

export default class Count extends Component {
  state = { count: 0 };
  //相加
  increment = () => {
    const { value } = this.selectedValue;
    const { count } = this.state;
    this.setState({ count: count + value * 1 });
  };
  //相减
  decrement = () => {
    const { value } = this.selectedValue;
    const { count } = this.state;
    this.setState({ count: count + value * 1 });
  };
  //和为基数时相加
  incrementIfOdd = () => {
    const { value } = this.selectedValue;
    const { count } = this.state;
    if (count % 2 !== 0) {
      this.setState({ count: count + value * 1 });
    }
  };
  //异步相加
  incrementAsync = () => {
    const { value } = this.selectedValue;
    const { count } = this.state;
    setTimeout(() => {
      this.setState({ count: count + value * 1 });
    }, 2000);
  };
  render() {
    return (
      <div>
        <h1>求和为：{this.state.count}</h1>
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
