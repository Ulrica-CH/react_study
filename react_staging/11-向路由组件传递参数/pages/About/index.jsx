import React, { Component } from 'react';

export default class About extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <h3>我是About的内容</h3>
      </div>
    );
  }
}
