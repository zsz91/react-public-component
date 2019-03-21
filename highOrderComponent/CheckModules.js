import React, { Component, Fragment } from 'react';
import { Checkbox } from 'antd';
import CheckModulesItem from './CheckModulesItem';
import AwardConfig from '@/baseComponent/AwardConfig/AwardConfig';
import styles from './CheckModules.less';
import PropTypes from 'prop-types';

const CheckboxGroup = Checkbox.Group;

export default class CheckModules extends Component{
  state = {

  };

  onRef = (name, component) => {
    const { onRef } = this.props;

    onRef && onRef(name, component);
  };

  onRefFilter = (name, component) => {
    const { onRefFilter } = this.props;

    onRefFilter && onRefFilter(name, component);
  };

  handlerChange = (checkedValues) => {
    this.props.onCheckedChange(checkedValues);
  };

  render() {
    const { modules, value, data } = this.props;

    return (
      <Fragment>
        {/*<CheckboxGroup onChange={this.handlerChange}*/}
                       {/*style={{width: '100%'}}*/}
                       {/*value={value}>*/}
          {
            modules.map(item => {
              return (
                <CheckModulesItem key={item.value} checkboxAttr={item} data={data} onChange={this.props.onChange}>
                  <AwardConfig {...item} onRef={this.onRef} onRefFilter={this.onRefFilter} data={data}></AwardConfig>
                </CheckModulesItem>
              )
            })
          }
        {/*</CheckboxGroup>*/}
      </Fragment>
    );
  }
}

CheckModules.propTypes = {
  modules: PropTypes.array,     // 子项配置
  onCheckedChange: PropTypes.func, // checkboxGroup 改变函数
  value: PropTypes.array, // 默认checked状态的 keys
  data: PropTypes.object, // 获取的数据
};

CheckModules.defaultProps = {
  onCheckedChange: () => {

  },
  value: ['A'],
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
  data: '',
  onRef: ()=>{},
  onRefFilter: ()=>{},
  onChange: () => {},
};
