/**
 * 根据Props 实现表单的快速渲染.
 * 主要是传递每个字段的类型.
 * */
import { Row, Col, Form, Input, Select, DatePicker, Checkbox } from 'antd';
import React, { Component } from 'react';
import styles from './index.less';
import PropTypes from 'prop-types';
import moment from 'moment';

const Option = Select.Option;
const { TextArea } = Input;
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;

export default class FormAssembly extends Component{
  constructor(props){
    super(props);
    this.state={

    };

  }

  concatSpan = () => {
    let span = 0;
    const res = [[],];
    let i = 0;
    const {config} = this.props;
    config.forEach( (item) => {
      span += item.span;
      if(span < 24){
        res[i].push(item);
      }else{
        i += 1;
        res[i] = [];
        span = 0 + item.span;
        res[i].push(item);
      }
    });
    return res;
  };

  datePickerOnchange = (dateString, key) => {
    const { changeValue } = this.props;
    changeValue(dateString,key);
  };

  domAssembly = () => {
    const row = this.concatSpan();
    const { changeValue,value,readOnly, disabled } = this.props;
    return row.map((item) => {
      return <Row key={item[0].key}>
        {
            item.map( (info) => {
              switch(info.type){
                case 'input': //普通文本
                  return <Col span={info.span}
                              key={info.key}>
                    <FormItem label={info.name}
                              required={info.required || false}
                              labelCol={{span: 8}}
                              className={styles.magBottom15}
                              wrapperCol={{span: 16}}
                              style={{}}
                    ><Input value={value[info.key]}
                            readOnly={ readOnly }
                            disabled={ disabled || false }
                            placeholder={info.placeholder}
                            onChange={(e)=>{changeValue(e.target.value, info.key)}}/>
                    </FormItem>
                  </Col>;
                case 'inputNumber': //数字文本
                  return <Col span={info.span}
                              key={info.key}>
                    <FormItem label={info.name}
                              required={info.required || false}
                              labelCol={{span: 8}}
                              className={styles.magBottom15}
                              wrapperCol={{span: 16}}
                    ><Input value={value[info.key]}
                            type='number'
                            readOnly={ readOnly }
                            placeholder={info.placeholder}
                            onChange={(e)=>{changeValue(e.target.value, info.key)}}/>
                    </FormItem>
                  </Col>;
                case 'checkBox': //多选 checkbox
                  return <Col span={info.span}
                              key={info.key}>
                    <FormItem label={info.name}
                              required={info.required || false}
                              labelCol={{span: 8}}
                              className={styles.magBottom15}
                              wrapperCol={{span: 16}}
                    ><CheckboxGroup value={value[info.key]}
                                    type='number'
                                    disabled={ readOnly }
                                    placeholder={info.placeholder}
                                    options={info.options}
                                    onChange={(value)=>{changeValue(value, info.key)}}/>
                    </FormItem>
                  </Col>;
                case 'selectMultiple': //下拉多选
                  return <Col span={info.span}
                              key={info.key}>
                    <FormItem label={info.name}
                              required={info.required || false}
                              labelCol={{span: 8}}
                              className={styles.magBottom15}
                              wrapperCol={{span: 16}}
                    ><Select value={value[info.key]}
                             mode="multiple"
                             disabled={readOnly}
                             style={{ width: '100%' }}
                             placeholder={info.placeholder}
                             onChange={(value)=>{changeValue(value, info.key)}}>
                      {info.options.map((optionItem) => {
                        return <Option key={optionItem.key}>
                                    {optionItem.name}
                               </Option>
                      })}

                    </Select>
                    </FormItem>
                  </Col>;
                case 'select': //下拉单选
                  return <Col span={info.span}
                              key={info.key}>
                    <FormItem label={info.name}
                              required={info.required || false}
                              labelCol={{span: 8}}
                              className={styles.magBottom15}
                              wrapperCol={{span: 16}}
                    ><Select value={value[info.key]}
                             style={{ width: '100%' }}
                             disabled={readOnly}
                             placeholder={info.placeholder}
                             onChange={(value)=>{changeValue(value, info.key)}}>
                      {info.options.map((optionItem) => {
                        return <Option key={optionItem.key}>
                          {optionItem.name}
                        </Option>
                      })}

                    </Select>
                    </FormItem>
                  </Col>;
                case 'bool': //布尔值选择
                  return <Col span={info.span}
                              key={info.key}>
                    <FormItem label={info.name}
                              required={info.required || false}
                              labelCol={{span: 8}}
                              className={styles.magBottom15}
                              wrapperCol={{span: 16}}
                    ><Checkbox checked={value[info.key]}
                               disabled={ readOnly || typeof info.readOnly !== 'undefined' ? info.readOnly : false }
                               onChange={(e)=>{changeValue(e.target.value, info.key)}}>
                      {info.text}
                    </Checkbox>
                    </FormItem>
                  </Col>;
                case 'textarea': //多行文本框输入
                  return <Col span={info.span}
                              key={info.key}>
                    <FormItem label={info.name}
                              required={info.required || false}
                              labelCol={{span: 4}}
                              className={styles.magBottom15}
                              wrapperCol={{span: 20}}
                    ><TextArea value={value[info.key]}
                               readOnly={readOnly}
                               rows={8}
                               onChange={(e)=>{changeValue(e.target.value, info.key)}}>
                    </TextArea>
                    </FormItem>
                  </Col>;
                case 'datePicker': //日期选择
                  return <Col span={info.span}
                              key={info.key}>
                    <FormItem label={info.name}
                              required={info.required || false}
                              labelCol={{span: 8}}
                              className={styles.magBottom15}
                              wrapperCol={{span: 16}}
                    ><DatePicker value={value[info.key] ?  moment(value[info.key], info.format) : null}
                                 showTime={info.showTime}
                                 disabled={readOnly}
                                 format={info.format}
                                 onChange={(date,dateString)=>{this.datePickerOnchange(dateString, info.key)}}>
                    </DatePicker>
                    </FormItem>
                  </Col>;
                default:
                  return null;

              }

            })
          }
      </Row>
    });
  };

  render(){
    const dom = this.domAssembly();
    return (
      <div>{dom}</div>
    );
  }
}

FormAssembly.propTypes = {
  config: PropTypes.array,
  changeValue: PropTypes.func,
  value: PropTypes.object,
  readOnly:PropTypes.bool,
  disabled:PropTypes.bool,
};
FormAssembly.defaultProps = {
  readOnly: false,
  disabled: false,
  config:[
    {
      span: 11,
      name: '成绩排名(名次)',
      type: 'inputNumber',
      required:true,
      placeholder: '',
      key: 'scoreRank',
    },
    {
      span: 11,
      name: '成绩排名(总人数)',
      type: 'inputNumber',
      required:true,
      placeholder: '',
      key: 'scoreRankCount',
    },
    {
      span: 11,
      name: '必修课总门数',
      required:true,
      type: 'inputNumber',
      key: 'requiredCourseCount',
    },
    {
      span: 11,
      name: '必修课及格门数',
      type: 'inputNumber',
      required:true,
      key: 'passCount',
    }

  ],
  changeValue: (value, key) => {

  },
  value: {

  },
};
