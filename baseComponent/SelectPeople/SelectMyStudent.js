/**
 * 选择当前用户(辅导员)下的所有学生插件
 * */
import { Divider, Modal, Popconfirm } from 'antd';
import React, { Component, Fragment } from 'react';
import ButtonDiy from '../ButtonDiy';
import * as service from '../CascadeSearch/service';
import CascadeSearch from '../CascadeSearch/CascadeSearch';
import StandardTable from '@/components/StandardTable';

export default class SelectMyStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      formValues: {},
      selectedRows: [],
      pagination: {
        current: 1,
        total: 1,
        pageSize: 10,
        showQuickJumper: true,
        onChange: (current, size) => {
          this.pageChange(current, size);
        },
      },
    };
  }

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  formStateChange = (value, key) => {
    let oldValue = this.state.formValues;
    oldValue[key] = value;
    this.setState({
      formValues: oldValue,
    });
  };

  showModal = () => {
    this.setState(
      {
        showModal: true,
      },
    );
  };

  pageChange = (current, size) => {
    this.setState({
      pagination: {
        ...this.state.pagination,
        current: current,
        pageSize: size,
      },
    }, () => {
      this.getPeopleInfo();
    });
  };

  componentDidMount() {
    this.getPeopleInfo();
  }

  searchDom = () => {
    let config = [
      {
        name: '学号',
        key: 'studentNo',
        type: 'input',
      },
      {
        name: '姓名',
        key: 'name',
        type: 'input',
      },
    ];
    return (
      <CascadeSearch config={config}
                     value={this.state.formValues}
                     changeValue={this.formStateChange}
                     nameSpan={{ big: 5, small: 7 }}
                     fileSpan={{ big: 3, small: 3 }}
      />
    );

  };

  getPeopleInfo = () => {
    const { pagination, formValues } = this.state;
    const data = {
      ...formValues,
    };
    data.pageSize = pagination.pageSize;
    data.pageNo = pagination.current;
    service.searchMyStudent(data).then((response) => {
      pagination.total = response.total;
      this.setState({
        list: response.rows,
        pagination: pagination,
      });
    });
  };

  stateChange = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  handleSelect = (record) => {
    const { config } = this.props;
    for (let item of config) {
      if (item.tansformKey && typeof record[item.tansformKey] !== 'undefined') {
        this.props.onChange(record[item.tansformKey], item.key);
      } else if (typeof record[item.key] !== 'undefined') {
        this.props.onChange(record[item.key], item.key);
      }
    }
    this.stateChange('showModal', false);
  };

  render() {
    const { handleOk } = this.props;
    const { showModal, list, pagination, selectedRows } = this.state;
    const columns = [{
    title: '序号',
    render: (text, record,index) => (index+1),
  },
      {
        title: '学号',
        dataIndex: 'studentNo',
      },
      {
        title: '姓名',
        dataIndex: 'name',
        render: (text) => {
          return (<div dangerouslySetInnerHTML={{ __html: text }}/>);
        },
      },
      {
        title: '性别',
        dataIndex: 'genderName',
      },
      {
        title: '民族',
        dataIndex: 'nationName',
      },
      {
        title: '政治面貌',
        dataIndex: 'politicalName',
      },
      {
        title: '院系',
        dataIndex: 'institutionName',
      },
      {
        title: '专业',
        dataIndex: 'majorName',
      },
      {
        title: '班级',
        dataIndex: 'clazzName',
      },
      {
        title: '手机号码',
        dataIndex: 'phone',
      },
      {
        title: '操作',
        render: (text, record) => {
          return (<a onClick={() => {
            this.handleSelect(record);
          }}>选择</a>);
        },
      },
    ];
    return (
      <Fragment>
        {!showModal ?
          <Fragment>
            <span>
              {this.props.value && typeof this.props.value.name !== 'undefined' ? this.props.value.name + '　　' : ''}
            </span>
            {this.props.disabled ? null : <ButtonDiy name={'选择学生'}
                                                     className={'defaultBlue'}
                                                     handleClick={this.showModal}/>}

          </Fragment>
          :
          <Modal title={'选择学生'}
                 visible={true}
                 width={1200}
                 maskClosable={false}
                 footer={null}
                 onCancel={() => {
                   this.stateChange('showModal', false);
                 }}>
            <div style={{ overflowY: 'auto', maxHeight: '500px' }}>
              {this.searchDom()}
              <div style={{ height: '54px', padding: '12px 0 12px 12px', float: 'right' }}>
                <ButtonDiy name='查询'
                           handleClick={this.getPeopleInfo}/>
              </div>
              <div style={{ height: '30px' }}></div>
              <StandardTable
                rowKey="id"
                selectedRows={selectedRows}
                data={{ list: list, pagination: pagination }}
                columns={columns}
                onSelectRow={this.handleSelectRows}
                noSelectRow={true}
              />
            </div>
          </Modal>
        }
      </Fragment>
    );
  }
}

SelectMyStudent.propTypes = {};
SelectMyStudent.defaultProps = {
  handleOk: () => {
    console.log('ok');
  },
};
