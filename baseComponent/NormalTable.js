import React, { Component } from 'react';
import { Table } from 'antd';
import styles from './index.less';
import PropTypes from 'prop-types';

export default class NormalTable extends Component {

  constructor(props) {
    super(props);
    this.state={
      tableId: Math.random().toString(36).substr(2),
      scrollX: 0,
    };
  }

  /**
   * <Table> dom 占得的宽度offsetWidth与计算所得的列宽scrollX
   * 两者进行比较确定Table scroll的值
   */
  componentDidMount() {
    let scrollX = 0;
    for(let item of this.props.columns){
      scrollX = typeof item.width !== 'undefined' ? scrollX + item.width : scrollX + 80;
    }
    const width = document.getElementById(this.state.tableId).offsetWidth;
    if(width < scrollX){
      this.setState({
        scrollX: scrollX,
      });
    }
  }


  render(){
    const { dataSource, columns, rowKey, handleSelectRow, Pagination } = this.props;
    const {scrollX} = this.state;
    return (
          <Table dataSource={dataSource}
                 columns={columns}
                 rowKey={rowKey}
                 id={this.state.tableId}
                 className={styles.NormalTable}
                 pagination={Pagination}
                 scroll={  scrollX > 0 ? { x: scrollX } : {}}
                 rowSelection={{
                   columnWidth: 30,
                   fixed: true,
                   hideDefaultSelections: false,
                   onChange:(selectedRowKeys, selectedRows)=>{handleSelectRow( selectedRowKeys, selectedRows )}
                 }}
          />
    );
  }

}
NormalTable.propTypes = {
  dataSource: PropTypes.array.isRequired, // 表格数据源 To Antd Table
  columns: PropTypes.array.isRequired, // 字段 To Antd Table
  rowKey: PropTypes.string, // rowKey To Antd Table
  handleSelectRow: PropTypes.func, // 选择了一行的回调 To Antd Table
  Pagination:PropTypes.object, // 分页配置 To Antd Pagination
};
NormalTable.defaultProps = {
  rowKey: 'id',
  handleSelectRow: (selectedRowKeys, selectedRows)=>{console.log(selectedRowKeys,selectedRows)},
  Pagination: {
    defaultCurrent: 1,
    total: 20,
    pageSize: 5,
    showQuickJumper: true,
    onChange: (current, size) => {console.log(current, size)},

  },
  dataSource: [
    {
      id: '1',
      name: 'asd',
      code: '1sad',
      level: '2',
      desc: '3',
      operation:'xx',
    },
    {
      id: '2',
      name: 'asd',
      code: '1sad',
      level: '2',
      desc: '3',
      operation:'xx',
    },
    {
      id: '3',
      name: 'asd',
      code: '1sad',
      level: '2',
      desc: '3',
      operation:'xx',
    },
    {
      id: '4',
      name: 'asd',
      code: '1sad',
      level: '2',
      desc: '3',
      operation:'xx',
    },
    {
      id: '5',
      name: 'asd',
      code: '1sad',
      level: '2',
      desc: '3',
      operation:'xx',
    },
  ],
  columns:
    [
      {
        dataIndex: 'id',
        title: 'id',
      },
      {
        dataIndex: 'name',
        title: '名称',
      },
      {
        dataIndex: 'code',
        title: '编码',
        width: 200,
      },
      {
        dataIndex: 'level',
        title: '优先级',
      },
      {
        dataIndex: 'desc',
        title: '描述',
      },
      {
        dataIndex: 'name1',
        title: '名称',
      },
      {
        dataIndex: 'code1',
        title: '编码',
        width: 100,
      },
      {
        dataIndex: 'level1',
        title: '优先级',
      },
      {
        dataIndex: 'desc1',
        title: '描述',
      },
      {
        dataIndex: 'name2',
        title: '名称',
      },
      {
        dataIndex: 'code2',
        title: '编码',
      },
      {
        dataIndex: 'level2',
        title: '优先级',
      },
      {
        dataIndex: 'desc2',
        title: '描述',
      },
      {
        dataIndex: 'operation',
        title: '操作',
      //  fixed: 'right',
        render: (text, record)=>{
          return <span><a href="#">编辑 </a>|<a href="#"> 删除</a></span>
        }
      },
    ],

};
