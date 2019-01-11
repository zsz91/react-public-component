/**
 * 根据Props 实现表单的快速渲染.
 * 主要是传递每个字段的类型.
 *
 * */
import { Row, Col, Form, Input, Select, DatePicker, Checkbox, Button } from 'antd';
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
    const {config,} = this.props;
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
            let itemDisabled = disabled ;
            if(typeof info.disabled !== 'undefined'){
              itemDisabled = info.disabled;
            }
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
                          disabled={ itemDisabled }
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
                          disabled={ itemDisabled }
                          placeholder={info.placeholder}
                          onChange={(e)=>{changeValue(e.target.value, info.key)}}/>
                  </FormItem>
                </Col>;
              case 'checkBox': //多选 checkbox
                typeof value[info.key] === 'number' ? value[info.key] = value[info.key].toString() : value[info.key] ;
                return <Col span={info.span}
                            key={info.key}>
                  <FormItem label={info.name}
                            required={info.required || false}
                            labelCol={{span: 8}}
                            className={styles.magBottom15}
                            wrapperCol={{span: 16}}
                  ><CheckboxGroup value={value[info.key]}
                                  type='number'
                                  disabled={ itemDisabled }
                                  placeholder={info.placeholder}
                                  options={info.options}
                                  onChange={(value)=>{changeValue(value, info.key)}}/>
                  </FormItem>
                </Col>;
              case 'selectMultiple': //下拉多选
                typeof value[info.key] === 'number' ? value[info.key] = value[info.key].toString() : value[info.key] ;
                return <Col span={info.span}
                            key={info.key}>
                  <FormItem label={info.name}
                            required={info.required || false}
                            labelCol={{span: 8}}
                            className={styles.magBottom15}
                            wrapperCol={{span: 16}}
                  ><Select value={value[info.key]}
                           mode="multiple"
                           allowClear
                           disabled={ itemDisabled }
                           style={{ width: '100%' }}
                           placeholder={info.placeholder}
                           onChange={(value)=>{changeValue(value, info.key)}}>
                    {info.options.map((optionItem) => {
                      return <Option key={optionItem.key.toString()}>
                        {optionItem.name}
                      </Option>
                    })}

                  </Select>
                  </FormItem>
                </Col>;
              case 'select': //下拉单选
                typeof value[info.key] === 'number' ? value[info.key] = value[info.key].toString() : value[info.key] ;
                return <Col span={info.span}
                            key={info.key}>
                  <FormItem label={info.name}
                            required={info.required || false}
                            labelCol={{span: 8}}
                            className={styles.magBottom15}
                            wrapperCol={{span: 16}}
                  ><Select value={value[info.key]}
                           style={{ width: '100%' }}
                           allowClear
                           disabled={ itemDisabled }
                           placeholder={info.placeholder}
                           onChange={(value)=>{changeValue(value, info.key)}}>
                    {info.options.map((optionItem) => {
                      return <Option key={optionItem.key.toString()}>
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
                             disabled={ itemDisabled }
                             onChange={(e)=>{changeValue(e.target.value, info.key)}}>
                    {info.text}
                  </Checkbox>
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
                               disabled={ itemDisabled }
                               format={info.format}
                               onChange={(date,dateString)=>{this.datePickerOnchange(dateString, info.key)}}>
                  </DatePicker>
                  </FormItem>
                </Col>;
              case 'button':
                return <Col span={info.span}
                            className={styles.buttonCol}
                            key={info.key}>
                  <Button onClick={()=>{info.click()}}
                          type={info.buttonType}
                          className={styles.buttonStyle}
                  >
                    {info.name}
                  </Button>
                </Col>
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
/**
 * 最主要的 props 就是config.
 * config: 表单填写的每一个字段,根据type的不同渲染不同的组件,
 * 包含 [inputNumber(数字input),input,
 *      selectMultiple(多选下拉),select(单选下拉)
 *      checkBox(单选checkbox),
 *      datePicker日期选择
 *      button 按钮
 * 具体请查看下面的demo
 *
 * changeValue: 表单的值改变后的回调
 * value : 表单的值应该是一个对象state {name:'',phone:''....}
 * readOnly: 该表单是否全部只读
 * disabled: 该表单是否全部disabled
 * smallScreen: 设置1366*768的屏幕 每一行显示几个字段  如 只显示3个 则 = 3
 * bigScreen: 设置1920*1080的屏幕  每一行显示几个字段 同上
 * */
FormAssembly.propTypes = {
  config: PropTypes.array,
  changeValue: PropTypes.func,
  value: PropTypes.object,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  smallScreen: PropTypes.number,
  bigScreen: PropTypes.number,
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
  smallScreen: 4,
  bigScreen: 6,
};
