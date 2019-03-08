/**
 * 根据Props 实现表单的快速渲染.
 * 主要是传递每个字段的类型.
 *
 * */
import {
  Row,
  Col,
  Form,
  Input,
  Select,
  DatePicker,
  Checkbox,
  Button,
  Radio,
  Switch,
  Upload,
  Icon,
  InputNumber,
} from 'antd';
import React, { Component } from 'react';
import styles from './index.less';
import PropTypes from 'prop-types';
import moment from 'moment';
import { countSpecialField } from './utils';
import SelectPeople from './SelectPeople/SelectPeople';
import SelectMyStudent from './SelectPeople/SelectMyStudent';
import SelectTeacher from './SelectPeople/SelectTeacher';
import SelectStudent from './SelectPeople/SelectStudent';

import Editable from './Editable';
import ReactQuill from 'react-quill';

import baseConfig from '@/config/config';
import 'react-quill/dist/quill.snow.css';

const RadioGroup = Radio.Group;
const Option = Select.Option;
const { TextArea } = Input;
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const { MonthPicker, RangePicker } = DatePicker;

const quillConfig = {
  toolbar:
    [
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image', 'video'],
      ['clean'],
    ],
};

const ColDom = ({ children, filedSpan }) => {
  const bigSpan = Math.ceil(24 / filedSpan.big);
  const smallSpan = Math.ceil(24 / filedSpan.small);
  return (
    <Col xl={smallSpan}
         xxl={bigSpan}
         className={styles.colDom}
         style={countSpecialField(filedSpan.big)}
    >
      {children}
    </Col>)
    ;
};

const FormItemDom = ({ info, children, nameSpan }) => {
  return <FormItem label={info.name}
                   required={info.required || false}
                   labelCol={{
                     xl: nameSpan.small,
                     xxl: nameSpan.big,
                   }}
                   wrapperCol={{
                     xl: 24 - nameSpan.small,
                     xxl: 24 - nameSpan.big,
                   }}
                   colon={false}
  >
    {children}
  </FormItem>;
};


export default class FormArray extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  formatTime = (time, formatTimeConfig = 'YYYY-MM-DD HH:mm') => {
    return moment(time);
  };

  datePickerOnchange = (dateString, key) => {
    const { changeValue } = this.props;
    changeValue(dateString, key);
  };

  defaultPropsCount = (info, value) => {
    const itemDisabled = typeof info.disabled !== 'undefined' ? info.disabled : false;
    const readOnly = typeof info.readOnly !== 'undefined' ? info.readOnly : false;
    const placeholder = typeof info.placeholder !== 'undefined' ? info.placeholder : '';
    const options = typeof info.options !== 'undefined' ? info.options : [];
    let itemValue = typeof value[info.key] === 'undefined' ? '' : value[info.key];
    if (['select', 'radioGroup'].indexOf(info.type) > -1) {
      itemValue = typeof itemValue === 'number' ? itemValue.toString() : itemValue;
      itemValue = typeof itemValue === 'boolean' ? itemValue + '' : itemValue;
    } else if(['selectMultiple','checkBoxMutiple'].indexOf(info.type) > -1){
      itemValue = typeof itemValue === 'number' ? itemValue.toString() : itemValue; // 数字变成 字符串
      itemValue = typeof itemValue === 'string' && itemValue ? itemValue.split(',') : itemValue;  // 有值且值是字符串则 变成数组
      itemValue = !itemValue ? [] : itemValue; // 没有值则变成空数组
    }
    else if (['datePicker', 'monthPicker'].indexOf(info.type) > -1) {
      if (typeof itemValue !== 'object') {
        if (itemValue) {
          itemValue = moment(itemValue);
        } else {
          itemValue = null;
        }/*格式化时间*/
      }
    } else if (['rangePicker'].indexOf(info.type) > -1) {
      if (typeof itemValue !== 'object') {
        const endValue = typeof value[info.endKey] === 'undefined' ? null : value[info.endKey];
        if (itemValue) {
          itemValue = [moment(itemValue), moment(endValue)];
        } else {
          itemValue = undefined;
        }
      }
    } else if (info.type === 'checkBox') {
      itemValue = !!itemValue;
    } else if (info.type === 'switch') {
      itemValue = !!value[info.key];
    }
    /*if(info.type === 'selectPeople'){
      itemValue = typeof itemValue !== 'object' ? {key:itemValue,label: ''} : itemValue;
    }*/

    const defaultProps = {
      readOnly: this.props.readOnly ? true : readOnly,
      disabled: this.props.disabled ? true : itemDisabled,
      value: itemValue,
      placeholder: placeholder,
      options: options,
    };
    return defaultProps;
  };

  rangeOnChange = (dateStrings = [], key, endKey) => {
    const { changeValue } = this.props;
    changeValue(dateStrings[0], key);
    changeValue(dateStrings[1], endKey);
  };


  domAssembly = () => {
    const { changeValue, value, config, fileSpan, nameSpan } = this.props;
    return config.map((info, i) => {
      let fieldDom = null;
      const defaultProps = this.defaultPropsCount(info, value);
      switch (info.type) {
        case 'input': // 普通文本
          fieldDom = <Input {...defaultProps}
                            style={info.style || {}}
                            onChange={(e) => {
                              changeValue(e.target.value, info.key);
                            }}/>;
          break;
        case 'inputNumber': // 数字文本
          fieldDom = <InputNumber
            {...defaultProps}
            style={{ width: '100%' }}
            onChange={(value) => {
              changeValue(value, info.key);
            }}/>;
          break;
        case 'checkBoxMutiple': // 多选 checkbox
          fieldDom = <CheckboxGroup {...defaultProps}
                                    onChange={(value) => {
                                      changeValue(value, info.key);
                                    }}/>;
          break;
        case 'selectMultiple': // 下拉多选
          fieldDom = <Select {...defaultProps}
                             mode="multiple"
                             allowClear
                             style={{ width: '100%' }}
                             onChange={(value) => {
                               changeValue(value, info.key);
                             }}>
            {defaultProps.options.map((optionItem) => {
              return <Option key={typeof optionItem.key !== 'boolean' ? optionItem.key + '' : optionItem.key}>
                {optionItem.name}
              </Option>;
            })}
          </Select>;
          break;
        case 'select': // 下拉单选
          fieldDom = <Select {...defaultProps}
                             style={{ width: '100%' }}
                             allowClear
                             onChange={(value) => {
                               changeValue(value, info.key);
                             }}>
            {defaultProps.options.map((optionItem) => {
              return <Option key={typeof optionItem.key !== 'boolean' ? optionItem.key + '' : optionItem.key}>
                {optionItem.name}
              </Option>;
            })}
          </Select>;
          break;
        case 'selectPeople':
          // 选人
          fieldDom = <SelectPeople onChange={changeValue}
                                   filedKey={info.key}
                                   disabled={defaultProps.disabled}
                                   value={defaultProps.value}/>;
          break;
        case 'selectStudent':
          // 选学生
          fieldDom = <SelectStudent onChange={changeValue}
                                    config={config}
                                    filedKey={info.key}
                                    disabled={defaultProps.disabled}
                                    value={defaultProps.value}/>;
          break;
        case 'selectMyStudent':
          // 选我的学生
          fieldDom = <SelectMyStudent onChange={changeValue}
                                      config={config}
                                      filedKey={info.key}
                                      disabled={defaultProps.disabled}
                                      value={defaultProps.value}/>;
          break;
        case 'selectTeacher':
          // 选老师
          fieldDom = <SelectTeacher onChange={changeValue}
                                    config={config}
                                    filedKey={info.key}
                                    nameKey={info.nameKey}
                                    disabled={defaultProps.disabled}
                                    nameValue={value[info.nameKey]}
                                    value={defaultProps.value}/>;
          break;
        case 'checkBox': // 布尔值选择

          fieldDom = <Checkbox checked={defaultProps.value}
                               disabled={defaultProps.disabled}
                               onChange={(e) => {
                                 changeValue(e.target.checked, info.key);
                               }}>
            {info.text}
          </Checkbox>;
          break;

        case 'editable': // 可编辑的富文本

          fieldDom = <div className={styles.Editable}>
            <Editable onChange={changeValue}
                      filedKey={info.key}
                      disabled={defaultProps.disabled}
                      value={defaultProps.value}
            />
          </div>;
          break;

        case 'datePicker': // 日期选择
          fieldDom = <DatePicker showTime={info.showTime}
                                 {...defaultProps}
                                 style={{ width: '100%' }}
                                 format={info.format}
                                 onChange={(date, dateString) => {
                                   this.datePickerOnchange(dateString, info.key);
                                 }}>
          </DatePicker>;
          break;

        case 'rangePicker': // 时间段选择
          fieldDom = <RangePicker showTime={info.showTime}
                                  {...defaultProps}
                                  style={{ width: '100%' }}
                                  format={info.format}
                                  placeholder={info.placeholder || ['开始日期','结束日期']}
                                  onChange={(dates, dateStrings) => {
                                    this.rangeOnChange(dateStrings, info.key, info.endKey);
                                  }}>
          </RangePicker>;
          break;

        case 'monthPicker': // 年月 选择
          fieldDom = <MonthPicker
            {...defaultProps}
            style={{ width: '100%' }}
            format={info.format}
            onChange={(date, dateString) => {
              this.datePickerOnchange(dateString, info.key);
            }}>
          </MonthPicker>;
          break;

        case 'textarea': // 文本框
          fieldDom = <TextArea {...defaultProps}
                               autosize={{ minRows: 4, maxRows: 6 }}
                               onChange={(e) => {
                                 changeValue(e.target.value, info.key);
                               }}/>;
          break;
        case 'radioGroup': // 圆形 选择框
          fieldDom = <RadioGroup value={defaultProps.value}
                                 style={{ width: '100%' }}
                                 onChange={(e) => {
                                   changeValue(e.target.value, info.key);
                                 }}>

            {defaultProps.options.map((optionItem) => {
              const radioValue = typeof optionItem.key !== 'boolean' ? optionItem.key + '' : optionItem.key;
              return <Radio key={radioValue} value={radioValue}>
                {optionItem.name}
              </Radio>;
            })}
          </RadioGroup>;
          break;
        case 'switch': // 开关
          fieldDom = <Switch    {...defaultProps}
                                checked={defaultProps.value}
                                checkedChildren={info.checkedChildren || ''}
                                unCheckedChildren={info.unCheckedChildren || ''}
                                onChange={(e) => {
                                  changeValue(e, info.key);
                                }}/>;
          break;
        case 'editor':
          fieldDom = <ReactQuill {...defaultProps}
                                 className={styles.editorLayout}
                                 modules={quillConfig}
                                 onChange={(e) => {
                                   changeValue(e, info.key);
                                 }}
          />;
          break;
        case 'upload':
          fieldDom = <Upload action={baseConfig.uploadUrl}
                             accept={info.accept}
                             multiple={info.multiple}
                             {...defaultProps}
                             defaultFileList={value[info.key]}
                             name="file"
                             onChange={({ fileList }) => {
                               changeValue(fileList, info.key);
                             }}>
            <Button>
              <Icon type="upload"/> Upload
            </Button>
          </Upload>;

          break;
        case 'text':
          fieldDom = <div>{defaultProps.value}</div>;
          break;
        default:
          fieldDom = null;
          break;

      }
      return (
        <ColDom filedSpan={info.fileSpan || fileSpan} key={info.key + i}>
          <FormItemDom info={info} nameSpan={info.nameSpan || nameSpan}>
            {fieldDom}
          </FormItemDom>
        </ColDom>);
    });
  };

  render() {
    const { style } = this.props;
    return (
      <div className={styles.FormArray} style={style}>
        {this.domAssembly()}
      </div>
    );
  }
}
/**
 * 最主要的 props 就是config.
 * config: 表单填写的每一个字段,根据type的不同渲染不同的组件,
 * 包含 [inputNumber(数字input),input,
 *      selectMultiple(多选下拉),select(单选下拉)
 *      checkBox(单选checkbox),
 *      checkBoxMutiple (多选checkbox)
 *      datePicker日期选择  value 传入 时间戳格式 等等
 *
 * 具体请查看下面的demo
 *
 * changeValue: 表单的值改变后的回调
 * value : 表单的值应该是一个对象state {name:'',phone:''....}
 * fileSpan : { big:5, small:4}
 *         small: 设置1366*768的屏幕 每一行显示几个字段  如 只显示3个 则 = 3
 *         big: 设置1920*1080的屏幕  每一行显示几个字段 同上
 * nameSpan { big:5, small:4}   同上设置 一个字段的 字段名和填写的值所占的比例
 * */


/**
 * 2019年3月7日
 * 钟是志
 * 增加对 时间段rangePicker选择的支持 具体使用见下面的 demo
 * */
FormArray.propTypes = {
  config: PropTypes.array,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  changeValue: PropTypes.func,
  value: PropTypes.object,
  fileSpan: PropTypes.object,
  nameSpan: PropTypes.object,
  style: PropTypes.object,
};
FormArray.defaultProps = {
  config: [
    {
      name: '数字选择',
      type: 'inputNumber',
      placeholder: '',
      key: 'scoreRank',
    },
    {
      name: '文本框',
      type: 'input',
      placeholder: '',
      key: 'scoreRank2',
    },
    {
      key: 'startDate',
      endKey: 'endDate',
      name: '时间段选择',
      type: 'rangePicker',
      format: 'YYYY-MM-DD',
      placeholder: ['开始时间','结束时间'],
      required: true,
    },
    {
      name: '日期选择',
      type: 'datePicker',
      placeholder: '',
      key: 'scoreRank5',
    },
    {
      name: '下拉框选择',
      type: 'select',
      placeholder: '',
      key: 'scoreRank6',
    }, {
      name: '下拉框多选',
      type: 'selectMultiple',
      placeholder: '',
      key: 'scoreRank7',
    }, {
      key: 'studentType',
      name: 'checkBox多选',
      type: 'checkBoxMutiple',
      options: [
        { label: '本科', value: '本科' },
        { label: '专科', value: '专科' },
        { label: '研究生', value: '研究生' },
      ],
      required: true,
    },

  ],
  changeValue: (value, key) => {
  },
  value: {},
  fileSpan: {
    big: 5,
    small: 4,
  },
  nameSpan: {
    big: 10,
    small: 12,
  },
  disabled: false,
  style: {},
};
