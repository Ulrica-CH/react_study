import React, { Component } from 'react';
import './index.css';

export default class Footer extends Component {
  //全选
  handleCheckAll = (e) => {
    this.props.checkAllTodo(e.target.checked);
  };
  //清除所有已完成
  clearAll = () => {
    this.props.clearAllDone();
  };
  render() {
    const { todos } = this.props;
    //已完成总数
    const doneCount = todos.reduce((pre, todo) => pre + (todo.done ? 1 : 0), 0);
    //todo总数
    const total = todos.length;
    return (
      <div className="todo-footer">
        <label>
          <input
            type="checkbox"
            checked={doneCount === total && total !== 0 ? true : false}
            onChange={this.handleCheckAll}
          />
        </label>
        <span>
          <span>已完成{doneCount}</span> / 全部{total}
        </span>
        <button className="btn btn-danger" onClick={this.clearAll}>
          清除已完成任务
        </button>
      </div>
    );
  }
}
