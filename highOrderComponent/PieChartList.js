/**
 * 根据多个饼状图的数据 使用Piechart组件渲染出来
 * */
import React, { Component, Fragment } from 'react';
import PieChart from '../baseComponent/PieChart';
import Shell from '../baseComponent/Shell';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';

export default class PieChartList extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    const { dataList } = this.props;
    if (dataList.length === 1) {
      return <Shell>
        <Row>
          <Col span={24}
               key={dataList[0].title}>
            <PieChart {...dataList[0]}/>
          </Col>;
        </Row>
      </Shell>;
    }
    return (
      <Shell>
        <Row style={{padding:'20px',overflowY:'hidden'}}>
          {dataList.map((item, i) => {
            return <Col xxl={8}
                        xl={12}
                       /* offset={1}*/
                        key={item.title + i}>
              <PieChart {...item}/>
            </Col>;
          })}
        </Row>
      </Shell>
    );
  }
};

PieChartList.propTypes = {
  dataList: PropTypes.array.isRequired,
};

PieChartList.defaultProps = {
  dataList: [
    {
      title: '临床医学院总人数',
      data: [
        {
          x: '未通过',
          y: 4544,
        },
        {
          x: '已通过',
          y: 1231,
        },
      ],
    },
    {
      title: '中医学院总人数',
      data: [
        {
          x: '未通过',
          y: 4544,
        },
        {
          x: '已通过',
          y: 1231,
        },
      ],
    },
  ],
};
