/*
    该文件专门用于暴露一个store对象，整个应用只有一个store对象
 */

//引入createStore，专门用于创建redux中最为核心的store对象
import { createStore, applyMiddleware, combineReducers } from 'redux';
//引入为Count组件服务的reducer
import countReducer from './reducers/count';
//引入为Person组件服务的reducer
import personReducer from './reducers/person';
//引入thunk
import thunk from 'redux-thunk';
//组合reducers为一个对象
const allReducers = combineReducers({
  count: countReducer,
  pers: personReducer,
});
//暴露store
export default createStore(allReducers, applyMiddleware(thunk));
