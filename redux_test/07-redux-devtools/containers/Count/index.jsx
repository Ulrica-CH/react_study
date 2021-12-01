import React, { Component } from 'react';
//引入react-redux中的connect用于连接
import { connect } from 'react-redux';
//引入action
import {
  increment,
  decrement,
  incrementAsyncAction,
} from '../../redux/action/count';
//使用connect()()创建并暴露一个Count的容器组件
class Count extends Component {
  //相加
  increment = () => {
    const { value } = this.selectedValue;
    this.props.incrementAction(value * 1);
  };
  //相减
  decrement = () => {
    const { value } = this.selectedValue;
    this.props.decrementAction(value * 1);
  };
  //和为基数再相加
  incrementIfOdd = () => {
    const { value } = this.selectedValue;
    if (this.props.count % 2 !== 0) {
      this.props.incrementAction(value * 1);
    }
  };
  incrementAsync = () => {
    const { value } = this.selectedValue;
    this.props.incrementAsyncAction(value * 1, 1000);
  };
  render() {
    return (
      <div>
        <h1>求和为：{this.props.count}</h1>
        <h1>person组件中的人员总数为{this.props.pers}</h1>
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

export default connect(
  (state) => ({ count: state.count, pers: state.pers.length }),
  //mapDispatchToProps的一般写法
  /*
  dispatch => ({
     incrementAction:data => dispatch(increment(data)),
     decrementAction:data => dispatch(decrement(data)),
     incrementAsyncAction:(data,time) => dispatch(incrementAsyncAction(data,time))
  })
 */
  //mapDispatchToProps的简写方式
  //react-redux拿到action会自动进行dispatch
  {
    incrementAction: increment,
    decrementAction: decrement,
    incrementAsyncAction: incrementAsyncAction,
  }
)(Count);
