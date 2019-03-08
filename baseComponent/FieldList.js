/**
 * 根据Props 实现字段的快速渲染. 用于只读信息
 *
 * */
import { Row, Col, Form, Input, Select, DatePicker, Checkbox, Button } from 'antd';
import React, { Component } from 'react';
import styles from './index.less';
import PropTypes from 'prop-types';
import moment from 'moment';
import { countSpecialField } from './utils';
const Option = Select.Option;
const { TextArea } = Input;
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;

export default class FieldList extends Component{
  constructor(props){
    super(props);
    this.state={
    };
  }

  domAssembly = () => {
    const {config, filedSpan, value, nameSpan} = this.props;
    const bigSpan = Math.ceil(24/filedSpan.big);
    const smallSpan = Math.ceil(24/filedSpan.small);

    return config.map((item) => {
          return <Col xl={smallSpan}
                      className={styles.colOut}
                      xxl={bigSpan}
                      style={countSpecialField(filedSpan.big)}
                      key={item.key}>
                        <Row className={styles.group}>
                          <Col xl={nameSpan.small}
                               xxl={nameSpan.big}
                               className={styles.name}
                          >
                            <label>
                              {item.name}
                            </label>
                          </Col>
                          <Col xl={24 - nameSpan.small}
                               xxl={24 - nameSpan.big}
                               className={styles.discrib}>
                              {item.format ? item.format(value[item.key]): value[item.key]}
                          </Col>
                        </Row>
                 </Col>
    });
  };

  render(){
    const dom = this.domAssembly();
    return (
      <Row className={styles.FieldList}>
        {dom}
      </Row>
    );
  }
}
/**
 * 此组件用于 显示字段的信息 只读 字段名包含背景色和边框
 * props 备注
 * config: 字段列表显示的每一个字段,具体请查看下面的demo
 * filedSpan 包含2个参数 {big: 4,small:4 }
 *           small: 设置1366*768的屏幕 每一行显示几个字段    只能在1,2,3,4之间取值  过大会导致页面排版不下
 *           big: 设置1920*1080的屏幕  每一行显示几个字段    只能在1,2,3,4,5,6,之间取值 过大会导致页面排版不下
 * nameSpan: 字段名字的宽度. {big:4, small:5} 同上
 * value: 字段列表中每个字段的值 {name:'xxx', phone:'123123456',}
 *
 * */
/**
 * 2019/02/23
 * 赖井平 修改
 * value :{
 *   name: string,
 *   key: string,
 *   format: function  // 用于格式化显示
 * }
 *
 */
FieldList.propTypes = {
  config: PropTypes.array,
  value: PropTypes.object,
  filedSpan: PropTypes.object,
  nameSpan: PropTypes.object,
};
FieldList.defaultProps = {
  nameSpan:{
    big:8,
    small:9,
  },
  filedSpan: {
    big: 5,
    small: 4,
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
    }
  ],
  smallScreen: 4,
  bigScreen: 6,
  value: {
    name: '钟是志',
    number: '20091761',
    age: 28,
    idCard: '51102819900119001X',
    lessonNumber: '22',
    lessonCount: '22',
  },
};
