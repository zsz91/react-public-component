import { Modal } from 'antd';
import React, { Component } from 'react';
import styles from './index.less';
import PropTypes from 'prop-types';

export default class ModalDiy extends Component {

  render(){
    const {children, title, handleOk,
           handleCancel, okText, cancelText,
           visible, confirmLoading, footer, width, maskClosable} = this.props;
    return (
      <Modal title={title}
             width={width ? width : 600}
             className={styles.modalDiy}
             style={{marginTop:'50px',}}
             okText={okText}
             visible={visible}
             maskClosable={maskClosable}
             cancelText={cancelText}
             confirmLoading={confirmLoading}
             onOk={() => {handleOk()}}
             onCancel={() => {handleCancel('showEditModal', false)}}>
        <div style={{overflowY:'auto',maxHeight:'500px'}}>
        {children}
        </div>
      </Modal>  )
  }
}

ModalDiy.propTypes = {
  title: PropTypes.string,
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  handleOk: PropTypes.func,
  handleCancel: PropTypes.func,
  confirmLoading:PropTypes.bool,
  maskClosable: PropTypes.bool,
};
ModalDiy.defaultProps = {
  title: '修改',
  handleOk: ()=>{console.log('ok')},
  handleCancel: ()=>{console.log('cancel')},
  okText: '确定',
  cancelText: '取消',
  visible: true,
  confirmLoading: false,
  maskClosable: false,
};
