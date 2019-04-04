import React, { Component } from 'react'
import { Upload, Button, Icon } from 'antd';
import ButtonDiy from '@/baseComponent/ButtonDiy';
import * as Service from './UploadImgDiy/service';

export default class UploadList extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      pops:{
        beforeUpload(file, fileList){
            if(file){
                Service.uploadFile({
                    file
                }).then(res=>{
                    // console.log(res)
                })
            }
        },
        defaultFileList: [
            // {
            //     uid: '1',
            //     name: 'xxx.png',
            //     status: 'done',
            //     response: 'Server Error 500', // custom error message to show
            //     url: 'http://www.baidu.com/xxx.png',
            // }
        ],
      }
    }
  }
  
  fileChange = (f,l)=> {
    this.props.onChange(f,l);
  }

  render() {
    const {pops} = this.state;
    return (
        <Upload {...pops} onChange={this.fileChange}>
            <ButtonDiy name="上传资料" className="defaultBlue"/>
        </Upload>
    )
  }
}
