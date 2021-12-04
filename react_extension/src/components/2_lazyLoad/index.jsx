import React, { Component, lazy, Suspense } from 'react';
import { Route, Switch, Redirect, Link } from 'react-router-dom';
//懒加载方式加载路由
const Home = lazy(() => import('../Home'));
const About = lazy(() => import('../About'));
export default class Lazy extends Component {
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
              <Link to="/about" children="About">
                About
              </Link>
              <Link to="/home" children="Home">
                Home
              </Link>
            </div>
          </div>

          <div className="col-xs-6">
            <div className="panel">
              <div className="panel-body">
                {/* 注册路由 */}
                {/* Suspense中的fallback用于指定懒加载路由组件时的显示 */}
                <Suspense fallback={<h1>Loading</h1>}>
                  <Switch>
                    <Route path="/about" component={About} />
                    <Route path="/home/" component={Home} />
                    <Redirect to="/home" />
                  </Switch>
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
