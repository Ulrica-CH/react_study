import React from 'react';
import hello from './Hello.module.css'
class Hello extends React.Component {
  render() {
    return (
      <div>
        <h2 className={hello.title}>Hello react-cli---Hello组件</h2>
      </div>
    );
  }
}
export default Hello;
