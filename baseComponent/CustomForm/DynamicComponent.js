import React, { Component, Fragment } from 'react';
import {
  Input,
  InputNumber,
  Icon,
  Select, DatePicker, Checkbox, Button, Radio, Switch, Upload
} from 'antd';
import ButtonDiy from '@/baseComponent/ButtonDiy';
import RichEditor from '@/components/App/RichEditor';
import baseConfig from '@/config/config'

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const Option = Select.Option;

export default class DynamicComponent extends Component{
  constructor(props) {
    super(props);

    const value = props.value || {};
    this.state = {

    }
  }


  getRenderElem = () =>{
    const { type, config } = this.props;
    let renderElem = null;

    switch (type) {
      case 'input':
        renderElem = <Input {...config}
                            onChange={this.props.onChange}
        />;
        break;
      case 'inputNumber':
        renderElem = <InputNumber {...config}
                                  onChange={this.props.onChange}
        />;
        break;
      case 'datePicker':
        renderElem = <DatePicker {...config}
                                 onChange={this.props.onChange}
        />;
        break;
      case 'monthPicker':
        renderElem = <MonthPicker {...config}
                                  onChange={this.props.onChange}
        />;
        break;
      case 'editor':
        renderElem = <RichEditor {...config}
                                 onChange={this.props.onChange}
        />;
        break;
      case 'select':
        renderElem = <Select {...config}
                             onChange={this.props.onChange}
        >
          {
            config.options.map(option =>{
              return (
                <Option value={option.key} key={option.key}>{option.name}</Option>
              )
            })
          }
        </Select>;
        break;
      case 'upload':
        renderElem = <Upload name="files"
                             onChange={this.props.onChange}
                             action={baseConfig.uploadUrl}
                             {...config}
        >
          <ButtonDiy name="选择文件"
                     className="defaultBlue"
          />
        </Upload>;
        break;
      default:
        break;
    }

    return renderElem;
  };

  render() {
    const renderElem  = this.getRenderElem();

    return (renderElem)
  }
}

DynamicComponent.defaultProps = {
};
