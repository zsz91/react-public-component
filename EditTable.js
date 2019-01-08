/**使用antdesign的Table 实现可编辑行
 * 根据Props 确定行数和表头
 * 在点击保存时回调Props的方法
 * **/


import { Table, Input, Popconfirm } from 'antd';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormAssembly from './FormAssembly';



const EditableCell = ({ editable, value, onChange }) => (
  <div>
    {editable
      ? <Input style={{ margin: '-5px 0' }}
               value={value}
               placeholder='请填写'
               onChange={e => onChange(e.target.value)} />
      : value
    }
  </div>
);

export default class EditTable extends Component{

  constructor(props) {
    super(props);
    const data = [];
    const { rowNumber, columns } = this.props;
    for (let i = 0; i < rowNumber; i++) {
      const keys = {};
      for(const item of columns){
        keys[item.dataIndex] = '';
        item.render = (text, record) => this.renderColumns(text, record, item.dataIndex);
      }
      if (i === 0) {
        keys.editable = true;
      }
      data.push({
        key: i.toString(),
        ...keys
      });
    }
    this.state = { data };
    this.cacheData = data.map(item => ({ ...item }));
    this.columns = [
      ...columns,
      {
        title: '修改',
        dataIndex: 'operation',
        render: (text, record) => {
          const { editable } = record;
          return (
            <div className="editable-row-operations">
              {
                editable ?
                  <span>
                  <a onClick={() => this.save(record.key)}> 保存 </a>
                  </span>
                  : <a onClick={() => this.edit(record.key)}> 编辑 </a>
              }
            </div>
          );
        },
      }
    ]
  }

  componentDidCatch(error, errorInfo) {
    console.log(error,errorInfo);
  }

  renderColumns = (text, record, column) => {

    return (
      <EditableCell
        editable={record.editable}
        value={text}
        onChange={value => this.handleChange(value, record.key, column)}
      />
    );
  };

  changeState = (newData, type = 'edit') => {
    this.setState({
      data: newData,
    },() => {
      if(type === 'save'){
        this.props.changeValue(this.state.data,);
      }
    })
  };

  handleChange = (value, key, column) => {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target[column] = value;
      this.changeState(newData);
    }
  };

  edit = (key) => {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target.editable = true;
      this.changeState(newData);
    }
  };

  save = (key) => {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      delete target.editable;
      this.changeState(newData,'save');
      this.cacheData = newData.map(item => ({ ...item }));
    }
  };

  cancel = (key) => {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
      delete target.editable;
      this.changeState(newData);
    }
  };


  render() {
    return <Table columns={this.columns}
                  pagination={false}
                  bordered={true}
                  dataSource={this.state.data} />;
  }
}

EditTable.propTypes = {
  rowNumber: PropTypes.number.isRequired,
  columns: PropTypes.array.isRequired,
  changeValue: PropsTypes.func.isRequired,

};
EditTable.defaultProps = {
  rowNumber: 4,
  columns: [
    { title: '获奖日期',
      dataIndex: 'awardDate',
      width: '15%',
    },
    { title: '奖项名称',
      dataIndex: 'awardName',
      width: '25%',
    },
    { title: '颁奖单位',
      dataIndex: 'awardUnit',
      width: '40%',
    },
  ],
  changeValue: (value)=>{ console.log(value)}
};
