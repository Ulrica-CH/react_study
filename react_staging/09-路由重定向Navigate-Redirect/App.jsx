import React, { Component } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import MyNavLink from './components/MyNavLink';
export default class App extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-offset-2 col-xs-8">
            <div className="page-header">
              <h2>React Router Demo</h2>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-2 col-xs-offset-2">
            <div className="list-group">
              {/* 原生html中，靠<a>跳转到不同页面 */}
              {/* <a className="list-group-item" href="./about.html"> */}

              {/* React中靠路由链接实现切换组件 --- 编写路由链接 */}
              {/* <NavLink className="list-group-item" to="/about">
                About
              </NavLink> */}
              <MyNavLink to="/about" children="About">
                About
              </MyNavLink>
              <MyNavLink to="/home" children="Home">
                Home
              </MyNavLink>

              {/* <NavLink className="list-group-item" to="/home">
                Home
              </NavLink> */}
            </div>
          </div>

          <div className="col-xs-6">
            <div className="panel">
              <div className="panel-body">
                {/* 注册路由 */}
                <Routes>
                  <Route path="/about" element={<About />} />
                  <Route path="/home" index element={<Home />} />
                  <Route index element={<Navigate to="/home" />} />
                </Routes>
                {/* <Navigate to="/about" /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
