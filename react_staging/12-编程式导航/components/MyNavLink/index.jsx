import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
export default class MyNavLink extends Component {
  render() {
    // console.log(this.props);
    return (
      <NavLink
        activeclassname="active"
        className="list-group-item"
        {...this.props}
      ></NavLink>
    );
  }
}
