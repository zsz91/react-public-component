import React, { Component, Fragment } from 'react';
import { Checkbox } from 'antd';

const CheckboxGroup = Checkbox.Group;

export default class Poor extends Component{
  state = {
    checkedKeys: [],
  };

  render() {
    return (
      <div>
        <CheckboxGroup defaultValue={this.state.checkedKeys} >
          <Checkbox value="poor">
            是家庭经济认证困难学生
          </Checkbox>
        </CheckboxGroup>
      </div>
    );
  }
}
