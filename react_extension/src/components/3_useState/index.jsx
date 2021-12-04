import React from 'react';
// export default class Demo extends React.Component {
//   add = () => {
//     this.setState((state, props) => {
//       return { count: state.count + 1 };
//     });
//   };
//   render() {
//     return (
//       <div>
//         <h2>求和为{this.state.count}</h2>
//         <button onClick={this.add}>点我+1</button>
//       </div>
//     );
//   }
// }
function Demo() {
  const [count, setCount] = React.useState(0);
  const [name, setName] = React.useState('tom');
  function add() {
    setCount((count) => count + 1);
  }
  function change() {
    setName((name) => 'jack');
  }
  return (
    <div>
      <h2>求和为{count}</h2>
      <h2>名字为{name}</h2>
      <button onClick={add}>点我+1</button>
      <button onClick={change}>点我改名</button>
    </div>
  );
}
export default Demo;
