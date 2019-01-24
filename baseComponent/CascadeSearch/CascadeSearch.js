/**
 * 钟是志
 * 2019年1月22日
 * 通过调用formArray
 * 实现options的级联 比如选择了一个学院 专业对应的options自动更新
 * 选择了一个专业后  班级对应的options 需要改变
 * */

import React, { Component } from 'react';
import styles from '../index.less';
import FormArray from '../FormArray';
import PropTypes from 'prop-types';
import * as service from './service';

export default class CascadeSearch extends Component {

  constructor(props){
    super(props);
    this.state={
      gradeList: [],
      schYearIdList: [], // 学年
      institutionList: [],
      majorList: [],
      poorLevelList: [],
      clazzList: [],
      config: JSON.parse(JSON.stringify(this.props.config)) || [],
    };
  }

  getMajor = (id) => {
    service.queryMajorList(id).then((response)=>{
        this.setState({
          majorList: this.getOptions(response),
        })
    })
  };

  getClazzId = (id) => {
    service.queryclazzIdList(id).then((response)=>{
      this.setState({
        clazzList: this.getOptions(response),
      })
    })
  };

  formStateChange = (value, key) => {
    switch (key) {
      case 'institutionId':
        this.getMajor(value);
        break;
      case 'majorId':
        this.getClazzId(value);
        break;
      default:
        break;
    }
    this.props.changeValue(value, key);
  };

  getOptions = (response, key = 'id', name = 'name') => {
    let options = [];
    for(let item of response){
      options.push(
        { key: item[key],
          name:item[name]
        });
    }
    return options;
  };

  componentDidMount() {
    const { config } = this.state;
    for (const item of config){
      if(item.key === 'institutionId'){ // 学院
        service.queryInstitutionList().then((response)=>{
          this.setState({
            institutionList: this.getOptions(response),
          });
        })
      }else if(item.key === 'gradeId'){ // 年级
        service.queryGradeList().then((response)=>{
          this.setState({
            gradeList: this.getOptions(response),
          });
        })
      }else if(item.key === 'schYearId'){ // 学年
        service.getSchYearList().then((response)=>{
          this.setState({
            schYearIdList: this.getOptions(response, 'schYearId', 'schYearName'),
          });
        })}
      else if(item.key === 'poorLevel'){
          service.getPoorLevelList().then((response)=> {
            this.setState({
              poorLevelList: this.getOptions(response, 'id', 'dictName'),
            });
          })
      }
    }
    this.setState({
      config: config,
    })
  }

  render(){
    const { config, institutionList, majorList, clazzList, gradeList, schYearIdList, poorLevelList } = this.state;
    for (let item of config){
      switch (item.key) {
        case 'institutionId':
          item.options = institutionList;
          break;
        case 'majorId':
          item.options = majorList;
          break;
        case 'clazzId':
          item.options = clazzList;
          break;
        case 'gradeId':
          item.options = gradeList;
          break;
        case 'schYearId':
          item.options = schYearIdList;
          break;
        case 'genderName':
          item.options = [{ key: '男', name: '男' },
            { key: '女', name: '女' }];
          break;
        case 'poorLevel':
          item.options = poorLevelList;
          break;
        default:
          break;
      }
    }
   return (
      <FormArray {...this.props}
                 changeValue={this.formStateChange}
                 config={config}
      />
    );
  }
}
CascadeSearch.propTypes = {
  config: PropTypes.array,
};

CascadeSearch.defaultProps = {
  config: [],

};
