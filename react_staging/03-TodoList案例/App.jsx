import React, { Component } from 'react';
import Header from './components/Header';
import List from './components/List';
import Footer from './components/Footer';
import './App.css';

export default class App extends Component {
  state = {
    todos: [
      { id: '001', name: '吃饭', done: 'true' },
      { id: '002', name: '睡觉', done: 'true' },
      { id: '003', name: '打代码', done: 'false' },
    ],
  };
  //新增todo事项
  addTodo = (todoObj) => {
    const newTodos = [todoObj, ...this.state.todos];
    this.setState({ todos: newTodos });
  };
  //updateTodo用于更新一个todo
  updateTodo = (id, done) => {
    const newTodos = this.state.todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, done: done };
      } else return todo;
    });
    this.setState({ todos: newTodos });
  };
  //deleteTodo用于删除一个todo
  deleteTodo = (id) => {
    const newTodos = this.state.todos.filter((todo) => {
      return todo.id !== id;
    });
    this.setState({ todos: newTodos });
  };
  //全选todo为已完成
  checkAllTodo = (done) => {
    const newTodos = this.state.todos.map((todo) => {
      return { ...todo, done };
    });
    this.setState({ todos: newTodos });
  };
  //清除所有已完成任务
  clearAllDone = () => {
    const newTodos = this.state.todos.filter((todo) => {
      return !todo.done;
    });
    this.setState({ todos: newTodos });
  };
  render() {
    const { todos } = this.state;
    return (
      <div className="todo-container">
        <div className="todo-wrap">
          <Header addTodo={this.addTodo} />
          <List
            todos={todos}
            updateTodo={this.updateTodo}
            deleteTodo={this.deleteTodo}
          />
          <Footer todos={todos} checkAllTodo={this.checkAllTodo} clearAllDone={this.clearAllDone} />
        </div>
      </div>
    );
  }
}
