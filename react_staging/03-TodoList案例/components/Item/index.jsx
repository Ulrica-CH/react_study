import React, { Component } from 'react';
import './index.css';

export default class Item extends Component {
  state = { mouse: false };
  //鼠标移入高亮
  handleMouse = (flag) => {
    return () => {
      this.setState({ mouse: flag });
    };
  };
  //勾选已完成
  handleCheck = (id) => {
    return (e) => {
      this.props.updateTodo(id, e.target.checked);
    };
  };
  //删除todo
  handleDelete = (id) => {
    this.props.deleteTodo(id);
  };
  render() {
    const { id, name, done } = this.props;
    const { mouse } = this.state;
    return (
      <ul>
        <li
          onMouseEnter={this.handleMouse(true)}
          onMouseLeave={this.handleMouse(false)}
          style={{ backgroundColor: mouse ? '#ddd' : 'white' }}
        >
          <label>
            <input
              type="checkbox"
              checked={done}
              onChange={this.handleCheck(id)}
            />
            <span>{name}</span>
          </label>
          <button
            className="btn btn-danger"
            style={{ display: mouse ? 'block' : 'none' }}
            onClick={() => {
              this.handleDelete(id);
            }}
          >
            删除
          </button>
        </li>
      </ul>
    );
  }
}
