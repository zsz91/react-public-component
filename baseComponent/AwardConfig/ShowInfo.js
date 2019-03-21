import React, { Component, Fragment } from 'react';
import BlockTitle from '@/baseComponent/BlockTitle';
import FieldList from '@/baseComponent/FieldList';
import PropTypes from 'prop-types';
import styles from './AwardConfigs.less';

export default class ShowInfo extends Component{
  constructor(props) {
    super(props);

    this.state = {
      data: props.data || {}
    };
  }

  getData = () => {
    return this.state.data;
  };

  componentDidMount() {
    const { onRef, name } = this.props;

    onRef && onRef(name, this);
  }

  render() {
    const { isShowBlock, title, fieldList, fieldLayout, data, fieldListRow, fieldRowLayout, desc } = this.props;

    return (
      <div>
        {this.props.children}
        <div className={ isShowBlock ? '' : styles.configOut }>
          {
            isShowBlock
              ? <BlockTitle title={title}/>
              : <div className={styles.configTitle}>
                <span>{title}</span>
                <span className={styles.desc}>{desc}</span>
              </div>
          }

          <div>
            <FieldList config={fieldList}
                       value={data}
                       {...fieldLayout}
            />
            <FieldList config={fieldListRow}
                       {...fieldRowLayout}
                       value={data}
            />
          </div>
        </div>
      </div>
    );
  }
}

ShowInfo.propTypes = {
  fieldList: PropTypes.array,   // fieldList 配置
  fieldLayout: PropTypes.object,  // filedList 布局
  fieldListRow: PropTypes.array,  // fieldListRow 配置
  fieldRowLayout: PropTypes.object, //
  isShowBlock: PropTypes.bool, // 是否显示为一块，主要区别是否包含border
  data: PropTypes.object,  // 展示数据
  desc: PropTypes.string, // 备注
};

ShowInfo.defaultProps = {
  title: '学生基本信息',
  fieldList: [
    { key: 'studentNo', name: '学号' },
    { key: 'name', name: '姓名' },
    { key: 'genderName', name: '性别' },
    { key: 'birthday', name: '出生年月' },
    { key: 'politicalName', name: '政治面貌' },
    { key: 'nationName', name: '民族' },
    { key: 'idCard', name: '身份证号' },
    { key: 'phone', name: '联系电话' },
    { key: 'zipCode', name: '邮政编码' },
    { key: 'clazzName', name: '班级' },
    { key: 'campusId', name: '校区' },
    { key: 'bankCard', name: '农行卡号' },
  ],
  fieldLayout: {
    filedSpan: { big: 3, small: 3 },
    nameSpan: { big: 9, small: 9 },
  },
  fieldListRow: [
    { key: 'gradeName', name: '院系及专业' },
    { key: 'familyAddress', name: '家庭住址' },
  ],
  fieldRowLayout: {
    filedSpan: { big: 1, small: 1 },
    nameSpan: { big: 3, small: 3 },
  },
  isShowBlock: false,
  data: {

  },
  desc: '',
};
