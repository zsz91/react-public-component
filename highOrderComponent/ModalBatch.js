/**
 * 赖井平
 * 2019年3月2日
 * 用于 批量弹窗操作
 * */


import ButtonDiy from '@/baseComponent/ButtonDiy';
import ModalDiy from '@/baseComponent/ModalDiy';
import CascadeAdd from '@/baseComponent/CascadeSearch/CascadeAdd';
import React, { Component, Fragment } from 'react';
import { checkDate } from '../baseComponent/utils';
import { message } from 'antd';
import PropTypes from 'prop-types';
import * as service from './Service';

export default class ModalBatch extends Component {

  constructor(props) {
    super(props);
    const { values } = this.props;
    this.state = {
      showModal: false,
      formValues: { ...values }, // 将默认值传进去 用于新增时可能遇到的需要传值的情况
    };
  }

  componentWillUnmount() {
  }

  changeShow = () => {
    const { beforeShowModel, selectRows, initFormValues } = this.props;
    const { formValues, showModal } = this.state;
    if (!selectRows.length && !this.state.showModal) {
      message.warning('请至少选择一条数据');
      return false;
    }
    if(initFormValues && !showModal){
       initFormValues(selectRows,formValues).then((response)=>{
         this.setState({
           formValues: response ,
         },()=>{
           console.log(this.state.formValues);
         })
      });

    }

    /**
     * 设置modal是否显示
     * */
    let flag;
    if (!showModal && beforeShowModel) {
      beforeShowModel(this.props, ({ text, type, isNotShow }) => {
        flag = isNotShow;
        if (isNotShow && text) {
          message[type](text);
        }
      });
    }
    if (flag) {
      return false;
    }
    /**
     * 设置modal是否显示
     * */

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
      formValues: { ...values },
    });
  };

  handleOk = () => {
    let { formValues } = this.state;
    let param = { ...formValues };
    const { fields, url, responseCallBack, getPage, beforeSubmit, selectRows, postKey, sourceKey, handleSelectRows } = this.props;
    for (let item of fields) {
      if (item.required && !formValues[item.key] && formValues[item.key] !== 0) {
        message.warning(`${item.name}是必填项,请填写`);
        return false;
      }
      /**
       * 校验开始时间必须在结束时间之前
       * */
      if (item.rule && item.rule === 'mustAfterStart') {
        const check = checkDate(formValues[item.key], formValues[item.checkKey]);
        if (!check) {
          message.warning(`${item.name}必须在${item.checkKeyName}之后`);
          return false;
        }
      }
    }

    param[postKey] = selectRows.map((item) => {
      return item[sourceKey];
    });
    param[postKey] = param[postKey].join(',');

    if (beforeSubmit) {
      let postData = beforeSubmit(this.props, formValues);
      param = {
        ...param,
        ...postData,
      };
    }

    service.addOrUpdate(param, url).then((response) => {
      if (response) {
        if (responseCallBack && !responseCallBack(response)) {
          this.changeShow();
          return false;
        } else {
          handleSelectRows([]);
          message.success('保存成功');
          this.changeShow();
          getPage();
        }
      } else {
        this.changeShow();
        return false;
      }

    });

  };

  render() {
    const { showModal, formValues } = this.state;
    const { name, className, fields, nameSpan, fileSpan } = this.props;

    return (
      <Fragment>
        <ButtonDiy name={name}
                   className={className}
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
                        style={{ paddingTop: '0px' }}
            />
          </ModalDiy> : null}
      </Fragment>);
  }
}
ModalBatch.propTypes = {
  name: PropTypes.string, // 按钮名称和 弹窗的标题
  className: PropTypes.string, // 按钮样式
  fields: PropTypes.array.isRequired,  // 填写的字段的配置
  values: PropTypes.object, // 如果有默认参数  则在页面的业务逻辑中传进来
  url: PropTypes.string.isRequired,  // 接口url
  responseCallBack: PropTypes.func, // 接口返回数据检查
  getPage: PropTypes.func,  // 刷新页面的方法
  nameSpan: PropTypes.object, // 页面排版
  fileSpan: PropTypes.object, // 页面排版
};

ModalBatch.defaultProps = {
  name: '新增',
  className: 'primaryBlue',
  values: {},
  sourceKey: 'id',
  postKey: 'ids',
  selectRows: [],
  url: 'asdasd/asdasd',
  responseCallBack: (response) => {
    return !!response;
  },
  /*beforeShowModel: (props, callback) => {

  },*/
  nameSpan: { big: 4, small: 4 },
  fileSpan: { big: 1, small: 1 },
};
