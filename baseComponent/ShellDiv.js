import React, { Component } from 'react';
import { Row, Col} from 'antd';
import styles from './index.less';

export default class Shell extends Component {

  constructor(props){
    super(props);
  }

  render(){
    const {children} = this.props;
      return (
        <div className={styles.outside}>
        <Row className={styles.shell}>
        {children}
          </Row>
        </div>);
  }
}
