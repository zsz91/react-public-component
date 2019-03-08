import React, { Component, Fragment } from 'react';
import SearchDom from './SearchDom';
import ButtonListDom from './ButtonListDom';
import Shell from '../baseComponent/Shell';
import ColumnsRender from './ColumnsRender';
import * as services from './Service';
import StandardTable from '../components/StandardTable';
import PropTypes from 'prop-types';

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      selectRows: [],
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
    this.setState({
      list: [],
    });

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
  componentWillMount() {
  }

  componentWillUnmount(){
  }

  resetFormValues = () => {
    this.setState({
      formValues : {},
    })
  };

  render() {
    const { formValues, selectRows, list, pagination,  } = this.state;
    const { listConfig, pageSearch, pageButton } = this.props;
    const { columns } = pageSearch;
    for(let item of columns){
      if(typeof item.renderConfig !== 'undefined' && !item.render){
        item.render =  (text,record)=>{
          return   <ColumnsRender text={text}
                                  getPage={this.getPage}
                                  config={item.renderConfig}
                                  record={record} />
        }
      }
    }
    return (
      <Fragment>
        {listConfig.searchArea ?
          <SearchDom formStateChange={this.formStateChange}
                     formValues={formValues}
                     getPage={this.getPage}
                     resetFormValues={this.resetFormValues}
                     config={pageSearch.search}

          /> : null}
        <Shell>
          {listConfig.buttonArea ?
            <ButtonListDom config={pageButton}
                           handleSelectRows={this.handleSelectRows}
                           selectRows={selectRows}
                           getPage={this.getPage}

            /> : null}

           <StandardTable
              rowKey={pageSearch.tableRowKey || 'id'}
              selectedRows={selectRows}
              data={{ list: list, pagination: pagination }}
              columns={columns}
              noSelectRow={!listConfig.selectRows}
              onSelectRow={this.handleSelectRows}
            />


        </Shell>
      </Fragment>
    );
  }
}

List.propTypes = {
  listConfig: PropTypes.object.isRequired,
  pageButton: PropTypes.array,
  pageSearch: PropTypes.object.isRequired,
};

List.defaultProps = {
  listConfig: {
    selectRows: true, // 是否可以行选择,
    paging: true, // 是否可以分页,
    searchArea: true, // 是否拥有 搜索区dom,
    buttonArea: true, // 是否拥有 按钮区,
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
      tableRowKey: 'id',
      columns: [
        {
          title: '姓名',
          dataIndex: '',
        },
        {
          title: '学号',
          dataIndex: '',
        },
        {
          title: '班级',
          dataIndex: '',
        },
        {
          title: '财务处状态',
          dataIndex: '',
        },
        {
          title: '教务处状态',
          dataIndex: '',
        },
        {
          title: '后勤服务中心状态',
          dataIndex: '',
        },
        {
          title: '图书馆状态',
          dataIndex: '',
        },
        {
          title: '院系状态',
          dataIndex: '',
        },
        {
          title: '团委状态',
          dataIndex: '',
        },
        {
          title: '组织部状态',
          dataIndex: '',
        },
        {
          title: '操作',
          dataIndex: 'operation',
          renderType: 'update',  // 修改
        },
      ],
      nameSpan: { big: 8, small: 9 },
      fileSpan: { big: 4, small: 4 },
    },
  },
};

