import React, { Component, Fragment } from 'react';
import { Tabs } from 'antd';
import Shell from '../baseComponent/Shell';
import List from './List';
import styles from '../baseComponent/index.less';
import PropTypes from 'prop-types';

const TabPane = Tabs.TabPane;

export default class ListTab extends Component {
  constructor(props) {
    super(props);
    const { tabList } = this.props;
    const tabKeys = Object.keys(tabList);
    this.state = {
      activeKey: tabKeys[0],
      tabKeys: tabKeys,
    };
  }

  handleChangeTab = (activeKey) => {

    this.setState({
      activeKey: '-111111',
    },()=>{
      setTimeout(()=>{
        this.setState({
          activeKey: activeKey,
        })
      } ,30);
    });
  };

  render() {
    const { tabList, pageSearch, pageButton } = this.props;
    const { activeKey, tabKeys } = this.state;
    return (
      <Fragment>
        <Shell>
          <Tabs activeKey={activeKey}
                className={styles.ListTab}
                onChange={this.handleChangeTab}>
            {tabKeys.map((item) => {
             return <TabPane tab={tabList[item].name} key={item}>

              </TabPane>
            })}
          </Tabs>
        </Shell>
        {tabKeys.map((item) => {
            return activeKey === item ?
              <List listConfig={tabList[item].listConfig}
                    key={item}
                    pageSearch={pageSearch[item]}
                    pageButton={pageButton[item]}
              /> : null;

          })}
      </Fragment>
    );
  }
}

ListTab.propTypes = {};

ListTab.defaultProps = {};

