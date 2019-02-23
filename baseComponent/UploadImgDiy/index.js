/**
 * 赖井平
 * 2018/02/22
 * 自定义图片上传组件
 *
 * props:{
 *   fileSize: number    // 设置文件大小限制，单位M
 *   img: string      // 设置显示图片，如果没有用默认head
 *   uploadFinish: function   //设置图片修改成功后回调
 * }
 */

import React, { Component, Fragment } from 'react';
import { Upload, message } from 'antd';
import styles from './index.less';
import * as service from './service';


export default class UploadImgDiy extends Component{
  constructor(props) {
    super(props);

    this.state = {
      fileSize: props.fileSize || 2,
    }
  }

  checkSize(file) {
    const { fileSize } = this.state;
    let flag = false;

    if (fileSize && file.size/ 1024 / 1024 > fileSize) {
      message.error(`单个文件大小不能超过${fileSize}MB!`);
      flag = true;
    }

    return flag;
  }

  uploadImg = () => {
    const file = this.fileInput.files[this.fileInput.files.length-1];

    if (this.checkSize(file)) {
      return;
    }

    service.uploadFile({
      file: file
    }).then(res=>{
      if(res){
        this.setState({
          imgUrl: res.url
        })
        this.props.uploadFinish(res);
      }
    })
  };


  render() {
    const { accept, img } = this.props;
    const { imgUrl } = this.state;

    const style = {};

    if (imgUrl) {
      style.backgroundImage = `url(${imgUrl})`;
    } else if (img) {
      style.backgroundImage = `url(${img})`;
    }

    return (
      <Fragment>
        <label className={styles['img-box']} style={style}>
          <input type="file"
                 accept={accept}
                 style={{display: 'none'}}
                 onChange={this.uploadImg}
                 ref={input => {
                   this.fileInput = input;
                 }}
          />
        </label>
      </Fragment>
    )
  }
}
