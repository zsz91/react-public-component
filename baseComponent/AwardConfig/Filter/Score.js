import React, { Component } from 'react';
import { Checkbox, InputNumber } from 'antd';
import styles from '../AwardConfigs.less';

const CheckboxGroup = Checkbox.Group;
export default class Score extends Component{

  render() {
    return (
      <div className={styles.filterBox}>
        <CheckboxGroup>
          <div>
            <Checkbox value="1">本学年无挂科</Checkbox>
          </div>
          <div>
            <Checkbox value="2">启用单科成绩</Checkbox>
            <span>
              单科成绩大于等于
              <InputNumber />
              %
            </span>
          </div>
          <div>
            <Checkbox value="3">启用百分制平均成绩</Checkbox>
            <span>
              平均成绩大于等于
              <InputNumber />
              %
            </span>
          </div>
        </CheckboxGroup>
      </div>
    );
  }
}
