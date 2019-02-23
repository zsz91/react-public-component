/**
 * 根据Props 实现表单的快速渲染.
 * 主要是传递每个字段的类型.
 *
 * */
import { Row, Col, Form, Input, Select, DatePicker, Checkbox, Button, Radio } from 'antd';
import React, { Component } from 'react';
import styles from './index.less';
import PropTypes from 'prop-types';
import moment from 'moment';
import { countSpecialField } from './utils';
import SelectPeople from './SelectPeople/SelectPeople'

const RadioGroup = Radio.Group;
const Option = Select.Option;
const { TextArea } = Input;
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const { MonthPicker } = DatePicker;

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
    if (['selectMultiple', 'select', 'radioGroup'].indexOf(info.type) > -1) {
      itemValue = typeof itemValue === 'number' ? itemValue.toString() : itemValue;
      itemValue = typeof itemValue === 'boolean' ? itemValue + '' : itemValue;
      itemValue = info.type === 'selectMultiple' && !itemValue ? [] : itemValue;
    } else if (['datePicker', 'monthPicker'].indexOf(info.type) > -1) {
      const format = typeof info.format === 'undefined' ? 'YYYY-MM-DD' : info.format;
      if(typeof itemValue !== 'object'){
        if(itemValue) {
          itemValue = moment(itemValue);
        }else{
          itemValue = null;
        }/*格式化时间*/
      }
    } else if (info.type === 'checkBox') {
      itemValue = !!itemValue;
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


  domAssembly = () => {
    const { changeValue, value, config, fileSpan, nameSpan } = this.props;
    return config.map((info, i) => {
      let fieldDom = null;
      const defaultProps = this.defaultPropsCount(info, value);
      switch (info.type) {
        case 'input': // 普通文本
          fieldDom = <Input {...defaultProps}
                            onChange={(e) => {
                              changeValue(e.target.value, info.key);
                            }}/>;
          break;
        case 'inputNumber': // 数字文本
          fieldDom = <Input type='number'
                            {...defaultProps}
                            onChange={(e) => {
                              changeValue(e.target.value, info.key);
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
          fieldDom = <SelectPeople onChange={changeValue}
                                   filedKey={info.key}
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
        case 'monthPicker': // 日期选择
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
        default:
          fieldDom = null;
          break;

      }
      return (
        <ColDom filedSpan={fileSpan} key={info.key + i}>
          <FormItemDom info={info} nameSpan={nameSpan}>
            {fieldDom}
          </FormItemDom>
        </ColDom>);
    });
  };

  render() {
    return (
      <div className={styles.FormArray}>
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
 *      datePicker日期选择  value 传入 时间戳格式
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
FormArray.propTypes = {
  config: PropTypes.array,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  changeValue: PropTypes.func,
  value: PropTypes.object,
  fileSpan: PropTypes.object,
  nameSpan: PropTypes.object,
};
FormArray.defaultProps = {
  config: [
    {
      name: '成绩排名',
      type: 'inputNumber',
      //required:true,
      placeholder: '',
      key: 'scoreRank',
    },

    {
      name: '成绩排名(总人数)',
      type: 'inputNumber',
      // required:true,
      placeholder: '',
      key: 'scoreRankCount',
    },
    {
      name: '必修课总门数',
      // required:true,
      type: 'inputNumber',
      key: 'requiredCourseCount',
    },
    /* {
       name: '　　　',
       type: 'asdasd',
       // required:true,
       placeholder: '',
       key: 'scoreRankCount2333',
     },*/
    {
      name: '必修课及格门数',
      type: 'inputNumber',
      //required:true,
      key: 'passCount',
    },
    {
      name: '成绩',
      type: 'inputNumber',
      //required:true,
      placeholder: '',
      key: 'scoreRank1',
    },
    {
      name: '成绩',
      type: 'input',
      //required:true,
      placeholder: '',
      key: 'scoreRank2',
    },
    {
      name: '成绩',
      type: 'inputNumber',
      //required:true,
      placeholder: '',
      key: 'scoreRank3',
    },
    {
      name: '成绩',
      type: 'inputNumber',
      //required:true,
      placeholder: '',
      key: 'scoreRank4',
    },
    {
      name: '成绩',
      type: 'datePicker',
      //required:true,
      placeholder: '',
      key: 'scoreRank5',
    },
    {
      name: '成绩',
      type: 'select',
      //required:true,
      placeholder: '',
      key: 'scoreRank6',
    }, {
      name: '成绩',
      type: 'selectMultiple',
      //required:true,
      placeholder: '',
      key: 'scoreRank7',
    }, {
      name: '成绩',
      type: 'inputNumber',
      //required:true,
      placeholder: '',
      key: 'scoreRank8',
    }, {
      name: '成绩',
      type: 'inputNumber',
      //required:true,
      placeholder: '',
      key: 'scoreRank9',
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
};
