import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Detail from './Detail';
export default class Message extends Component {
  state = {
    messageArr: [
      { id: '01', title: '消息一' },
      { id: '02', title: '消息二' },
      { id: '03', title: '消息三' },
    ],
  };
  replace = (id, title) => {
    // replace跳转+携带params参数
    this.props.history.replace(`/home/message/detail/${id}/${title}`);

    // replace跳转+携带search参数
    // this.props.history.replace(`/home/message/detail/?id=${id}&title=${title}`);

    // replace跳转+携带params参数
    // this.props.history.replace(`/home/message/detail`,{id:id,title:title});
  };
  push = (id, title) => [
    // push跳转+携带params参数
    this.props.history.push(`/home/message/detail/${id}/${title}`),

    // push跳转+携带search参数
    // this.props.history.push(`/home/message/detail/?id=${id}&title=${title}`);

    // push跳转+携带state参数
    // this.props.history.push(`/home/message/detail`,{id:id,title:title});
  ];
  render() {
    const { messageArr } = this.state;
    return (
      <div>
        <ul>
          {messageArr.map((msgObj) => {
            return (
              <li key={msgObj.id}>
                {/* 想路由组件传递params参数 */}
                <Link to={`/home/message/detail/${msgObj.id}/${msgObj.title}`}>
                  {msgObj.title}
                </Link>
                <button
                  onClick={() => {
                    this.push(msgObj.id, msgObj.title);
                  }}
                >
                  push查看
                </button>
                <button
                  onClick={() => {
                    this.replace(msgObj.id, msgObj.title);
                  }}
                >
                  replace查看
                </button>
                {/* 想路由组件传递search参数 */}
                {/* <Link to={`/home/message/detail/?id=${msgObj.id}&title=${msgObj.title}`}>{msgObj.title}</Link> */}

                {/* 想路由组件传递search参数 */}
                {/* <Link
                  to={{
                    pathname: '/home/message/detail',
                    state: { id: msgObj.id, title: msgObj.title },
                  }}
                >
                  {msgObj.title}
                </Link> */}
              </li>
            );
          })}
        </ul>
        <hr />
        {/* 接收params参数 */}
        <Route
          path="/home/message/detail/:id/:title"
          component={Detail}
        ></Route>

        {/* search参数无需接收  正常注册路由即可 */}
        {/* <Route path="/home/message/detail" component={Detail}></Route> */}

        {/* state参数无需接收  正常注册路由即可 */}
        {/* <Route path="/home/message/detail" component={Detail}></Route> */}
      </div>
    );
  }
}
