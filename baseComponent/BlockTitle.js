import React, { Component } from 'react';
import styles from './index.less';
import PropTypes from 'prop-types';

export default class BlockTitle extends Component {



  render(){
    const {title} = this.props;
    return (
      <div className={styles.blockTitle}>
        {title}
      </div>
    );
  }
}
BlockTitle.propTypes = {
  title: PropTypes.string.isRequired, //

};
BlockTitle.defaultProps = {
  title: '奖学金申请审批表打印',
};
