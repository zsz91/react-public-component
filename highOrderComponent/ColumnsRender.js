import React, { Component, Fragment } from 'react';
import ModalEdit from './ModalEdit';
import LinkEdit from './LinkEdit';
import FileList from './FileList';
import { message, Switch } from 'antd';
import * as services from './Service';
import PropTypes from 'prop-types';
import { matchReg } from '../baseComponent/utils';

export default class ColumnsRender extends Component {
  constructor(props) {
    super(props);
  }


  /**
   * 开关类 表格
   * */
  handleSwitchChange = (checked, record, config) => {
    if(!config.url){
      return false;
    }
    if (checked) {
      record[config.filed] = config.openValue;
    } else {
      record[config.filed] = config.closeValue;
    }
    if (config.beforeUpdate) {
      let postdata = config.beforeUpdate(record);
      services.addOrUpdate(postdata, config.url).then((response) => {
        if (config.responseCallBack) {
          response = config.responseCallBack(response);
          if (response) {
            message.success('操作成功');
            this.props.getPage();
          }
        }
      });
    }
  };

  getPage = () => {
    this.props.getPage();
  };

  render() {
    const { config, record, text, getPage } = this.props;
    let dom = null;
    switch (config.type) {
      case 'Switch':
        dom = <Switch checkedChildren={config.checkedChildren}
                      checked={text === config.openValue}
                      disabled={config.disabled}
                      onChange={(checked) => {
                        this.handleSwitchChange(checked, record, config);
                      }}
                      unCheckedChildren={config.unCheckedChildren}/>;

        break;
      case 'ModalEdit':
        dom = <ModalEdit getPage={this.getPage}
                         record={record}
                         {...config}
        />;
        break;
      case 'LinkEdit':
        dom = <LinkEdit record={record}
                        {...config}
        />;
        break;
      case 'htmlToText':
        let str = text ? matchReg(text) : '';
        if(config.subString && str.length > config.subString){
            str = str.substring(0,config.subString);
        }
        dom = str + '...';
        break;
      case 'FileList':
        dom = <FileList fileList={text}

        />;
        break;
      case 'translateText':
        if(!text && text !== 0){
          dom = '';
        }else {
          for(let item of config.options){
            if(text.toString() === item.key.toString()){
              dom = item.name;
            }
          }
        }
        break;
      default:
        dom = 'text';
        break;
    }
    return dom;
  }
}

ColumnsRender.propTypes = {
  record: PropTypes.object.isRequired,
  text: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  config: PropTypes.object, // 列的配置信息
  getPage: PropTypes.func,
};
ColumnsRender.defaultProps = {
  text: '1', // 表格的数据文档
  record: {   // 表格行数据
  },
  getPage: () => {
  },
  config: {
    filed: 'status',
    openValue: 1,
    closeValue: 0,
    checkedChildren: '通过',
    unCheckedChildren: '不通过',
    beforeUpdate: (record) => {
      return { id: record.id, status: record.status };
    },
    responseCallBack: (response) => {
      if (!response) {
        return false;
      } else {
        return response;
      }
    },
    type: 'Switch',
    url: 'asdasdasd/sdfgdfg',

  },

};

