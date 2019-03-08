/**
 * 2019年2月18日
 * 钟是志
 * 调接口的地方
 * */

import request from '@/utils/request';
import config from '@/config/config';

const apiUrl =  `${config.mockServer}/${config.gateWayUrl.zydxg}`;


/**
 *
 */
export function getInfo(data,url) {
  return request(`${apiUrl}/${url}`,
    {
      method: 'POST',
      body: data,
    }
  );
}

export function addOrUpdate(data,url) {
  return request(`${apiUrl}/${url}`,
    {
      method: 'POST',
      body: data,
    }
  );
}

export function deleteData(data, url) {
  return request(`${apiUrl}/${url}`,
    {
      method: 'POST',
      body: data,
    }
  );
}
