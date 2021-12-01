import { INCREMENT, DECREMENT } from '../constant';
//action返回的是一个Object 为同步action
export const increment = (data) => ({ type: INCREMENT, data });
export const decrement = (data) => ({ type: DECREMENT, data });
//action返回的是一个Function 为异步action
export const incrementAsyncAction = (data, time) => {
  return (dispatch) => {
    setTimeout(() => {
      //异步任务有了结果以后，分发一个同步action 去真正操作数据
      dispatch(increment(data));
    }, time);
  };
};
