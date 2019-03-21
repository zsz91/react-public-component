import React, { Component } from 'react';
import {
  Form,
  Row,
  Col,
} from 'antd';
import DynamicComponent from '../CustomForm/DynamicComponent';
import PropTypes from 'prop-types';
import styles from './AwardConfigs.less';
import { getFormElemValue } from '../utils';
import moment from 'moment';

const FormItem = Form.Item;

@Form.create()
export default class EasyConfig extends Component{
  constructor(props) {
    super(props);

    this.state = {
      data: props.data || {}
    }
  }


  getData = () =>{
    const { data } = this.state;

    return data;
  };

  stateChange = (key, type, e, other) =>{
    let value = getFormElemValue(type, e, other);
    let oldValue = this.state.data;
    oldValue[key] = value;
    this.setState({
      data: oldValue,
    });
  };

  inputDefaultProps = (type, key) => {
    const { data } = this.state || {};
    const value = data[key];
    let result;

    if (!value){
      return null;
    }
    if (['input', 'inputNumber', 'select', 'editable', 'textarea', 'buttonUpload'].includes(type)) {
      result = {value: value};
    } else if (['checkbox'].includes(type)) {
      result = {checked: value};
    } else if (['datePicker', 'monthPicker'].includes(type)) {
      result = {value: moment(value)};
    }

    return result;
  };

  componentDidMount() {
    const { onRef, name } = this.props;

    onRef && onRef(name, this);
  }

  render() {
    const { title, fields, form: { getFieldDecorator }, disabled, readOnly } = this.props;

    return (
      <Row className={styles.easyConfig}>
        <Col xl={3} xxl={2} className={styles.left}>
          <span>
            {title}
          </span>
        </Col>
        <Col xl={21} xxl={22} className={styles.right}>
          <Form layout="inline">

            {
              fields.map((item, idx) => {
                return (
                  <Col key={idx}>
                    {
                      item.map(config => {
                        const configs = Object.assign(
                          {disabled: disabled},
                          config.config,
                          this.inputDefaultProps(config.type, config.key));
                        return (
                          <FormItem key={config.key}
                                    label={config.name}
                                    className={styles[config.className] || ''}
                                    style={config.style || null}
                                    colon={false}>
                            <DynamicComponent type={config.type}
                                              readOnly={readOnly}
                                              config={configs}
                                              onChange={(e,other) => {
                                                this.stateChange(config.key, config.type, e, other);
                                              }}
                            />
                          </FormItem>
                        )
                      })
                    }
                  </Col>
                )
              })
            }

          </Form>
        </Col>
      </Row>
    );
  }
}

EasyConfig.propTypes = {
  title: PropTypes.string,  // 标题
  fields: PropTypes.array,  // 显示字段
};
EasyConfig.defaultProps = {
  title: '',
  data: {},
  disabled: false,
  fields: [
    // [
    //   {
    //     name: '证书名称',
    //     type: 'input',
    //     key: 'name',
    //   },
    //   {
    //     key: 'time',
    //     name: '获奖年月',
    //     type: 'monthPicker',
    //   },
    //   {
    //     key: 'score',
    //     name: '分数',
    //     type: 'inputNumber',
    //     config: {
    //       min: 0,
    //     }
    //   },
    // ],
    // [
    //   {
    //     key: 'pic',
    //     name: '证书照片',
    //     type: 'upload',
    //     config: {
    //       valuePropName: 'fileList',
    //     },
    //   }
    // ]
  ]
};
