/**
 * 钟是志
 * 2019年1月10日
 * 一个Button
 */

import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import styles from './index.less';
import PropTypes from 'prop-types';
import NormalTable from './NormalTable';

export default class ButtonDiy extends Component {


  render(){
    const { handleClick, icon, text, className, type } = this.props;
    return (
      <Button onClick={()=>{handleClick()}}
              className={styles[className]}
              type={type}
      >
        {icon ? <Icon type={icon} /> : null}
        {text}
      </Button>
    );
  }

}
ButtonDiy.propTypes = {
  name: PropTypes.string,
  icon: PropTypes.string,      // icon
  handleClick: PropTypes.func, // click函数
  className: PropTypes.string, // classname
  type: PropTypes.string, // Button type
};
ButtonDiy.defaultProps = {
  icon: 'plus' || '',
  name:  '新建子部门',
  type: 'primary',
  className: 'primaryBlue',
  handleClick: ()=>{console.log('点击')}
};
