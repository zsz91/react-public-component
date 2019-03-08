/**
 * 饼状图
 * 2019年2月27日
 * 钟是志
 * */
import React, { Component, Fragment } from 'react';
import { Pie } from '@/components/Charts';
import PropTypes from 'prop-types';
import styles from './index.less';

export default class PieChart extends Component {
    constructor(props){
      super(props);
    }
    render() {
      const {data, title} = this.props;
      let totalPerson=0;
      data.map(item=>{totalPerson+=item.y})
      console.log(this.props);
      return (
      <Pie
        className={styles.PieChart}
        hasLegend
        colors={
          totalPerson?['#fc4c69','#2697ff',]:['#ccc']
        }
        title={title}
        subTitle={title}
        total={() => (
          totalPerson?totalPerson+'人':false
          // <span
          //   dangerouslySetInnerHTML={{
          //     __html: data.reduce((pre, now) => now.y + pre, 0) + '人'
          //   }}
          // />
        )}
        data={totalPerson?data:[{x:'暂无数据',y:1}]}
        valueFormat={val => <span dangerouslySetInnerHTML={{ __html: '' }} />}
        height={294}
      />)
    }

}

PieChart.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};
PieChart.defaultProps = {
  data : [
    {
      x: '未通过',
      y: 4544,
    },
    {
      x: '已通过',
      y: 1231,
    },
  ],
  title: '总人数',
};
