import { INCREMENT, DECREMENT } from '../constant';
/*
    该文件适用于创建一个为Count组件服务的reducer reducer本质上是一个函数
*/
const initState = 0; // 初始化状态
export default function countReducer(pre = initState, action) {
  const { type, data } = action;
  switch (type) {
    case INCREMENT:
      return pre + data;
    case DECREMENT:
      return pre - data;
    default:
      return pre;
  }
}
