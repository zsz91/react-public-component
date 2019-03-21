/**
 * 钟是志
 * 2019年2月26日
 * 用于 弹出提示信息 确认用户是否执行XXX操作
 * 一个按钮 + 点击按钮显示的提示
 * 点确定 调接口->关闭弹窗 刷新页面
 * */
import ButtonDiy from '@/baseComponent/ButtonDiy';
import React, { Component, Fragment } from 'react';
import { message, Modal  } from 'antd';
import PropTypes from 'prop-types';
import * as service from './Service';

export default class ModalConfirm extends Component {

  handleConfirm = () => {
    const { selectRows,name, contentSentence, onlyOne, checkSelectRow } = this.props;
    if(!selectRows.length){
        message.warning('请至少选择一条数据');
        return false;
    }
    if(onlyOne && selectRows.length > 1){
      message.warning('只能选择一条数据进行操作');
      return false;
    }
    if(checkSelectRow){
      let res = checkSelectRow(selectRows);
      if(res && res.result === false){
        message.warning(res.info);
        return false;
      }

    }
    Modal.confirm({
      title: name,
      content: contentSentence,
      onOk: this.handleOk,
      okText: '确定',
      cancelText: '取消',
    });

  };

  handleOk = () => {
    const { selectRows, postKey, sourceKey, url, responseCallBack, getPage,fields, beforeUpdate } = this.props;
    let data = {};
    if(fields){
      data  = {...fields};
    }
    data[postKey] = selectRows.map( (item) => {
      return item[sourceKey];
    });
    data[postKey] = data[postKey].join(',');
    if(beforeUpdate){
      data = beforeUpdate(data,selectRows);
    }
    service.addOrUpdate(data,url).then((response) => {
      if(responseCallBack && !responseCallBack(response)){
        return false;
      }
      if(!response){
        return false;
      }else{
        message.success('操作成功');
        getPage();
      }
    });
  };

  render() {
    const { name, className } = this.props;
    return (
      <Fragment>
        <ButtonDiy name={name}
                   className={className}
                   handleClick={this.handleConfirm}/>
      </Fragment>);
  }
}

ModalConfirm.propTypes = {
  name: PropTypes.string, // 按钮名称和 弹窗的标题
  selectRows: PropTypes.array.isRequired, // 选择的数据.数组类型
  className: PropTypes.string, // 按钮样式
  sourceKey: PropTypes.string.isRequired,  // 通过什么字段删除
  postKey: PropTypes.string, // 提交的字段名.
  url: PropTypes.string.isRequired,  // 接口url
  responseCallBack: PropTypes.func, // 接口返回数据检查
  getPage: PropTypes.func.isRequired,  // 刷新页面的方法
};

ModalConfirm.defaultProps = {
  name: '一键审核通过',
  className: 'defaultBlue',
  url: 'asdasd/asdasd',
  contentSentence: '您确认xxxxx吗?',
  sourceKey: 'id',
  postKey: 'ids',
  selectRows: [],
  responseCallBack: (response)=>{
    return !!response;
  },
};
