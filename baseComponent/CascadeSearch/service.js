/**
 * 2019年1月6日
 * 钟是志
 * 年级 学院 专业 班级 Options枚举值接口
 * */

import request from '../../utils/request';
import config from '../../config/config';

const apiUrl =  `${config.mockServer}/${config.gateWayUrl.zydxg}`;
const httpServer = `${config.httpServer}`;
const poorLevelDic = config.dictMap.贫困级别;

/**
 * 获取学院list
 * */
export function queryInstitutionList() {
  return request(`${apiUrl}/InstitutionApi/queryAllInstitution`,
    {
      method: 'POST',
      body: {},
    }
  );
}


/**
 * 根据学院id获取专业list
 * */
export function queryMajorList(id) {
  return request(`${apiUrl}/MajorApi/queryMajorByInstitutionId`,
    {
      method: 'POST',
      body: {institutionId:id} ,
    }
  );
}

/**
 * 根据专业id获取班级list
 * */
export function queryclazzIdList(id) {
  return request(`${apiUrl}/ClazzApi/queryClazzByInstitutionIdAndMajorId`,
    {
      method: 'POST',
      body: {majorId:id} ,
    }
  );
}

/**
 * 年级列表
 */
export function queryGradeList() {
  return request(`${apiUrl}/CommonApi/getGradeList`,
    {
      method: 'POST',
      body: {} ,
    }
  );
}

/**
 * 学年列表
 */
export function getSchYearList() {
  return request(`${apiUrl}/TermApi/getSchYearList`,
    {
      method: 'POST',
      body: {} ,
    }
  );
}

/**
 * 贫困等级
 * */
export function getPoorLevelList() {
  return request(`${httpServer}/DictionaryApi/getChildList`,
    {
      method: 'POST',
      body: poorLevelDic,
    }
  );
}
