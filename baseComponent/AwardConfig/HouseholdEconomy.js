import React, { Component } from 'react';
import {
  Form,
  Row,
  Col,
  InputNumber,
} from 'antd';
import PropTypes from 'prop-types';
import BlockTitle from '@/baseComponent/BlockTitle';
import styles from './AwardConfigs.less';
import CascadeSearch from '@/baseComponent/CascadeSearch/CascadeSearch';

export default class HouseholdEconomy extends Component{
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data || {},
    }
  }

  formStateChange = (value, key) => {
    let oldValue = this.state.data;
    oldValue[key] = value;
    this.setState({
      data: oldValue,
    });
  };

  render() {
    const { fieldList, layout, disabled } = this.props;

    return (
      <div className={styles.clazzApplyInfo}>
        {this.props.children}
        {
          fieldList.map((item,idx) => {
            return (
              <CascadeSearch config={item}
                             disabled={disabled}
                             key={idx}
                             value={this.state.data}
                             changeValue={this.formStateChange}
                             {...layout[idx]}
              />
            )
          })
        }
      </div>
    );
  }
}
