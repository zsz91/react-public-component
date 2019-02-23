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
const studentGender = config.dictMap.性别;
const politicalName = config.dictMap.政治面貌;
const nationName = config.dictMap.民族;
const postId =   config.dictMap.现任职务;
const resultId = config.dictMap.处分结果;

//现任职务: { pCode: "BM018", dType: "BM018" },

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
export function queryclazzIdList(data) {
  return request(`${apiUrl}/ClazzApi/queryClazzByInstitutionIdAndMajorId`,
    {
      method: 'POST',
      body: data ,
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
  return request(`${apiUrl}/SchoolYearApi/getSchYearList`,
    {
      method: 'POST',
      body: {} ,
    }
  );
}

/**
 * 学期
 * */
export function getTermList() {
  return request(`${apiUrl}/TermApi/findTermList`,
    {
      method: 'POST',
      body: {},
    }
  );
}

/**
 * 用工部门
 * */
export function queryForEmploymentDeptList() {
  return request(`${apiUrl}/EmploymentDeptApi/queryForEmploymentDeptList`,
    {
      method: 'POST',
      body: {},
    }
  );
}

/**
 * 部门岗位批次
 * */
export function queryListForFixedPostPublish() {
  return request(`${apiUrl}/FixedPostPublishApi/queryListForFixedPostPublish`,
    {
      method: 'POST',
      body: {},
    }
  );
}

/**
 * 根据条件搜索人员接口
 * */
export function searchPeople(data) {
  return request(`${apiUrl}/UserApi/getPage`,
    {
      method: 'POST',
      body: data,
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

/**
 * 性别
 * */
export function getStudentGender() {
  return request(`${httpServer}/DictionaryApi/getChildList`,
    {
      method: 'POST',
      body: studentGender,
    }
  );
}
/**
 * 政治面貌
 * politicalName
 * */
export function getPoliticalName() {
  return request(`${httpServer}/DictionaryApi/getChildList`,
    {
      method: 'POST',
      body: politicalName,
    }
  );
}
/**
 * 民族
 * */
export function getNationName() {
  return request(`${httpServer}/DictionaryApi/getChildList`,
    {
      method: 'POST',
      body: nationName,
    }
  );
}


/**
 * 获取所有岗位信息
 * @param data
 */
export function queryAllPostInfo(data={}) {
  return request(`${httpServer}/PostStudentManageApi/queryAllPostInfo`, {
    method: 'POST',
    body:data
  })
}

/**
 * 现任职位
 * */
export function getPostId() {
  return request(`${httpServer}/DictionaryApi/getChildList`,
    {
      method: 'POST',
      body: postId,
    }
  );
}

/**
 *  违纪 认定结结果
 * */
export function getResultId() {
  return request(`${httpServer}/DictionaryApi/getChildList`,
    {
      method: 'POST',
      body: resultId,
    }
  );
}

