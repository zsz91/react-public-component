/**
 * 钟是志
 * 2019年2月26日
 * 用于 弹出提示信息 确认用户是否删除数据
 * 一个删除按钮 + 点击按钮显示的提示
 * 点确定 调接口->关闭弹窗 刷新页面
 * */
import ButtonDiy from '@/baseComponent/ButtonDiy';
import React, { Component, Fragment } from 'react';
import { message, Modal  } from 'antd';
import PropTypes from 'prop-types';
import * as service from './Service';

export default class ModalDelete extends Component {

  handleDelete = () => {
    const { selectRows, checkBeforeDelete, cannotDeleteSentence} = this.props;
    if(!selectRows.length){
        message.warning('请选择你要删除的数据');
        return false;
    }

    if(checkBeforeDelete){
      const check = checkBeforeDelete(selectRows);
      if(!check){
        if(cannotDeleteSentence){
          message.warning(cannotDeleteSentence);
          return false;
        }else{
          message.warning('数据关联,不能删除');
          return false;
        }
      }
    }


    Modal.confirm({
      title: '删除',
      content: `你确定要删除吗?`,
      onOk: this.handleOk,
      okText: '确认',
      cancelText: '取消',
    });

  };

  handleOk = () => {
    const { selectRows, postKey, sourceKey, url, responseCallBack, getPage } = this.props;
    const data = {};
    data[postKey] = selectRows.map( (item) => {
      return item[sourceKey];
    });
    data[postKey] = data[postKey].join(',');



    service.deleteData(data,url).then((response) => {
      if(!responseCallBack(response)){
        return false;
      }else{
        message.success('删除成功');
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
                   handleClick={this.handleDelete}/>
      </Fragment>);
  }
}
ModalDelete.propTypes = {
  name: PropTypes.string, // 按钮名称和 弹窗的标题
  selectRows: PropTypes.array.isRequired, // 选择的数据.
  className: PropTypes.string, // 按钮样式
  sourceKey: PropTypes.string.isRequired,  // 通过什么字段删除
  postKey: PropTypes.string, // 提交的字段名. ids
  url: PropTypes.string.isRequired,  // 接口url
  responseCallBack: PropTypes.func, // 接口返回数据检查
  getPage: PropTypes.func,  // 刷新页面的方法
  checkBeforeDelete: PropTypes.func, // 在删除前对数据进行检查 如果返回false 则不能删除数据
};

ModalDelete.defaultProps = {
  name: '删除',
  className: 'defaultRed',
  url: 'asdasd/asdasd',
  deleteKey: 'id',
  postKey: 'ids',
  selectRows: [],
  responseCallBack: (response)=>{
    return !!response;
  },
};
