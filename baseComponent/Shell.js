/**
 * 钟是志
 * 2019年1月10日
 * 一个方块就是一个Shell用于组件外层
 */

import React, { Component } from 'react';
import { Row, Col} from 'antd';
import styles from './index.less';

export default class Shell extends Component {


  render(){
    const {children,styleShell = {} } = this.props;
      return (
        <div className={styles.shell}
             style={styleShell}
        >
        <Row className={styles.row}>
          {children}
        </Row>
        </div>
          );
  }

}
