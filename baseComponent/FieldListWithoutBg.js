/**
 * 根据Props 实现字段的快速渲染. 用于只读信息
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

export default class FieldListWithoutBg extends Component{
  constructor(props){
    super(props);
    this.state={
    };
  }

  domAssembly = () => {
    const {config, value, nameSpan, filedSpan} = this.props;
    const bigSpan = Math.ceil(24/filedSpan.big);
    const smallSpan = Math.ceil(24/filedSpan.small);
    let styleFiled5 = {};
    let styleFiled1 = {};
    if(document.body.clientWidth > 1400) {
      if(filedSpan.big === 5){
        styleFiled5 = {width: '20%'};
      }
      if(filedSpan.big === 1 && nameSpan.big === 2) {
        styleFiled1 = {width: '6%'};
      }
    }
    return config.map((item) => {
      return <Col xl={smallSpan}
                  xxl={bigSpan}
                  className={styles.withoutBgcolOut}
                  style={styleFiled5}
                  key={item.key}>
        <Row className={styles.withoutBgGroup}>
          <Col xl={nameSpan.small}
               xxl={nameSpan.big}
               className={styles.withoutBgName}
               style={styleFiled1}
          >
                <div>{item.name}</div>
          </Col>
          <Col span={24-nameSpan} className={styles.withoutBgDiscrib}>
            {value[item.key]}
          </Col>
        </Row>
      </Col>
    });
  };

  render(){
    const dom = this.domAssembly();
    return (
      <Row className={styles.FieldListWithoutBg}>
        {dom}
      </Row>
    );
  }
}
/**
 * config: 字段列表显示的每一个字段,具体请查看下面的demo
 * filedSpan 包含2个参数 {smallScreen: 4,bigScreen:5 }
 *           small: 设置1366*768的屏幕 每一行显示几个字段    只能在1,2,3,4之间取值  过大会导致页面排版不下
 *           big: 设置1920*1080的屏幕  同上               只能在1,2,3,4,5,6,之间取值 过大会导致页面排版不下
 * nameSpan: 字段名字的宽度. {big:4, small:5} 同上
 * value: 字段列表中每个字段的值 {name:'xxx', phone:'123123456',}
 *
 * */
FieldListWithoutBg.propTypes = {
  config: PropTypes.array,
  filedSpan: PropTypes.object,
  value: PropTypes.object,
  nameSpan: PropTypes.object,
};
FieldListWithoutBg.defaultProps = {
  nameSpan:{
    big:9,
    small:8,
  },
  filedSpan:{
    big:6,
    small:4,
  },
  config:[
    {
      name: '姓名',
      key: 'name',
    },
    {
      name: '学号',
      key: 'number',
    },
    {
      name: '年龄',
      key: 'age',
    },
    {
      name: '身份证号码',
      key: 'idCard',
    },
    {
      name: '必修课总门数',
      key: 'lessonNumber',
    },
    {
      name: '必修课及格数',
      key: 'lessonCount',
    },
    {
      name: '必修课数',
      key: 'lessonNumber2',
    },
    {
      name: '及格数',
      key: 'lessonCount2',
    }
  ],
  value: {
    name: '钟是志',
    number: '20091761',
    age: 28,
    idCard: '51102819900119001X',
    lessonNumber: '22',
    lessonCount: '22',
  },
};
