/**
 * 钟是志
 * 2019年2月26日
 * 用于 新增弹出modal
 * 一个按钮 + 点击按钮显示的弹窗
 * 弹窗中包含一个表单 并填写数据后点确定 调接口->关闭弹窗 刷新页面
 * */


import ButtonDiy from '@/baseComponent/ButtonDiy';
import ModalDiy from '@/baseComponent/ModalDiy';
import CascadeAdd from '@/baseComponent/CascadeSearch/CascadeAdd';
import React, { Component, Fragment } from 'react';
import {checkDate} from '../baseComponent/utils';
import { message } from 'antd';
import PropTypes from 'prop-types';
import * as service from './Service';

export default class ModalForm extends Component {

  constructor(props) {
    super(props);
    const { values } = this.props;
    this.state={
      showModal: false,
      formValues: { ...values }, // 将默认值传进去 用于新增时可能遇到的需要传值的情况
    };
  }

  componentWillUnmount(){
  }

  changeShow = () => {
    const { showModal } = this.state;
    this.clearData();
    this.setState({
      showModal: !showModal,
    });
  };

  formStateChange = (value, key) => {
    let oldValue = this.state.formValues;
    oldValue[key] = value;
    this.setState({
      formValues: oldValue,
    });
  };

  clearData = () => {
    const { values } = this.props;
    this.setState({
      formValues: {...values},
    });
  };


  handleOk = () => {
    let { formValues } = this.state;
    const { fields, url, responseCallBack, getPage, beforeSubmit } = this.props;
    for (let item of fields) {
      if (item.required && !formValues[item.key] && formValues[item.key] !== 0) {
        message.warning(`${item.name}是必填项,请填写`);
        return false;
      }
      /**
       * 校验开始时间必须在结束时间之前
       * */
      if(item.rule && item.rule === 'mustAfterStart'){
        const check = checkDate(formValues[item.key],formValues[item.checkKey]);
        if(!check){
          message.warning(`${item.name}必须在${item.checkKeyName}之后`);
          return false;
        }
      }
    }
    let postData;
    let data = {
      ...formValues,
    };
    if(beforeSubmit){
      postData = beforeSubmit(this.props, formValues);
      data = {
        ...data,
        ...postData,
      }
    }

    service.addOrUpdate(data,url).then((response)=>{
          if(!responseCallBack(response)){
            this.changeShow();
            return false;
          }else{
            message.success('保存成功');
            getPage();
            this.changeShow();
          }
    });

  };

  render() {
    const { showModal, formValues } = this.state;
    const { name, className, fields, nameSpan, fileSpan, icon } = this.props;

    return (
      <Fragment>
        <ButtonDiy name={name}
                   className={className}
                   icon={icon}
                   handleClick={this.changeShow}/>

        {showModal ?
          <ModalDiy handleOk={this.handleOk}
                    title={name}
                    handleCancel={this.changeShow}
          >
            <CascadeAdd config={fields}
                        value={formValues}
                        changeValue={this.formStateChange}
                        nameSpan={nameSpan}
                        fileSpan={fileSpan}
                        style={{paddingTop:'0px'}}
            />
          </ModalDiy> : null}
      </Fragment>);
  }
}
ModalForm.propTypes = {
  name: PropTypes.string, // 按钮名称和 弹窗的标题
  className: PropTypes.string, // 按钮样式
  fields: PropTypes.array.isRequired,  // 填写的字段的配置
  values: PropTypes.object, // 如果有默认参数  则在页面的业务逻辑中传进来
  url: PropTypes.string.isRequired,  // 接口url
  icon: PropTypes.string, //按钮图标
  responseCallBack: PropTypes.func, // 接口返回数据检查
  getPage: PropTypes.func,  // 刷新页面的方法
  nameSpan: PropTypes.object, // 页面排版
  fileSpan: PropTypes.object, // 页面排版
};

ModalForm.defaultProps = {
  name: '新增',
  className: 'primaryBlue',
  values: {},
  url: 'asdasd/asdasd',
  responseCallBack: (response)=>{
    return !!response;
  },
  getPage: () => {

  },
  nameSpan: {big: 4, small: 4 },
  fileSpan: {big: 1, small: 1 },
};
