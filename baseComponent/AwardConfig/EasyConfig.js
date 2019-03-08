import React, { Component } from 'react';
import {
  Form,
  Row,
  Col,
} from 'antd';
import DynamicComponent from '../CustomForm/DynamicComponent';
import PropTypes from 'prop-types';
import styles from './AwardConfigs.less';
const FormItem = Form.Item;

@Form.create()
export default class EasyConfig extends Component{

  getFields = () =>{
    const { form } = this.props;

    console.log(form.getFieldsValue());
  };

  componentDidMount() {
    const { onRef, name } = this.props;

    onRef && onRef(name, this);
  }

  render() {
    const {
      title,
      fields,
      form: {
        getFieldDecorator
      }
    } = this.props;

    return (
      <Row className={styles.easyConfig}>
        <Col xl={3} xxl={2} className={styles.left}>
          <span>
            {title}
          </span>
        </Col>
        <Col xl={21} xxl={22}>
          <Form layout="inline" className={styles.right}>
            {
              fields.map((item, idx) => {
                return (
                  <Col key={idx}>
                    {
                      item.map(config => {
                        return (
                          <FormItem key={config.key} label={config.name} colon={false}>
                            {
                              getFieldDecorator(config.key, config.decoratorOptions || {})(
                                <DynamicComponent type={config.type} config={config.config}/>
                              )
                            }
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
