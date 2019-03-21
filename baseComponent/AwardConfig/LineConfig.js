import React, { Component, Fragment } from 'react';
import {
  Form,
  Row,
  Col,
} from 'antd';
import DynamicComponent from '../CustomForm/DynamicComponent';
import PropTypes from 'prop-types';
import BlockTitle from '@/baseComponent/BlockTitle';
import styles from './AwardConfigs.less';
import CustomMultiple from '../CustomMultiple';
import { getFormElemValue } from '../utils';
const FormItem = Form.Item;

@Form.create()
export default class LineConfig extends Component{
  constructor(props) {
    super(props);

    this.state = {
      data: props.data || {}
    }
  }

  getData = () => {
    const data = this.state.data;


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

    if (['input', 'inputNumber', 'select', 'editable', 'textarea'].includes(type)) {
      result = {value: value};
    } else if (['checkbox'].includes(type)) {
      result = {checked: value};
    } else if (['datePicker', 'monthPicker'].includes(type)) {
      result = {value: moment(value)};
    }

    return result;
  };

  handlerMultipleChange = (rows, key) => {
    this.setState({
      data: {
        ...this.state.data,
        [key]: rows,
      }
    })
  };

  componentDidMount() {
    const { onRef, name } = this.props;

    onRef && onRef(name, this);
  }

  getDom = () => {
    const { lines } = this.props;

    return (
      <Fragment>
        {
          lines.map((item, idx)=>{
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

  getLine(line, index=0){
    const { style, form:{ getFieldDecorator }, disabled, readOnly } = this.props;

    return (
      <Fragment>
        {
          line.map((item,idx) => {
            let dom;
            const key = `${index}_${idx}`;
            if (typeof item === 'string') {
              dom = <span key={key}>{item}</span>;
            } else if (item.type === 'line'){
              if(readOnly && item.line && item.line.length >= 2 && item.line[1].key === 'noThisProject'){
                // 审核时 屏蔽 部门数据
                dom =  null;
              }else{
                dom = <span key={key}
                            style={item.style}>
                  {this.getLine(item.line, key)}
                </span>;
              }
            } else if (item.type === 'customMultiple') {
              const multipleList = this.state.data[item.key] || [];

              dom = <CustomMultiple key={item.key}
                                    onChange={(rows)=>{
                                      this.handlerMultipleChange(rows, item.key);
                                    }}
                                    readOnly={readOnly}
                                    disabled={disabled}
                                    multipleList={multipleList}
                                    {...item.config}
              />
            } else {
              !item.config && (item.config={});
              item.config.style = Object.assign({}, style, item.config.style || {});
              const config = Object.assign({disabled: disabled},
                item.config,
                this.inputDefaultProps(item.type, item.key));
              dom = <FormItem key={key}
                              className={`${item.type === 'textarea'? styles.hasTextarea : ''}`}>
                      {
                        getFieldDecorator(item.key)(
                          <DynamicComponent type={item.type}
                                            config={config}
                                            onChange={(e,other) => {
                                              this.stateChange(item.key, item.type, e, other);
                                            }}
                          />
                        )
                      }
                    </FormItem>;
            }

            return dom;
          })
        }
      </Fragment>
    );
  }

  render() {
    const { isShowBlock, desc, title, readOnly } = this.props;
    return (
      <div>
        {this.props.children}
        <div className={ isShowBlock ? '' : styles.configOut }>
          {
            isShowBlock
              ? <BlockTitle title={title}/>
              : <div className={styles.configTitle}>
                <span>{title}</span>
                { readOnly ? null :  <span className={styles.desc}>{desc}</span> }
              </div>
          }

          <div>
            <Form layout="inline" style={{lineHeight: '40px'}}>
              {
                this.getDom()
              }
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

LineConfig.defaultProps = {
  style: {
    width: '50px',
    margin: '0 10px'
  },
  isShowBlock: false,
  disabled:false,
  lines: [
    [
      '本学年必修课程数',
      {
        key:'A',
        type: 'inputNumber',
      },
      '门， 其中，优秀',
      {
        key:'B',
        type: 'inputNumber',
      },
      '门， 良好',
      {
        key:'C',
        type: 'inputNumber',
      },
      '门',
    ],
    [
      '成绩排名（',
      {
        key:'D',
        type: 'inputNumber',
      },
      '）',
      '（名次/总人数）',
    ],
    [
      '综合考评成绩',
      {
        key:'E',
        type: 'inputNumber',
      },
      '分， 排名',
      {
        key:'F',
        type: 'inputNumber',
      },
      '（名次/总人数）',
      {
        type: 'line',
        style:{
          color: '#487EB4',
        },
        line: [
          '（如无此项， 请选择',
          {
            key:'G',
            type: 'inputNumber',
          },
          '无此项目）',
        ]
      }
    ],
  ],
};
