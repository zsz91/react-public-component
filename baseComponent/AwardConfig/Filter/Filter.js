import React, { Component, Fragment } from 'react';
import {
  Row,
  Col,
  Form,
  Checkbox,
} from 'antd';
import PropTypes from 'prop-types';
import styles from '../AwardConfigs.less'
import CustomMultiple from '../../CustomMultiple';
import DynamicComponent from '../../CustomForm/DynamicComponent';
import {getFormElemValue} from '../../utils';
import moment from 'moment';

const CheckboxGroup = Checkbox.Group;

export default class Filter extends Component{
  constructor(props) {
    super(props);

    this.state = {
      data: props.data || {}
    }
  }

  getData = () => {
    return this.state.data;
  };

  componentDidMount() {
    const { onRef, name } = this.props;

    onRef && onRef(name, this);
  }

  stateChange = (key, type, e, other) =>{
    let value = getFormElemValue(type, e, other);
    let oldValue = this.state.data;
    oldValue[key] = value;
    this.setState({
      data: oldValue,
    });
  };

  handlerMultipleChange = (rows, key) => {
    this.setState({
      data: {
        ...this.state.data,
        [key]: rows,
      }
    })
  };

  getDom = () => {
    const { filterLines } = this.props;

    return (
      <Fragment>
        {
          filterLines.map((item, idx)=>{
            return (
              <div key={idx}>
                {this.getLine(item)}
              </div>
            )
          })
        }
      </Fragment>
    )
  };

  inputDefaultProps = (type, key) => {
    const { data } = this.state || {};
    const value = data[key];
    let result;

    if (['input', 'inputNumber', 'select', 'editable', 'textarea'].includes(type)) {
      result = {value: value};
    } else if (['checkbox'].includes(type)) {
      result = {checked: value};
    } else if (['datePicker', 'monthPicker'].includes(type)) {
      result = {value: moment(value)};
    }

    return result;
  };

  getLine = (line, index=0) => {

    return (
      <Fragment>
        {
          line.map((item,idx) => {
            let dom;

            const key = `${index}_${idx}`;
            if (typeof item === 'string') {
              dom = <span key={key}>{item}</span>;
            } else if (item.type === 'line'){
              dom = <span key={key} style={item.style}>{this.getLine(item.line, key)}</span>;
            } else if (item.type === 'customMultiple') {
              const multipleList = this.state.data[item.key] || [];
              dom = <Form layout="inline" key={item.key}>
                <CustomMultiple
                                onChange={(rows)=>{
                                  this.handlerMultipleChange(rows, item.key);
                                }}
                                multipleList={multipleList}
                                {...item.config}
                />
              </Form>
            } else {
              const config = Object.assign({}, item.config, this.inputDefaultProps(item.type, item.key));
              dom = <DynamicComponent key={key}
                                      type={item.type}
                                      config={config}
                                      onChange={(e,other) => {
                                        this.stateChange(item.key, item.type, e, other);
                                      }}
              />;
            }

            return dom;
          })
        }
      </Fragment>
    );
  }

  render() {
    const { filterLabelHide } = this.props;

    return (
      <Row gutter={20} className={styles.teacherConfig}>
        {
          filterLabelHide
            ?<Fragment>
              <Col span={23} offset={1}>
                  {this.getDom()}
              </Col>
            </Fragment>
            :<Fragment>
              <Col xl={5} xxl={4}>
                <span style={{color: '#487EB4'}}>可启用评选条件限制</span>
              </Col>
              <Col xl={19} xxl={20}>
                  {this.getDom()}
              </Col>
            </Fragment>
        }

      </Row>
    );
  }
}

Filter.propTypes = {
};
Filter.defaultProps = {
  filterLabelHide: false,
  filterLines: [
    [
      {
        type: 'checkbox',
        key: 'poor',
        config: {
          title: '是家庭经济认证困难学生'
        }
      }
    ]
  ],
  onRef: ()=>{},
  name: '',
};
