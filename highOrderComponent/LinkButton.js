/**
 * 钟是志
 * 2019年3月1日
 * 用于 Link到一个新页面
 * 一个按钮 + 点击按钮跳转页面
 * */


import ButtonDiy from '@/baseComponent/ButtonDiy';
import React, { Component, Fragment } from 'react';
import { Link ,hashHistory} from 'dva/router';
import PropTypes from 'prop-types';

export default class LinkButton extends Component {

  constructor(props) {
    super(props);
    this.state={
    };
  }
  render() {
    const { name, className, path} = this.props;
    return (
        <Link to={path}>
        <ButtonDiy name={name}
                   className={className}
        />
        </Link>
     );
  }
}
LinkButton.propTypes = {
  name: PropTypes.string, // 按钮名称
  className: PropTypes.string, // 按钮样式
  path : PropTypes.string.isRequired, // 跳转url
};

LinkButton.defaultProps = {
  name: '新增',
  className: 'primaryBlue',
};
