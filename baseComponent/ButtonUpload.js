import React, { Component, Fragment } from 'react';
import { Upload, message } from 'antd';
import ButtonDiy from '@/baseComponent/ButtonDiy';
import * as service from './UploadImgDiy/service';
import PropTypes from 'prop-types';

export default class ButtonUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fileSize: props.fileSize || 2,
    };
  }

  checkSize(file) {
    const { fileSize } = this.state;
    let flag = false;

    if (fileSize && file.size / 1024 / 1024 > fileSize) {
      message.error(`单个文件大小不能超过${fileSize}MB!`);
      flag = true;
    }

    return flag;
  }

  uploadFile = () => {
    const { onChange } = this.props;
    const file = this.fileInput.files[this.fileInput.files.length - 1];

    if (!file || this.checkSize(file)) {
      return;
    }

    service.uploadFile({
      file: file,
    }).then(res => {
      if (res) {
        onChange && onChange(res, this.fileInput);
      }
    });
  };

  selectFile = () => {
    this.fileInput.click();
  };

  render() {
    const { accept, buttonName, buttonClassName, value, readOnly } = this.props;
    if (readOnly) {
      if (value) {
        return (<a href={value}
                   target="_blank">点击查看</a>);
      }
      return null;
    }
    return (
      <Fragment>
        <label>
          <ButtonDiy name={buttonName}
                     handleClick={this.selectFile}
                     className={buttonClassName}
          />
          <input type="file"
                 accept={accept}
                 style={{ display: 'none' }}
                 onChange={this.uploadFile}
                 ref={input => {
                   this.fileInput = input;
                 }}
          />
          {this.fileInput && this.fileInput.value.split('\\').pop()
          || value
          || <span style={{ color: '#D2D2D2' }}>未选择任何文件</span>}
        </label>
      </Fragment>
    );
  }
}

ButtonUpload.propTypes = {
  fileSize: PropTypes.number,   //  文件大小限制
  accept: PropTypes.string, // 上传类型限制
  buttonName: PropTypes.string, // 上传按钮名称
  buttonClassName: PropTypes.string,  //按钮样式
  onChange: PropTypes.func, // 上传成功回调
};
ButtonUpload.defaultProps = {
  fileSize: 2,
  accept: '',
  buttonName: '选择文件',
  buttonClassName: 'defaultBlue',
  onChange: () => {
  },
};
