/**
 * 19/03/01 新增
 * 主要用于离校系统特殊的搜索条件
 * 离校系统使用
 * */

import React, { Component } from 'react';
import styles from '../index.less';
import FormArray from '../FormArray';
import PropTypes from 'prop-types';
import * as service from './service';

export default class CascadeSearch2lx extends Component {

  constructor(props) {
    super(props);
    let config = JSON.parse(JSON.stringify(this.props.config)) || [];
    this.state = {
      config: config,
      clazzList: [], // 班级
      leaveBatchIdList: [], // 批次IdList
    };
  }
  formStateChange = (value, key) => {
    this.props.changeValue(value, key);
  };

  getOptions = (response, key = 'id', name = 'name') => {
    if(!response || response.constructor !== Array){
      return [];
    }
    let options = [];
    for (let item of response) {
      options.push(
        {
          key: item[key],
          name:item[name],

        });
    }
    return options;
  };

  componentDidMount() {
    const { config } = this.state;
    for (const item of config) {
      if (item.key === 'clazzId') {  // 班级
        service.getMyClazzes().then((response) => {
          this.setState({
            clazzList: this.getOptions(response, 'id', 'fullName'),
          });
        });
      }else if(item.key === 'leaveBatchId'){ // 批次年度
        service.findAllLeaveBatch().then((response) => {
          for(let item of response){
            item.name = item.year + item.name;
          }
          this.setState({
            leaveBatchIdList: this.getOptions(response, 'id', 'name'),
          });
        });
      }
    }
    this.setState({
      config: config,
    });
  }

  render() {
    const { config,clazzList, leaveBatchIdList } = this.state;
    for (let item of config) {
      switch (item.key) {
        case 'clazzId':
          item.options = clazzList;
          break;
        case 'leaveBatchId':
          item.options = leaveBatchIdList;
          break;
        default:
          break;
      }
    }

    return (
      <FormArray {...this.props}
                 changeValue={this.formStateChange}
                 onSearch={this.getPeopleInfo}
                 config={config}
      />
    );
  }
}
CascadeSearch2lx.propTypes = {
  config: PropTypes.array,
};

CascadeSearch2lx.defaultProps = {
  config: [],

};
