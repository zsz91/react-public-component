/**
 * 19/03/01 新增
 * 主要用于离校系统特殊的搜索条件
 * 离校系统使用
 * */

import React, { Component } from 'react';
import styles from '../baseComponent/index.less';
import FormArray from '../FormArray';

export default class FormArrayForOld extends Component {

  constructor(props) {
    super(props);

  }

  formStateChange = () => {

  };




  render() {
    return (
      <FormArray {...this.props}
                 changeValue={this.formStateChange}
                 onSearch={this.getPeopleInfo}
                 config={config}
      />
    );
  }
}
