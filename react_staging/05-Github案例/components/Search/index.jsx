import React, { Component } from 'react';
import axios from 'axios';

export default class Search extends Component {
  search = () => {
    const {
      keyWordElement: { value: keyWord },
    } = this;
    //发起请求前loading
    this.props.updateStates({ isFirst:false, isLoading: true });
    axios.get(`/api1/search/users?q=${keyWord}`).then(
      (res) => {
          //请求数据成功显示数据
        this.props.updateStates({ isLoading: false, users: res.data.items });
      },
      (err) => {
          //失败后获取失败信息
        this.props.updateStates({isLoading:false,err});
      }
    );
  };
  render() {
    return (
      <section className="jumbotron">
        <h3 className="jumbotron-heading">Search Github Users</h3>
        <div>
          <input
            type="text"
            placeholder="请输入github用户名字"
            ref={(c) => (this.keyWordElement = c)}
          />
          &nbsp;<button onClick={this.search}>搜索</button>
        </div>
      </section>
    );
  }
}
