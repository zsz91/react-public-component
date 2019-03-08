import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { downloadFile } from '@/utils/utils';

export default class FileList extends Component{
  downLoad = (url, name) => {
    downloadFile(url, name);
  };

  render() {
    let { fileList } = this.props;

    if (typeof fileList === 'string') {
      try {
        fileList = JSON.parse(fileList);
      }catch (e) {
        fileList = [];
      }
    }

    return (
      <Fragment>
        {
          fileList.map(item => {
            return (<div key={item.response.id} >
              <a onClick={()=>{
                this.downLoad(item.response.url, item.name);
              }}>
                {item.name}
              </a>
            </div>);
          })
        }

      </Fragment>
    )
  }
}
