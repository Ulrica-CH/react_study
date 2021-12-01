//引入为Count组件服务的reducer
import Count from './count';
//引入为Person组件服务的reducer
import Person from './person';
//引入combineReducers，用于组合reducers
import { combineReducers } from 'redux';
//组合reducers为一个对象
export default combineReducers({
  Count,
  Person,
});
