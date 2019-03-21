import React, { Component } from 'react';
import { Checkbox, InputNumber } from 'antd';
import styles from '../AwardConfigs.less';

const CheckboxGroup = Checkbox.Group;
export default class Ranking extends Component{

  render() {
    return (
      <div className={styles.filterBox}>
        <CheckboxGroup>
          <div>
            <Checkbox value="1">启用综合考评成绩</Checkbox>
            <span>
               综合考评成绩大于等于
              <InputNumber />
            </span>
          </div>
          <div>
            <Checkbox value="2">启用专业/年级成绩排名</Checkbox>
            <span>
              专业/年级成绩排名小于等于
              <InputNumber />
              %
            </span>
          </div>
          <div>
            <Checkbox value="3">启用综合考评成绩排名</Checkbox>
            <span>
              综合考评成绩排名小于等于
              <InputNumber />
              %
            </span>
          </div>
        </CheckboxGroup>
      </div>
    );
  }
}
