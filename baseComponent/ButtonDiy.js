/**
 * 钟是志
 * 2019年1月10日
 * 一个Button
 */

import React, { Component,Fragment } from 'react';
import { Button, Icon } from 'antd';
import styles from './index.less';
import PropTypes from 'prop-types';


export default class ButtonDiy extends Component {


  render(){
    const { handleClick, icon, name, className, type ,htmlType, disabled} = this.props;
    return (
      <span className={styles.ButtonDiy}>
      <Button onClick={()=>{handleClick()}}
              className={styles[className]}
              type={type}
              disabled={disabled}
              htmlType={htmlType}
      >
        {icon ? <Icon type={icon} /> : null}
        {name}
      </Button>
    </span>
    );
  }

}
ButtonDiy.propTypes = {
  name: PropTypes.string,
  icon: PropTypes.string,      // icon
  handleClick: PropTypes.func, // click函数
  className: PropTypes.string, // classname
  type: PropTypes.string, // Button type
  htmlType: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool, //
};
ButtonDiy.defaultProps = {
  icon: '', //'plus'
  name:  '新建子部门',
  disabled: false,
  type: 'primary',
  htmlType: 'button',
  loading: false,
  className: '', // primaryBlue = {背景色,边框:蓝色 字体:白色} defaultBlue= {背景色:白色 字体,边框:蓝色} defaultRed = {背景色:白色 字体,边框:红色}

  handleClick: ()=>{console.log('点击')}
};
