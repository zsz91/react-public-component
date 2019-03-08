/**
 * 选择老师插件
 * */
import { Divider, Modal, Popconfirm } from 'antd';
import React, { Component, Fragment } from 'react';
import ButtonDiy from '../ButtonDiy';
import * as service from '../CascadeSearch/service';
import CascadeSearch from '../CascadeSearch/CascadeSearch';
import StandardTable from '@/components/StandardTable';
import { Link } from 'react-router-dom';

export default class SelectTeacher extends Component {
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
        name: '姓名',
        key: 'name',
        type: 'input',
      },
      {
        name: '所在院系',
        key: 'institutionId',
        type: 'select',
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
    service.searchTeacher(data).then((response) => {
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
    const { config,filedKey,nameKey } = this.props;
    this.props.onChange(record.id, filedKey);
    this.props.onChange(record.name, nameKey);
    this.stateChange('showModal', false);
  };

  render() {
    const { handleOk } = this.props;
    const { showModal, list, pagination, selectedRows } = this.state;
    const columns = [
      {
        title: '工号',
        dataIndex: 'userName',
      },
      {
        title: '姓名',
        dataIndex: 'name',
      },
      {
        title: '性别',
        dataIndex: 'genderName',
      },
      {
        title: '民族',
        dataIndex: 'nation',
      },
      {
        title: '政治面貌',
        dataIndex: 'politicalName',
      },
      {
        title: '现任职务',
        dataIndex: 'postName',
      },
      {
        title: '现获职称',
        dataIndex: 'jobTitleName',
      },
      {
        title: '手机号码',
        dataIndex: 'phone',
      },
      {
        title: '办公电话',
        dataIndex: 'officePhone',
      },
      {
        title: '所在院系',
        dataIndex: 'unitName',
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
              {this.props.value && typeof this.props.nameValue !== 'undefined' ? this.props.nameValue + '　　' : ''}
            </span>
            {this.props.disabled ? null : <ButtonDiy name={'选择'}
                                                     className={'defaultBlue'}
                                                     handleClick={this.showModal}/>}
          </Fragment>
          :
          <Modal title={'选择'}
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

SelectTeacher.propTypes = {};
SelectTeacher.defaultProps = {
  handleOk: () => {
    console.log('ok');
  },
};
