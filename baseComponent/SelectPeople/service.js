/**
 * 2019年1月6日
 * 钟是志
 * 人员选择组件使用的接口
 * */

import request from '../../utils/request';
import config from '../../config/config';

const apiUrl =  `${config.mockServer}/${config.gateWayUrl.zydxg}`;
const httpServer = `${config.httpServer}`;

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


