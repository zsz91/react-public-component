import React, { Component } from 'react';
import {
  Form,
  Row,
  Col,
} from 'antd';
import DynamicComponent from '../CustomForm/DynamicComponent';
import PropTypes from 'prop-types';
import BlockTitle from '@/baseComponent/BlockTitle';
import styles from './AwardConfigs.less';
const FormItem = Form.Item;

@Form.create()
export default class StudyInfo extends Component{

  render() {
    const { isShowBlock, desc, title } = this.state;

    return (
      <div className={ isShowBlock ? '' : styles.configOut }>
        {this.props.children}
        {
          isShowBlock
            ? <BlockTitle title={title}/>
            : <div className={styles.configTitle}>
                <span>{title}</span>
                <span className={styles.desc}>{desc}</span>
              </div>
        }

        <div>
          <div>
            <span>本学年必修课程数</span>
            <span> 门， 其中，优秀</span>
            <span>门， 良好</span>
            <span>门</span>
          </div>
          <div>
            <span>成绩排名（</span>
            <span>）</span>
            <span>（名次/总人数）</span>
          </div>
          <div>
            <span>综合考评成绩</span>
            <span>分， 排名</span>
            <span>（名次/总人数）</span>
            <span>
              <span>（如无此项， 请选择</span>
              <span>无此项目）</span>
            </span>
          </div>
          <div>
            <span>本学年 上学期学分绩点  </span>
            <span>下学期学分绩点</span>
          </div>
        </div>
      </div>
    );
  }
}

StudyInfo.defaultProps = {
  lines: [
    [
      '本学年必修课程数',
      {},
      '门， 其中，优秀',
      {},
      '门， 良好',
      {},
      '门',
    ],
    [
      '成绩排名（',
      {},
      '）',
      '（名次/总人数）',
    ],
    [
      '综合考评成绩',
      {},
      '分， 排名',
      {},
      '（名次/总人数）',
      {
        line: [
          '（如无此项， 请选择',
          {},
          '无此项目）',
        ]
      }
    ],
  ],
};
