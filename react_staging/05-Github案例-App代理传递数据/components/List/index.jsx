import React, { Component } from 'react';
import './index.css';

export default class List extends Component {
  render() {
    const { users, isFirst, isLoading, err } = this.props;
    return (
      <div className="row">
        {isFirst ? 
          <h2>欢迎您</h2>
         : isLoading ? 
          <h2>搜索中</h2>
         : err ? 
          <h2>{err.message}</h2>
         : 
          users.map((userObj) => {
            return (
              <div className="card" key={userObj.id}>
                <a rel="noreferrer" href={userObj.html_url} target="_blank">
                  <img
                    alt="head"
                    src={userObj.avater_url}
                    style={{ width: '100px' }}
                  />
                </a>
                <p className="card-text">{userObj.login}</p>
              </div>
            );
          })
        }
      </div>
    );
  }
}
