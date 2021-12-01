import React, { Component } from 'react';
import { Button, Input } from 'antd';
//引入样式
import 'antd/dist/antd.css';
export default class App extends Component {
  render() {
    return (
      <div>
        <button>点我</button>
        <Button type="primary">Primary Button</Button>
        <Input placeholder="Basic usage" />
      </div>
    );
  }
}
