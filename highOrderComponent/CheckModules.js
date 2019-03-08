import React, { Component, Fragment } from 'react';
import { Checkbox } from 'antd';
import CheckModulesItem from './CheckModulesItem';
import AwardConfig from '@/baseComponent/AwardConfig/AwardConfig';
import styles from './CheckModules.less';
import PropTypes from 'prop-types';

const CheckboxGroup = Checkbox.Group;

export default class CheckModules extends Component{
  state = {
    refs:{},
  };

  onRef = (name, component) => {
    this.setState({
      refs: {
        ...this.state.refs,
        [name]: component
      }
    })
  };

  handlerChange = (checkedValues) => {
    this.props.onCheckedChange(checkedValues);
  };

  render() {
    const { modules, defaultCheckedKeys } = this.props;

    return (
      <Fragment>
        <CheckboxGroup onChange={this.handlerChange}
                       style={{width: '100%'}}
                       defaultValue={defaultCheckedKeys}>
          {
            modules.map(item => {
              return (
                <CheckModulesItem key={item.value} checkboxAttr={item}>
                  <AwardConfig {...item} onRef={this.onRef}></AwardConfig>
                </CheckModulesItem>
              )
            })
          }
        </CheckboxGroup>
      </Fragment>
    );
  }
}

CheckModules.propTypes = {
  modules: PropTypes.array,     // 子项配置
  onCheckedChange: PropTypes.func, // checkboxGroup 改变函数
  defaultCheckedKeys: PropTypes.array, // 默认checked状态的 keys
};

CheckModules.defaultProps = {
  onCheckedChange: () => {

  },
  defaultCheckedKeys: ['A'],
  modules: [
    {
      value: 'A',
      title: '基本信息',
      disabled: false,
      type: 'showInfo',
    },
    {
      value: 'B',
      title: '现任职务',
      disabled: false,
      type: 'showInfo',
    },
  ],
};
