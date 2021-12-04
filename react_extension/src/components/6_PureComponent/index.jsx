import React, { PureComponent } from 'react';

export default class A extends PureComponent {
  state = { carname: 'BWM' };
  change = () => {
    this.setState({});
  };
  render() {
    console.log('A组件渲染');
    return (
      <div>
        <h2>车名：{this.state.carname}</h2>
        <button onClick={this.change}>点我换车</button>
        <B />
      </div>
    );
  }
}

class B extends PureComponent {
  render() {
    console.log('B组件渲染');
    return <div></div>;
  }
}
