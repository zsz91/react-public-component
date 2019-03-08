import React, { Component } from 'react';
import { Row, Col } from 'antd';
import styles from './index.less';
import passImg from './pass.png';
import notPassImg from './notPass.png';

export default class PrintTableItem extends Component{
  constructor() {
    super();
  }

  render() {
    const {
      leaveLinkName, handleExplain, handleDescribe, transactionState, isPrint
    } = this.props;

    return (
      <Row className={styles.departmentItem}>
        <Col span={4} className={styles.departmentName}>
          {leaveLinkName}
        </Col>
        <Col span={20} className={styles.departmentContent}>
          <div>内容：{handleExplain}</div>
          <div>
            {
              transactionState == 1
              ? <img src={passImg}/>
              : isPrint
                ? null
                :<img src={notPassImg}/>
            }

            <div dangerouslySetInnerHTML = {{ __html: handleDescribe }} />
          </div>
        </Col>
      </Row>
    )
  }
}
