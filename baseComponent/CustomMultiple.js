import React, { Component, Fragment } from 'react';
import {
  Row,
  Col,
  Icon,
  Form,
  message,
} from 'antd';
import DynamicComponent from './CustomForm/DynamicComponent';
import styles from './index.less';
import ButtonDiy from '@/baseComponent/ButtonDiy';
import { getFormElemValue } from './utils';

const FormItem = Form.Item;

export default class CustomMultiple extends Component{
  state = {
    formValues: {},
    activeIdx: null,
    fileElem: [],
  };

  valueFormat = (key, type, e, other) => {
    let value = getFormElemValue(type, e, other);

    if (type === 'buttonUpload') {
      this.setState({
        fileElem: [...new Set([...this.state.fileElem, other])]
      });
    }

    this.formChange(value, key);
  };

  formChange = (value, key) => {
    let oldValue = this.state.formValues;
    oldValue[key] = value;
    this.setState({
      formValues: oldValue,
    });
  };

  configDom = () => {
    const { inputItems,readOnly } = this.props;
    const { formValues } = this.state;
    if(readOnly){
      return null;
    }
    return (
      inputItems.map((line, idx)=>{
        return (
          <div key={idx}>
            {
              line.map((item) => {
                return (
                  <Fragment key={item.key}>
                    <span style={{lineHeight: '40px'}}>{item.name} </span>
                    <FormItem colon={false}>
                      <DynamicComponent {...item} onChange={(e,other) => {
                        this.valueFormat(item.key, item.type, e, other);
                      }}/>
                      {item.suff}
                    </FormItem>
                  </Fragment>
                )
              })
            }
          </div>
        )
      })
    )
  };

  move = (flag = -1) => {
    const { onChange, multipleList } =  this.props;
    const { activeIdx } = this.state;
    const rows = JSON.parse(JSON.stringify(multipleList));

    if (activeIdx === null
      || (flag === -1 && activeIdx<1)
      || (flag === 1 && multipleList.length-1<=activeIdx)
    ) {
      return
    }

    ([rows[activeIdx], rows[activeIdx+flag]] = [rows[activeIdx+flag], rows[activeIdx]]);
    this.setState({
      activeIdx: activeIdx+flag
    });
    onChange && onChange(rows);
  };

  addRow = () => {
    const { onChange, multipleList, inputItems } =  this.props;
    const { formValues, fileElem } = this.state;
    for(let x of inputItems){
      for(let item of x){
        if(item.required && !formValues[item.key]){
          message.warning(`${item.name}是必填项,请填写后再添加!`);
          return false;
        }
      }
    }
    const rows = JSON.parse(JSON.stringify(multipleList));

    rows.unshift(JSON.parse(JSON.stringify(formValues)));

    fileElem.map(item=>{
      item.value = '';
    });

    onChange && onChange(rows);
  };

  deleteRow = () => {
    const { onChange, multipleList } =  this.props;
    const { activeIdx } = this.state;
    const rows = JSON.parse(JSON.stringify(multipleList));

    if (activeIdx === null) return;

    rows.splice(activeIdx, 1);
    this.setState({
      activeIdx: null
    });
    onChange && onChange(rows);
  };

  chooseLine = (idx) => {
    this.setState({
      activeIdx: idx
    })
  };

  getKeys = () => {
    const { inputItems } = this.props;
    const keys = [];

    inputItems.map(line=>{
      line.map(item => {
        keys.push(item.key);
      });
    });

    return { keys };
  };

  showFile = () => {
    const { activeIdx } = this.state;
    const { multipleList, prevKey } = this.props;

    if (activeIdx === null) return;

    window.open(multipleList[activeIdx][prevKey]);
  };

  render() {
    const { layout, multipleList, prevKey, disabled, readOnly } = this.props;
    const { activeIdx } = this.state;
    const buttonLaytout = {
      xl: 24 - layout.xl,
      xxl: 24 - layout.xxl
    };
    const { keys } = this.getKeys();
   // console.log(multipleList);
    return (
      <div className={styles.customMultiple}>
        <Row gutter={20} style={{display:'flex'}}>
          <Col {...layout}>
            {this.configDom()}
          </Col>
          <Col {...buttonLaytout} style={{alignSelf: 'flex-end'}}>
            {
              readOnly ? null :
            <ButtonDiy name="添加"
                       disabled={disabled}
                       handleClick={this.addRow}
                       className="defaultBlue"
            />
            }
            {
              prevKey
                ?<ButtonDiy name="查看证书"
                            handleClick={this.showFile}
                            className="defaultBlue"
                />
                :null
            }

          </Col>
        </Row>
        <Row gutter={20} style={{display: 'flex'}}>
          <Col {...layout} md={18}>
            <div className={styles.multipleBox}>
              {
                multipleList.map((item,idx) => {
                  return (
                    <div key={`${item}_${idx}`}
                         className={`${styles.multipleItem} ${ activeIdx===idx ? styles.active : '' }`}
                         onClick={()=>{
                           this.chooseLine(idx)
                         }}>
                      {
                        keys.map(name=>{
                          return <span key={name}>
                                  {
                                    name === 'nowOn'
                                      ? ''
                                      :(name === 'endYearMonth' && item['nowOn']
                                      ? '至今 '
                                      : `${ item[name] || ''} ${name==='fromYearMonth' ? '到 ': ''}`)
                                  }

                                </span>
                        })
                      }
                    </div>
                  )
                })
              }

            </div>
          </Col>
          {readOnly ? null :
            <Col {...buttonLaytout} className={styles.operationBtnBox}>
              <ButtonDiy name="上移"
                         disabled={disabled}
                         handleClick={() => {
                           this.move(-1)
                         }}
                         className="defaultBlue"
              />
              <ButtonDiy name="下移"
                         disabled={disabled}
                         handleClick={() => {
                           this.move(1)
                         }}
                         className="defaultBlue"
              />
              <ButtonDiy name="删除"
                         handleClick={() => {
                           this.deleteRow();
                         }}
                         disabled={disabled}
                         style={{ paddingRight: '29px' }}
                         className="defaultRed"
              />
            </Col>
          }
        </Row>
      </div>
    );
  }
}

CustomMultiple.defaultProps = {
  layout: {
    xl: 16,
    xxl: 16
  },
  prevKey: '',
  disabled:false,
  inputItems: [
    // { key: 'type', name: '课程性质', type: 'select', config: {options: [{key: '必修课', name: '必修课'}], style:{width: '100px'}} },
    // { key: 'name', name: '课程名称', type: 'input', config: {style:{width: '100px'}} },
    // { key: 'rank', name: '成绩', type: 'input', config: {style:{width: '100px'}} },
  ],
  multipleList: [
  ],
  onChange (){

  },
};
