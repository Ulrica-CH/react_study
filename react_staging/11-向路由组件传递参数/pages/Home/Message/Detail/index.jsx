import React, { Component } from 'react';
import qs from 'querystring';
const detailData = [
  { id: '01', title: '11111' },
  { id: '02', title: '2222' },
  { id: '03', title: '3333' },
];
export default class Detail extends Component {
  render() {
    // params参数
    // const { id, title } = this.props.match.params;

    // search参数
    // ?id=01&title=消息一
    // console.log(this.props.location.search);
    // const { search } = this.props.location;
    // const { id, title } = qs.parse(search.slice(1));

    // state参数
    // {id: '01', title: '消息一'}
    // console.log(this.props.location);
    const { id, title } = this.props.location.state || {};

    const findResult = detailData.find((detailobj) => {
      return detailobj.id === id || {};
    });
    return (
      <div>
        <ul>
          <li>ID:{id}</li>
          <li>TITLE:{title}</li>
          <li>CTX:{findResult.title}</li>
        </ul>
      </div>
    );
  }
}
