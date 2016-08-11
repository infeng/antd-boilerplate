import React from 'react';
import HelloWorld from '../components/HelloWorld';
import { Link } from 'react-router';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <div><Link to="/">主页</Link></div>
        <div><Link to="/user">用户列表</Link></div>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}