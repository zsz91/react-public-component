/**
 * 钟是志
 * 2019年2月25日
 * 封装组件
 * 根据type的不同 返回不同的页面类型
 * 搜索,新增,删除 功能 包含在了PageTypeMatching里面. 其他业务逻辑应该直接写在页面上.
 * */
import React, { Component, Fragment } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {deepCopy} from '../baseComponent/utils';
import List from './List';
import ListTab from './ListTab';
import ListPieChart from './ListPieChart';
import PropTypes from 'prop-types';

export default class PageTypeMatching extends Component {

  constructor(props){
    super(props);
    const { pageSetting, pageButton, pageSearch } = this.props;

    this.state = {
      pageSetting: deepCopy(pageSetting),
      pageButton: deepCopy(pageButton),
      pageSearch: deepCopy(pageSearch),
    }
  }

  render() {
    const { pageSetting, pageButton, pageSearch } = this.state;
    let dom = null;
    switch (pageSetting.type) {
      case 'list':
        dom = <List listConfig={pageSetting.listConfig}
                    pageButton={pageButton}
                    pageSearch={pageSearch}/>;
        break;
      case 'listPieChart':
        dom = <ListPieChart listConfig={pageSetting.listConfig}
                            pageSearch={pageSearch}/>;
        break;
      case 'listTab':
        dom = <ListTab tabList={pageSetting.tabList}
                       pageButton={pageButton}
                       pageSearch={pageSearch}/>;
        break;
      default:
        break;
    }
    return <PageHeaderWrapper title="">
      {dom}
    </PageHeaderWrapper>;

  }
}

PageTypeMatching.propTypes = {
  pageSetting: PropTypes.object.isRequired,
  container: PropTypes.object,
};

PageTypeMatching.defaultProps = {
  pageSetting: {
    type: 'list',
  },
};
