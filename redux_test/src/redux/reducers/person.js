//初始化状态 更新redux状态

//引入常量
import { ADD_PERSON } from '../constant';

const initState = [{ id: '1', name: 'tom', age: 20 }];
export default function personReducer(personState = initState, action) {
  const { type, data } = action;
  switch (type) {
    case ADD_PERSON:
      return [data, ...personState];
    default:
      return personState;
  }
}
