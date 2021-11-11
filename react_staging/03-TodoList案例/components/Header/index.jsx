import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import './index.css';

export default class Header extends Component {
  //对props进行限制
  static propTypes = {
    addTodo: PropTypes.func.isRequired,
  };
  //新增todo
  add = (e) => {
    //解构赋值
    const { target, keyCode } = e;
    //判断是否按下enter键
    if (keyCode !== 13) return;
    if (target.value.trim() === '') {
      alert('输入不能为空');
      return;
    }
    //准备一个todo对象传给App
    const todoObj = { id: nanoid(), name: target.value, done: false };
    //通过props回传给App
    this.props.addTodo(todoObj);
    //清空输入框内容
    target.value = '';
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
}
