/**
 * 钟是志
 * 2019年3月22日
 * 选人插件 在原来的基础上改进
 * 传一个nameKey 和 nameValue={value[info.nameKey]}
 * 用来显示 和保存
 * */

import { Modal } from 'antd';
import React, { Component, Fragment } from 'react';
import ButtonDiy from '../ButtonDiy';
import styles from '../index.less';
import PropTypes from 'prop-types';
import * as service from '../CascadeSearch/service';
import CascadeSearch from '../CascadeSearch/CascadeSearch';
import StandardTable from '@/components/StandardTable';


export default class SelectPeople2 extends Component {
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
        key: 'realname',
        type: 'input',
      },
      {
        name: '部门',
        key: 'deptId',
        type: 'select',
      },
      /*{
        查询
      },*/
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
    service.searchCompany(data).then((response) => {
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
    this.props.onChange(record.realname, nameKey);
    this.stateChange('showModal', false);
  };

  render() {
    const { handleOk } = this.props;
    const { showModal, list, pagination, selectedRows } = this.state;
    const columns = [{
      title: '序号',
      render: (text, record, index) => (index + 1),
    },
      {
        title: '姓名',
        dataIndex: 'realname',
      },
      {
        title: '性别',
        dataIndex: 'genderName',
      },
      {
        title: '部门',
        dataIndex: 'deptName',
      },
      {
        title: '政治面貌',
        dataIndex: 'politicalStatusName',
      },
      {
        title: '职位',
        dataIndex: 'position',
      },
      {
        title: '手机号码',
        dataIndex: 'phone',
      },
      {
        title: '所在单位',
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
          <Modal title={'选择单位'}
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

SelectPeople2.propTypes = {};
SelectPeople2.defaultProps = {
};
