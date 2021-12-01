//引入UI组件
import CountUI from '../../components/Count';
//引入react-redux中的connect用于连接
import { connect } from 'react-redux';
//引入action
import {
  increment,
  decrement,
  incrementAsyncAction,
} from '../../redux/count_action';
//使用connect()()创建并暴露一个Count的容器组件

/*
    1、mapStateProps函数返回的是一个对象
    2、返回的对象中的key就作为传递给UI组件props的key，value就作为传递给UI组件props的value
    3、mapStateToProps用于传递状态
 */
const mapStateProps = (state) => {
  return { count: state };
};
/*
    1、mapDispatchToProps函数返回的是一个对象
    2、返回的对象中的key就作为传递给UI组件props的key，value就作为传递给UI组件props的value
    3、mapDispatchToProps用于传递操作状态的方法
 */

//state dispatch 都是react-redux调用两个函数默认传递的值，这样就不用我们引入store来进行相关操作
const mapDispatchToProps = (dispatch) => {
  return {
    incrementAction: (data) => {
      dispatch(increment(data));
    },
    decrementAction: (data) => {
      dispatch(decrement(data));
    },
    incrementAsyncAction: (data, time) => {
      dispatch(incrementAsyncAction(data, time));
    },
  };
};

/*
    1、connect是个核心
    2、connect()()
        第一个括号里传递状态和操作状态的方法
        第二个括号是对应的UI组件
*/
export default connect(mapStateProps, mapDispatchToProps)(CountUI);
