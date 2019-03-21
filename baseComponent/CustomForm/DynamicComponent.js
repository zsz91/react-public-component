import React, { Component, Fragment } from 'react';
import {
  Input,
  InputNumber,
  Icon,
  Select, DatePicker, Checkbox, Button, Radio, Switch, Upload,
} from 'antd';
import ButtonDiy from '@/baseComponent/ButtonDiy';
import ButtonUpload from '@/baseComponent/ButtonUpload';
import RichEditor from '@/components/App/RichEditor';
import baseConfig from '@/config/config';

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const Option = Select.Option;
const { TextArea } = Input;

export default class DynamicComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }


  getRenderElem = () => {
    const { type, config, readOnly } = this.props;
    let renderElem = null;
    switch (type) {
      case 'input':
        renderElem = <Input {...config}
                            style={{width: '100%'}}
                            onChange={this.props.onChange}
        />;
        break;
      case 'inputNumber':
        renderElem = <InputNumber onChange={this.props.onChange}
                                  min={0}
                                  {...config}
        />;
        break;
      case 'datePicker':
        renderElem = <DatePicker {...config}
                                 onChange={(moment, dateString) => {
                                   this.props.onChange(dateString);
                                 }}
        />;
        break;
      case 'monthPicker':
        renderElem = <MonthPicker {...config}
                                  onChange={(moment, dateString) => {
                                    this.props.onChange(dateString);
                                  }}
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
            config.options && config.options.map(option => {
              return (
                <Option value={option.key} key={option.key}>{option.name}</Option>
              );
            })
          }
        </Select>;
        break;
      case 'checkbox':
        renderElem = <Checkbox onChange={this.props.onChange} {...config}>{config.title || ''}</Checkbox>;
        break;
      case 'textarea':
        renderElem = <TextArea onChange={this.props.onChange}
                               {...config}
        />;
        break;
      case 'upload':
        renderElem = readOnly ? null : <Upload name="files"
                                               onChange={this.props.onChange}
                                               action={baseConfig.uploadUrl}

                                               {...config}
        >
          <div>
            <Icon type="plus"/>
          </div>
        </Upload>;
        break;
      case 'buttonUpload':
        renderElem = <ButtonUpload onChange={this.props.onChange}
                                   readOnly={readOnly}
                                   {...config}/>;
        break;
      default:
        break;
    }

    return renderElem;
  };

  render() {
    return (this.getRenderElem());
  }
}

DynamicComponent.defaultProps = {};
