/***
 * 一个搜索区加饼状图的组件
 * */
import React, { Component, Fragment } from 'react';
import SearchDom from './SearchDom';
import * as services from './Service';
import PropTypes from 'prop-types';
import PieChartList from './PieChartList';

export default class ListPieChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      formValues: {},
      pagination: {
        current: 1,
        total: 1,
        pageSize: 10,
        showQuickJumper: true,
        onChange: (current, size) => {
          this.pageChange(current, size);
        },
      },
    };
  }

  getPage = () => {
    const { listConfig, pageSearch } = this.props;
    const { pagination, formValues } = this.state;
    const search = pageSearch.search;
    let data = formValues;

    /** 如果配置了默认值 则 加进去 **/
    for (let item in search.field) {
      let one = search.field[item];
      if (one.required && typeof data[item] === 'undefined') {
        data[item] = one.defaultValue;
      }
    }
    if (listConfig.paging) { // 是否分页
      data.pageSize = pagination.pageSize;
      data.pageNo = pagination.current;
    }

    let url = search.url;  // 接口地址
    services.getInfo(data, url).then((response) => {
      if (!response || (search.paging && typeof response.total === 'undefined') || response.errMsg) {
        return false;
      }
      if (listConfig.paging) {
        pagination.total = response.total;
      }
      if (typeof search.responseCallBack !== 'undefined') {
        response = search.responseCallBack(response);
      }
      this.setState({
        list: response.rows || response,
        pagination: pagination,
      });

    });

  };

  stateChange = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  pageChange = (current, size) => {
    this.setState({
      pagination: {
        ...this.state.pagination,
        current: current,
        pageSize: size,
      },
    }, () => {
      this.getPage();
    });
  };


  formStateChange = (value, key) => {
    let oldValue = this.state.formValues;
    oldValue[key] = value;
    this.setState({
      formValues: oldValue,
    });
  };

  handleSelectRows = rows => {
    this.setState({
      selectRows: rows,
    });
  };
  componentDidMount() {
    this.getPage();
  }
  resetFormValues = () => {
    this.setState({
      formValues : {},
    })
  };

  render() {
    const { listConfig, pageSearch, pageButton } = this.props;

    const { formValues,list } = this.state;
    return (
      <Fragment>
        {listConfig.searchArea ?
          <SearchDom formStateChange={this.formStateChange}
                     formValues={formValues}
                     getPage={this.getPage}
                     resetFormValues={this.resetFormValues}
                     config={pageSearch.search}

          /> : null}
        <PieChartList dataList={list}/>

      </Fragment>
    );
  }
}

ListPieChart.propTypes = {
  listConfig: PropTypes.object.isRequired,
  pageButton: PropTypes.array,
  pageSearch: PropTypes.object.isRequired,
};

ListPieChart.defaultProps = {
  listConfig: {
  },
  pageSearch: {
    search: {
      url: '/AwardEncourageInfoApi/queryPageForAwardCountryInfo',
      field: {
        // status:{
        //   required: true,
        //   defaultValue: undefined,
        // 如果有查询的字段必填且defaultValue=undefined 应该在页面的constructor方法中 通过各种方法把默认值传进去.
        // }
      },
      responseCallBack: (response) => {
        return response;
      },
      condition: [
        {
          key: 'studentNo',
          name: '学号',
          type: 'input',
        },
       ],

      nameSpan: { big: 8, small: 9 },
      fileSpan: { big: 4, small: 4 },
    },
  },
};

