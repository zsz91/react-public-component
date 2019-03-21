import React, { Component, Fragment } from 'react';
import { Collapse, Checkbox, Icon } from 'antd';
import PropTypes from 'prop-types';
import styles from './CheckModules.less';

const Panel = Collapse.Panel;

export default class CheckModulesItem extends Component{
  state = {
    isShowDetail: true,
    activeKey: '',
  };

  changeShowState = (key) => {
    this.setState({
      activeKey: key,
    })
  };

  getHeaderDom() {
    const { checkboxAttr, data } = this.props;
    const { activeKey } = this.state;

    return (
      <div className={styles.headerBox}>
        <Checkbox checked={data[checkboxAttr.value]}
                  disabled={checkboxAttr.disabled}
                  onChange={(e)=>{
                    this.props.onChange(e.target.checked, checkboxAttr.value);
                  }}
        >
          {checkboxAttr.title}
        </Checkbox>
        {
          activeKey
            ?<div className={styles.zoomBtn} onClick={()=>{this.changeShowState(null)}}>
              <Icon type="up" />
              <span>收起</span>
            </div>
            :<div className={styles.zoomBtn} onClick={()=>{this.changeShowState(checkboxAttr.value)}}>
              <Icon type="down" />
              <span>展开</span>
            </div>
        }
      </div>
    )
  };

  render() {
    const { activeKey } = this.state;
    const { checkboxAttr } = this.props;

    const header = this.getHeaderDom();

    return (
      <Collapse activeKey={activeKey} className={styles.customCollapse}>
        <Panel key={checkboxAttr.value} header={header} showArrow={false} disabled={true}>
          { this.props.children }
        </Panel>
      </Collapse>
    );
  }
}

CheckModulesItem.propTypes = {
  checkboxAttr: PropTypes.object,
};

CheckModulesItem.defaultProps = {
  checkboxAttr: {
    value: 'A',
    title: '基本信息',
    disabled: false,
  },
  data:{

  }
};
