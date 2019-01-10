import React, { Component } from 'react';
import { Row, Col, Card, Icon } from 'antd';
import styles from './index.less';
import PropTypes from 'prop-types';
import FormAssembly from '../components/FormAssembly/FormAssembly';

export default class CardDiy extends Component {

  render(){
    const { title, list, clickOne } = this.props;
    return (
      <div className={styles.CardDiy}>
      <Card title={title}
            extra={<Icon type="caret-down" />}
            >
        {list.map((item,index) => {
          return <span key={index.toString()}>
            <p onClick={(item)=>{clickOne(item)}}
               className={styles.handMouse}>
            {item}
          </p></span>
        })}
      </Card>
      </div>
    );
  }

}
CardDiy.propTypes = {
  title: PropTypes.string,
 // width: PropTypes.number,
  list: PropTypes.array,
  clickOne: PropTypes.func,
};
CardDiy.defaultProps = {
  title: '成都中医药大学',  //标题
 // width: 180,
  list: ['学工处', '临床医学院', '针灸推拿学院', '药学院', '体育学院', '外语学院', '管理学院', '护理学院', '人文社科学院', '公共卫生学院'],
  clickOne: ()=>{
    console.log(1);
  },

};
