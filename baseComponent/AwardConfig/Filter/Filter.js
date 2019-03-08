import React, { Component } from 'react';
import {
  Row,
  Col
} from 'antd';
import Poor from './Poor';
import PropTypes from 'prop-types';

export default class Filter extends Component{
  render() {
    let filterDom = null;
    const { filterType } = this.props;

    switch (filterType) {
      case 'poor':
        filterDom = <Poor />;
        break;
      default:
        break;
    }
    return (
      <Row gutter={20} style={{background: '#F3F6F9', 'margin': '0 0 10px', padding: '12px 0'}}>
        <Col xl={5} xxl={4}>
          <span style={{color: '#487EB4'}}>可启用评选条件限制</span>
        </Col>
        <Col xl={19} xxl={20}>
          {filterDom}
        </Col>
      </Row>
    );
  }
}

Filter.propTypes = {
  filterType: PropTypes.string,
};
Filter.defaultProps = {
  filterType: '',
};
