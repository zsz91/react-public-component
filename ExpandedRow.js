/**
 * 基于 ant Design 的 Table
 * 2019年1月8日
 * 实现嵌套子表格
 * */
import React, { Component } from 'react';
import { Table, Badge, Icon } from 'antd';
import styles from './index.less';
import PropTypes from 'prop-types';
import EditTable from './EditTable';

export default class ExpandedRow extends Component {
  constructor(props){
    super(props);
    this.state={

    };
  };

  render(){
    const { columns, data, rowKey} = this.props;
      return (
        <Table
          className={styles.components}
          rowKey={rowKey}
          columns={columns}
          dataSource={data}
          pagination={false}
        />
      );
  }

}
ExpandedRow.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  rowKey: PropTypes.string.isRequired,

};
ExpandedRow.defaultProps = {
  data: [],
  columns: [],
  rowKey: 'id',
};


