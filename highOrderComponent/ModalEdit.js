/**
 * 钟是志
 * 2019年2月27日
 * 用于 编辑弹出modal
 * 一个编辑 a标签 +  点击按钮显示的弹窗
 * 弹窗中包含一个表单 并填写数据后点确定 调接口->关闭弹窗 刷新页面
 * */


import ModalDiy from '@/baseComponent/ModalDiy';
import CascadeAdd from '../baseComponent/CascadeSearch/CascadeAdd';
import React, { Component, Fragment } from 'react';
import {checkDate, deepCopy} from '../baseComponent/utils';
import { message } from 'antd';
import PropTypes from 'prop-types';
import * as service from './Service';

export default class ModalEdit extends Component {

  constructor(props) {
    super(props);
    const { fields } = this.props;
    this.state = {
      showModal: false,
      formValues: {}, // 将默认值传进去
      disabled: false,
      showType: 2,
      fields: deepCopy(fields),
    };
  }

  componentDidMount() {
    this.initData();
    this.setShowType();
  }

  setShowType = () => {
    const { includeReadOnly, isRenderNeedShow, record, isShowReadOnly } = this.props;
    let showType = 2; // 2只编辑

    if(includeReadOnly){
      showType = 3 ; // 3查看和编辑一起显示
    }

    if(isRenderNeedShow && !isRenderNeedShow(record)){
      showType = 4 ; // 4 什么都不显示
    }
    if(isShowReadOnly && isShowReadOnly(record)) {
      showType = 1 ; // 1 只查看
    }
    this.setState({
      showType,
    });
  };

  changeShow = () => {
    const { showModal } = this.state;
    if(showModal === false){
      this.initData();
    }
    this.setState({
      showModal: !showModal,
      disabled: false,
    });
  };

  readOnlyModal = () => {
    const { showModal } = this.state;
    if(showModal === false){
      this.initData();
    }
    this.setState({
      showModal: !showModal,
      disabled: true,
    })
  };

  initData = () => {
    const { record, beforeShowChangeOption, } = this.props;
    const { fields } = this.state;
    let formValues = {};
    for (let item of fields) {
      const giveValue = ['nameKey', 'endKey', 'key'];
      for(let x of giveValue){
        if(item[x] && (record[item[x]] || record[item[x]] === 0 || record[item[x]] === false )){
          formValues[item[x]] = record[item[x]];
        }
      }
    }
    if(beforeShowChangeOption){
      beforeShowChangeOption(record,formValues, fields).then((res)=>{
          this.setState({
            fields: res,
          })
      });
    }

    this.setState({
      formValues: formValues,
    })
  };

  formStateChange = (value, key) => {
    let oldValue = this.state.formValues;
    oldValue[key] = value;
    this.setState({
      formValues: oldValue,
    });
  };

  handleOk = () => {
    let { formValues, fields } = this.state;
    const { url, responseCallBack, getPage, record, beforeUpdate, checkBeforeUpdate } = this.props;
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

    if(checkBeforeUpdate){
      const res = checkBeforeUpdate(record,formValues);
      if(res.type === false){
        message.warning(res.message);
        return false;
      }
    }

    if (beforeUpdate) {
      const data = beforeUpdate(record,formValues);
      formValues = {
        ...formValues,
        ...data,
      };
    }
    service.addOrUpdate(formValues, url).then((response) => {
      if (!responseCallBack(response)) {
        this.changeShow();
        return false;
      } else {
        message.success('保存成功');
        this.changeShow();
        getPage();
      }
    });

  };

  // 1 只查看 2只编辑 3查看和编辑一起显示 4 什么都不显示
  dom = () => {
    const { showType } = this.state;
    const { name } = this.props;
    switch (showType) {
      case 1:
        return (<a onClick={this.readOnlyModal}>查看</a>);
      case 2:
        return (<a onClick={this.changeShow}>{name}</a>);
      case 3:
        return (<Fragment>
            <a onClick={this.changeShow}>
              {name}
            </a>
            <a onClick={this.readOnlyModal}>
              | 查看
            </a></Fragment>
        );
      default:
        return null;
    }
  };

  render() {
    const { showModal, formValues, disabled, fields } = this.state;
    const { name } = this.props;
    return (
      <Fragment>
        {this.dom()}
        {showModal ?
          <ModalDiy handleOk={this.handleOk}
                    title={name}
                    handleCancel={this.changeShow}
          >
            <CascadeAdd config={fields}
                        value={formValues}
                        disabled={disabled}
                        changeValue={this.formStateChange}
                        nameSpan={{ big: 4, small: 4 }}
                        fileSpan={{ big: 1, small: 1 }}
                        style={{ paddingTop: '0px' }}
            />
          </ModalDiy> : null}
      </Fragment>);
  }
}
ModalEdit.propTypes = {
  name: PropTypes.string, // a标签文字和 弹窗的标题
  fields: PropTypes.array.isRequired,  // 填写的字段的配置
  values: PropTypes.object, // 如果有默认参数  则在页面的业务逻辑中传进来
  url: PropTypes.string.isRequired,  // 接口url
  responseCallBack: PropTypes.func, // 接口返回数据检查
  getPage: PropTypes.func,  // 刷新页面的方法
  isRenderNeedShow: PropTypes.func, // 是否需要渲染 render 返回false 则不渲染
  isShowReadOnly: PropTypes.func, // 是否只渲染<查看> 返回true 不渲染编辑
  includeReadOnly: PropTypes.bool, // 是否显示 <查看> 和 <编辑>
};

ModalEdit.defaultProps = {
  name: '编辑',
  values: {},
  url: 'asdasd/asdasd',
  responseCallBack: (response) => {
    return !!response;
  },
};
