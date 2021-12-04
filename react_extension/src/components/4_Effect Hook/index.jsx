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
  /*useEffect传递两个参数
    1、第一个参数为回调函数
    2、第二个参数为一个数组，起到监听作用
    3、不传递第二个参数，componentDidMount 和 componentDidUpdate都会被检测并响应
    4、第二个参数传递的为一个空数组，代表生命周期函数都不会被检测
    5、如果传递的不是空数组，在传的数组中的值发生变化时会监听componentDidUpdate
    6、返回一个函数代表componentWillUnmount生命周期钩子
*/
  React.useEffect(() => {
    console.log(1);
    // setInterval(() => {
    //   setCount((count) => count + 1);
    // }, 1000);
    //componentWillUnomunt
    return () => {
      console.log(1);
    };
  }, [count]);
  const myRef = React.useRef();
  function show() {
    console.log(myRef.current.value);
  }
  return (
    <div>
      <h2>求和为{count}</h2>
      <h2>名字为{name}</h2>
      <input type="text" ref={myRef} />
      <button onClick={add}>点我+1</button>
      <button onClick={change}>点我改名</button>
      <button onClick={show}></button>
    </div>
  );
}
export default Demo;
