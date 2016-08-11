import React from 'react';
import { Table } from 'antd';

export default class UserList extends React.Component {
  render() {
    var columns = [{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    }];

    var dataSource = [{
      name: '风机',
      age: 18,
    }, {
      name: '大酒店',
      age: 20,
    }];
    return (
      <Table
      columns={columns}
      dataSource={dataSource} 
      />
    );
  }
}