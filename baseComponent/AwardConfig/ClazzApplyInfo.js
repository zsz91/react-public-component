import React, { Component } from 'react';
import {
  Form,
  Row,
  Col,
  InputNumber,
} from 'antd';
import DynamicComponent from '../CustomForm/DynamicComponent';
import PropTypes from 'prop-types';
import BlockTitle from '@/baseComponent/BlockTitle';
import styles from './AwardConfigs.less';
import CustomMultiple from '../CustomMultiple';

export default class ClazzApplyInfo extends Component{
  constructor(props) {
    super(props);

    this.state = {
      data: props.data || {}
    }
  }

  getData = () => {
    const { data } = this.state;

    return data;
  };

  componentDidMount() {
    const { onRef, name } = this.props;

    onRef && onRef(name, this);
  }

  formChange = (key, value) =>{
    const oldValue = this.state.data;

    oldValue[key] = value;

    this.setState({
      data: oldValue,
    })
  };

  render() {
    const { isShowBlock, desc, title, disabled } = this.props;
    const { data } = this.state;
    const span = 12;

    return (
      <div className={styles.clazzApplyInfo}>
        {this.props.children}
        <div className={ isShowBlock ? '' : styles.configOut }>
          {
            isShowBlock
              ? <BlockTitle title={title}/>
              : <div className={styles.configTitle}>
                <span>{title}</span>
                <span className={styles.desc}>{desc}</span>
              </div>
          }

          <Row>
            <Col span={span} style={{border: 0}}>
              <span className={styles.label}>学年</span>
              <div>{data.schoolYear}</div>
            </Col>
          </Row>
          <Row>
            <Col span={span}>
              <span className={styles.label}>班级</span>
              <div>{data.clazzName} <span className={styles.cRed}>()</span></div>
            </Col>
            <Col span={span}>
              <span className={styles.label}>班级人数</span>
              <div>
                <span className={styles.centerTextBox}>{data.clazzStuNum}</span>
                人
              </div>
            </Col>
            <Col span={span}>
              <span className={styles.label}>党员人数</span>
              <div>
                <InputNumber value={data.partyMember}
                             disabled={disabled}
                             onChange={(val)=>{
                               this.formChange('partyMember', val);
                             }}
                />
                比例
                <span className={`${styles.cRed} ${styles.centerTextBox}`}>{((data.partyMember/data.clazzStuNum*100)||0).toFixed(2)}</span>
                %
              </div>
            </Col>
            <Col span={span}>
              <span className={styles.label}> 重修率 </span>
              <div>
                <InputNumber value={data.retakeNum}
                             disabled={disabled}
                             onChange={(val)=>{
                               this.formChange('retakeNum', val);
                             }}
                />
                /
                <InputNumber value={data.totalNum}
                             disabled={disabled}
                             onChange={(val)=>{
                               this.formChange('totalNum', val);
                             }}
                />
                <span className={styles.cRed}> 重修课门次/总修课门次 </span>
                比例
                <span className={`${styles.cRed} ${styles.centerTextBox}`}>
                  { ((data.retakeNum/data.totalNum*100) || 0).toFixed(2)}
                </span>
                %
              </div>
            </Col>
            <Col span={span}>
              <span className={styles.label}>文明宿舍人数</span>
              <div>
                上学期
                <InputNumber value={data.preCivilizeDormNum}
                             disabled={disabled}
                             onChange={(val)=>{
                               this.formChange('preCivilizeDormNum', val);
                             }}
                />
                下学期
                <InputNumber value={data.nextCivilizeDormNum}
                             disabled={disabled}
                             onChange={(val)=>{
                               this.formChange('nextCivilizeDormNum', val);
                             }}
                />
                比例
                <span className={`${styles.cRed} ${styles.centerTextBox}`}>
                  { (((data.preCivilizeDormNum+data.nextCivilizeDormNum)/2/data.clazzStuNum*100) || 0).toFixed(2) }
                </span>
                %
              </div>
            </Col>
            <Col span={span}>
              <span className={styles.label}>综合奖学金获得人数</span>
              <div>
                上学期
                <InputNumber value={data.preAwardGetNum}
                             disabled={disabled}
                             onChange={(val)=>{
                               this.formChange('preAwardGetNum', val);
                             }}
                />
                下学期
                <InputNumber value={data.nextAwardGetNum}
                             disabled={disabled}
                             onChange={(val)=>{
                               this.formChange('nextAwardGetNum', val);
                             }}
                />
                比例
                <span className={`${styles.cRed} ${styles.centerTextBox}`}>
                         { (((data.preAwardGetNum+data.nextAwardGetNum)/2/data.clazzStuNum*100) || 0).toFixed(2)}
                </span>
                %
              </div>
            </Col>
            <Col span={span}>
              <span className={styles.label}>受学籍处理人数</span>
              <div>
                <InputNumber value={data.violateNum}
                             disabled={disabled}
                             onChange={(val)=>{
                               this.formChange('violateNum', val);
                             }}
                />
              </div>
            </Col>
            <Col span={span}>
              <span className={styles.label}>受记录处理人数</span>
              <div>
                <InputNumber value={data.notesNum}
                             disabled={disabled}
                             onChange={(val)=>{
                               this.formChange('notesNum', val);
                             }}
                />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

ClazzApplyInfo.defaultProps = {
  disabled: false,
  data: {
    schoolYear: '2018-2019学年',
    clazzName: '藏药学2015',
    clazzStuNum: 41,
    partyMember: 5,
    retakeNum: 3,
    totalNum: 6,
    preCivilizeDormNum: 12,
    nextCivilizeDormNum: 12,
    preAwardGetNum: 12,
    nextAwardGetNum: 14,
    violateNum: 8,
    notesNum: 9
  }
};
