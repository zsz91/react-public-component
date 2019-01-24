/**
 * 钟是志
 * 2019年1月19日
 * 分页组件 在antd的基础上增加了默认样式
 * */
import { Pagination} from 'antd';
import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class PaginationDiy extends Component {

  render(){
    return (
      <Pagination {...this.props}
      />
    )
  }
}
PaginationDiy.propTypes = {
  style: PropTypes.object,
};
PaginationDiy.defaultProps = {
  style: {textAlign:'center',paddingTop:'40px'},
};
