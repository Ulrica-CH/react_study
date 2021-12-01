import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPerson } from '../../redux/action/person';

class Person extends Component {
  addPerson = () => {
    const name = this.nameNode.value;
    const age = this.ageNode.value;
    const personObj = { id: new Date(), name, age };
    this.props.addPerson(personObj);
    this.nameNode.value = '';
    this.ageNode.value = '';
  };

  render() {
    return (
      <div>
        <h2>我是Person组件,上方组件求和为{this.props.count}</h2>
        <input
          ref={(c) => (this.nameNode = c)}
          type="text"
          placeholder="输入名字"
        />
        <input
          ref={(c) => (this.ageNode = c)}
          type="text"
          placeholder="输入年龄"
        />
        <button onClick={this.addPerson}>添加</button>
        <ul>
          {this.props.pers.map((p) => {
            return (
              <li key={p.id}>
                {p.name}--{p.age}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default connect(
  (state) => ({ pers: state.pers, count: state.count }), //映射状态
  { addPerson: addPerson } //映射操作状态的方法
)(Person);
