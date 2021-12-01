/*
    该文件专门用于暴露一个store对象，整个应用只有一个store对象
 */

//引入createStore，专门用于创建redux中最为核心的store对象
import { createStore, applyMiddleware } from 'redux';
//引入整合的reducer
import allReducers from './reducers/index'
//引入redux-devtools
import { composeWithDevTools } from 'redux-devtools-extension';
//引入thunk
import thunk from 'redux-thunk';
//暴露store
export default createStore(
  allReducers,
  composeWithDevTools(applyMiddleware(thunk))
);
