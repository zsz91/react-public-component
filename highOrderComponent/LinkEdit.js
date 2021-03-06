/**
 * 钟是志
 * 2019年3月1日
 * 用于 Link到一个新页面
 * 一个文字 + 点击文字跳转页面
 * */


import ButtonDiy from '@/baseComponent/ButtonDiy';
import React, { Component, Fragment } from 'react';
import { Link ,hashHistory} from 'dva/router';
import PropTypes from 'prop-types';

export default class LinkEdit extends Component {

  constructor(props) {
    super(props);
    this.state={
    };
  }
  render() {
    const { name, path, record, isNeedRender} = this.props;
    if(isNeedRender && !isNeedRender(record)){
      return null;
    }
    return (
      <Link to={{ pathname: path, state: { currentObj: record,} }} >
        {name}
      </Link>
    );
  }
}
LinkEdit.propTypes = {
  name: PropTypes.string, // 文本名称
  path : PropTypes.string.isRequired, // 路径
  isNeedRender: PropTypes.func, // 是否需要渲染dom  返回false 不渲染
};

LinkEdit.defaultProps = {
  name: '新增',
};
