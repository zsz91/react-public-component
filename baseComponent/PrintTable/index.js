import React, { Component } from 'react';
import { Row, Col } from 'antd';
import styles from './index.less';
import PrintTableItem from './PrintTableItem';

export default class PrintTable extends Component{
  constructor () {
    super();
  }

  render () {
    const {
      title, notice, remark, inscription, list = [], isPrint, institutionName, majorName, clazzName, name, studentNo
    } = this.props;

    return (
      <div className={styles.printBox}>
        <h3 className={styles.heading}>
          { title ? title : '成都中药大学 2018 届毕业生离校通知单' }
        </h3>
        <div className={styles.studentFill}>
          <div>学院：<span>{institutionName}</span></div>
          <div>专业：<span>{majorName}</span></div>
          <div>年级：<span>{clazzName}</span></div>
          <div>姓名：<span>{name}</span></div>
          <div>学号：<span>{studentNo}</span></div>
        </div>
        <Row className={styles.notice}>
          { notice ? notice : '在学习期满, 请按规定办理以下手续。' }
        </Row>

        <Row className={styles.departmentTable}>
          {
            list.map(item => {
              return(
                <Col span={12} key={item.id}>
                  <PrintTableItem isPrint={isPrint} {...item}/>
                </Col>
              )
            })
          }

        </Row>

        <p style={{textIndent: '2em', margin: '0'}}>
          { remark ? remark : '备注：2018届毕业生到以上部门办理完相关手续后，凭高校通知单领取报到证、毕业证、学位证以及户口迁移证' }
        </p>

        <Row style={{textAlign: 'right'}}>
          { inscription ? inscription : '成都中医药大学学生处' }
        </Row>
      </div>
    )
  };
}
