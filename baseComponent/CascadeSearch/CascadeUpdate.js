/**
 * 钟是志
 * 2019年1月22日
 * 通过调用formArray
 * 实现options的级联 比如选择了一个学院 专业对应的options自动更新
 * 选择了一个专业后  班级对应的options 需要改变
 * */
const zd = {
  "campusId":{methods:"getXQList",list:"campusList"},//校区
  "politicalId":{methods:"getPoliticalName",list:"politicalNameList",key:'id', value:'dictName'},//政治面貌
  "nationId":{methods:"getNationName",list:"nationNameList",key:'id', value:'dictName'},//民族
}

import React, { Component } from 'react';
import styles from '../index.less';
import FormArray from '../FormArray';
import PropTypes from 'prop-types';
import * as service from './service';
import {getInfo} from '../../highOrderComponent/Service';
export default class CascadeUpdate extends Component {

  constructor(props) {
    super(props);

    let config = this.configInit(this.props.config);
    this.state = {
      gradeList: [], // 年级
      schYearIdList: [], // 学年
      institutionList: [], // 学院
      majorList: [], // 专业
      poorLevelList: [], // 贫困等级 数据字典
      clazzList: [], // 班级
      deptList: [], // 用工部门
      config: config,
      termList: [], // 学期
      publishList: [], // 岗位申请 批次
      genderList: [], // 性别 数据字典
      politicalNameList: [], // 政治面貌
      nationNameList: [], // 民族
      postList: [], // 岗位
      resultIdList: [], // 学生违纪管理 认定结果枚举 数据字典\
      inSchoolStatusList: [], // 在校状态
      residenceCityList: [], // 户籍市州
      eduLenIdList: [], // 学历层次 学制
      campusList:[],//校区
      disciplineList:[],//科类
    };
  }

  static getDerivedStateFromProps(props, state) {
    let conf = props.config;
    const config = JSON.parse(JSON.stringify(conf)) || [];
    return {
      config
    };
  }

  getOptionsBykey = key=>{
    const keyObj = zd[key];
    const methodsName = keyObj?keyObj.methods:null;
    if(methodsName && this.state[keyObj.list].length === 0) {
      service[methodsName]().then(res=>{
        if(res){
          const state = this.state;
          const _options = this.getOptions(res, keyObj['key']||'id', keyObj['value']||'name')
          state[keyObj.list] = _options;
          this.setState({...state})
        }
      })
    }
  }

  configInit = (conf) => {
    let configKeys = {};
    const config = JSON.parse(JSON.stringify(conf)) || [];
    let j = 0;
    for (let i = 0; i < conf.length; i++) {
      let item = conf[i];
      if (item.key === 'majorId') {
        j = i;
      }
      configKeys[item.key] = true;
    }
    if (typeof configKeys.majorId !== 'undefined' && typeof configKeys.gradeId === 'undefined') {
      config.splice(j, 0, {
        key: 'gradeId',
        name: '年级',
        type: 'select',
      });
    }
    return config;
  };

  getMajor = (id) => {
    const haveMajor = this.state.config.findIndex((item)=>{
      return item.key === 'majorId'
    });
    if(haveMajor === -1){
      return false;
    }
    service.queryMajorList(id).then((response) => {
      this.setState({
        majorList: this.getOptions(response),
      });
    });
  };

  getClazzId = (data = {}) => {
    if (!data.gradeId || !data.majorId) {
      this.setState({
        clazzList: [],
      });
      this.props.changeValue('', 'clazzId');
      return false;
    }
    service.queryclazzIdList(data).then((response) => {
      this.setState({
        clazzList: this.getOptions(response),
      });
    });
  };

  formStateChange = (value, key) => {
    /*
    * 选择了学院才能选专业
    * 选择了专业和年级 才能选班级
    * */

    switch (key) {
      case 'institutionId':
        this.getMajor(value);
        break;
      case 'majorId':
        if (!!this.props.value.gradeId) {
          const data = {
            gradeId: this.props.value.gradeId,
            majorId: value,
          };
          this.getClazzId(data);
        }
        break;
      case 'gradeId':
        if (!!this.props.value.majorId) {
          const data = {
            majorId: this.props.value.majorId,
            gradeId: value,
          };
          this.getClazzId(data);
        }
        break;
      default:
        break;
    }

    this.setApiKeyValue(value, key);
    this.props.changeValue(value, key);
  };

  // 如果在字段的config 上设置了apiKey 则给apiKey 赋值枚举值的 name
  setApiKeyValue = (value,key) => {
    const { config } = this.state;
    const Index = config.findIndex((item)=>{
      return item.key === key;
    });
    if(Index !== -1 && config[Index].apiKey){
      let opt = config[Index].options;
      const apiKeyIndex = opt.findIndex((x)=>{
        return x.key.toString() === value;
      });
      if(apiKeyIndex === -1){
        if(!value){ // 如果是清空搜索条件 则apikey也要清空
          return this.props.changeValue(undefined, config[Index].apiKey);
        }
        return false;
      }                       // value                      key
      this.props.changeValue(opt[apiKeyIndex].name, config[Index].apiKey);
    }

  };


  getOptions = (response, key = 'id', name = 'name') => {
    if (!response || response.constructor !== Array) {
      return [];
    }
    let options = [];
    for (let item of response) {
      options.push(
        {
          key: item[key],
          name: item[name],

        });
    }
    return options;
  };

  getGradeList = () => {
    service.queryGradeList().then((response) => {
      this.setState({
        gradeList: this.getOptions(response),
      });
    });
  };

  checkHasField(filedName) {
    const config = this.state;
    const result = config.find(item => {
      return item.key === filedName;
    });
    return !!result;
  }

  componentDidMount() {
    this.willRender()
  }

  willRender = ()=>{
    const { config } = this.state;
    const { value } = this.props;
    for (const item of config) {
      if (item.type !== 'select') {
        continue;
      }
      if (item.key === 'institutionId') { // 学院
        service.queryInstitutionList().then((response) => {
          if (value.institutionId) {
            this.getMajor(value.institutionId);
          }

          if (value.majorId) {
            this.formStateChange(value.majorId, 'majorId');
          }

          this.setState({
            institutionList: this.getOptions(response),
          });
        });
      } else if (item.key === 'gradeId') { // 年级
        this.getGradeList();
      } else if (item.key === 'schYearId' || item.key === 'schoolYearId') { // 学年

        service.getSchYearList().then((response) => {
          if (typeof item.defaultValue !== 'undefined' && item.defaultValue) {
            this.formStateChange(response[0].schYearId, 'schYearId');
          }
          this.setState({
            schYearIdList: this.getOptions(response, 'schYearId', 'schYearName'),
          });
        });
      } else if (item.key === 'termId') {  // 学期
        service.getTermList().then((response) => {
          if (typeof item.defaultValue !== 'undefined' && item.defaultValue) {
            this.formStateChange(response[0].id, 'termId');
          }
          this.setState({
            termList: this.getOptions(response, 'id', 'name'),
          });
        });
      } else if (item.key === 'poorLevel' || item.key === 'poorLevelId') {
        service.getPoorLevelList().then((response) => {
          this.setState({
            poorLevelList: this.getOptions(response, 'id', 'dictName'),
          });
        });
      } else if (item.key === 'eduLenId' || item.key === 'educLenId') {
        service.getEduLenIdList().then((response) => {
          this.setState({
            eduLenIdList: this.getOptions(response, 'id', 'dictName'),
          });
        });
      } else if (item.key === 'nationId') {
        service.getNationName().then((response) => {
          this.setState({
            nationNameList: this.getOptions(response, 'id', 'dictName'),
          });
        });
      } else if (item.key === 'politicalId') {
        service.getPoliticalName().then((response) => {
          this.setState({//政治面貌
            politicalNameList: this.getOptions(response, 'id', 'dictName'),
          });
        });
      } else if (item.key === 'genderId') {
        service.getStudentGender().then((response) => {
          this.setState({
            genderList: this.getOptions(response, 'id', 'dictName'),
          });
        });
      } else if (item.key === 'deptIds' || item.key === 'deptId') { // 用工部门
        if(item.optionUrl){
          getInfo({},item.optionUrl).then((response)=>{
            this.setState({
              deptList: this.getOptions(response, 'deptId', 'deptName'),
            });
          });
          return true;
        }
        service.queryForEmploymentDeptList().then((response) => {
          this.setState({
            deptList: this.getOptions(response, 'id', 'deptName'),
          });
        });
      } else if (item.key === 'publishId') {
        /**
         * 岗位申报批次
         * */
        service.queryListForFixedPostPublish().then((response) => {
          if (!!item.defaultValue && response && response.constructor === Array) {
            this.formStateChange(response[0].id, 'publishId');
          }
          this.setState({
            publishList: this.getOptions(response, 'id', 'title') || [],
          });
        });
      }
      // postId 有两种 一种是现任职务- 教师管理需要用 一种是部门里面的岗位名称
      // 在教师管理页面加一个配置项 区分开 item.from = 'dictMap'
      else if (item.key === 'postId') {
        /**
         * 现任职务
         * */
        if (typeof item.from !== 'undefined' && item.from === 'dictMap') {
          service.getPostId().then((response) => {
            this.setState({
              postList: this.getOptions(response, 'id', 'dictName'),
            });
          });
        } else {
          /**
           * 岗位
           */
          service.queryAllPostInfo().then((response) => {
            this.setState({
              postList: this.getOptions(response, 'id', 'postName'),
            });
          });
        }


      } else if (item.key === 'cognizanceId') {
        service.getResultId().then((response) => {
          this.setState({
            resultIdList: this.getOptions(response, 'id', 'dictName'),
          });
        });
      } else if (item.key === 'salaryMonth' && !['datePicker', 'monthPicker'].includes(item.type)) {
        service.queryListForConfig().then(response => {
          if (!!item.defaultValue && response && response.constructor === Array && response.length > 0) {
            this.formStateChange(response[0].salaryMonth, 'salaryMonth');
          }
          this.setState({
            salaryMonthList: this.getOptions(response, 'salaryMonth', 'salaryMonth'),
          });
        });
      } else if (item.key === 'residenceCity') {
        service.findResidenceCity().then(response => {
          this.setState({
            residenceCityList: this.getOptions(response, 'residenceCity', 'residenceCity'),
          });
        });
      } else if (item.key === 'residenceCounty') {
        service.findResidenceCounty().then(response => {
          this.setState({
            residenceCountyList: this.getOptions(response, 'residenceCounty', 'residenceCounty'),
          });
        });
      } else if (item.key === 'state') {
        service.getInSchoolStatus().then((response) => {
          this.setState({
            inSchoolStatusList: this.getOptions(response, 'id', 'dictName'),
          });
        });
      } else if (item.key === 'campusId') {
        service.getXQList().then((response) => {
          this.setState({
            campusList: this.getOptions(response, 'id', 'name'),
          });
        });
      }else if (item.key === 'disciplineId' || item.key ===  'streamId') { //科类
        service.getKeLei().then((response) => {
          this.setState({
            disciplineList: this.getOptions(response, 'id', 'dictName'),
          });
        });
      }
    }
    this.setState({
      config: config,
    });
  }

  render() {
    const configProps = this.props.config;
    configProps.map(item=>{
      if(item.type === 'select') {
        this.getOptionsBykey(item.key);
      }
    })

    const {
      config, institutionList, majorList, clazzList,
      gradeList, schYearIdList, poorLevelList, termList,
      deptList, publishList, genderList, politicalNameList, nationNameList,
      postList, resultIdList, salaryMonthList, inSchoolStatusList, residenceCityList,
      residenceCountyList, eduLenIdList,campusList,disciplineList
    } = this.state;
    for (let item of config) {
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
        case 'schoolYearId':
          item.options = schYearIdList;
          break;
        case 'genderName':
          item.options = [{ key: '男', name: '男' },
            { key: '女', name: '女' }];
          break;
        case 'poorLevel':
          item.options = poorLevelList;
          break;
        case 'poorLevelId':
          item.options = poorLevelList;
          break;
        case 'termId':
          item.options = termList;
          break;
        case 'deptIds':
          item.options = deptList;
          break;
        case 'deptId':
          item.options = deptList;
          break;
        case 'publishId':
          item.options = publishList;
          break;
        case 'genderId':
          item.options = genderList;
          break;
        case 'nationId':
          item.options = nationNameList;
          break;
        case 'politicalId':
          item.options = politicalNameList;
          break;
        case 'postId':
          item.options = postList;
          break;
        case 'cognizanceId':
          item.options = resultIdList;
          break;
        case 'salaryMonth':
          item.options = salaryMonthList;
          break;
        case 'residenceCity':
          item.options = residenceCityList;
          break;
        case 'residenceCounty':
          item.options = residenceCountyList;
          break;
        case 'eduLenId':
          item.options = eduLenIdList;
          break;
        case 'educLenId':
          item.options = eduLenIdList;
          break;
        case 'campusId':
          item.options = campusList;
          break;
        case 'disciplineId':
          item.options = disciplineList;
          break;
        case 'streamId':
          item.options = disciplineList;
          break;  
        case 'state':
          if (!item.isCustomOptions) {
            item.options = inSchoolStatusList;
          }
          break;
        default:
          break;
      }
    }

    return (
      <FormArray {...this.props}
                 changeValue={this.formStateChange}
                 onSearch={this.getPeopleInfo}
                 config={config}
      />
    );
  }
}
CascadeUpdate.propTypes = {
  config: PropTypes.array,
};

CascadeUpdate.defaultProps = {
  config: [],

};
