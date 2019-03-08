import React, { Component } from 'react';
import { Icon } from 'antd';
import styles from './index.less';
import PropTypes from 'prop-types';

export default class BlockTitle extends Component {



  render(){
    const { title, icon, isSmall } = this.props;
    return (
      <div className={`${styles.blockTitle} ${isSmall ? styles.isSmall : ''}`}>
        {
          icon ? <Icon type={icon} style={{marginRight: '5px'}}/> : null
        }
        {title}
      </div>
    );
  }
}
BlockTitle.propTypes = {
  title: PropTypes.string.isRequired, //
  isSmall: PropTypes.bool,
  icon: PropTypes.string,
};
BlockTitle.defaultProps = {
  title: '奖学金申请审批表打印',
  isSmall: false,
  icon: '',
};
