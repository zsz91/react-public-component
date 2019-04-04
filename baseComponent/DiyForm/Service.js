import request from '@/utils/request';
import config from '@/config/config';

const apiUrl =  `${config.mockServer}/${config.gateWayUrl.zydxg}`;


//查询字典信息
export function getTopList(data) {
    return request(`${apiUrl}/DictionaryApi/getTopList`,
        {
            method: 'POST',
            body: data || {},
        }
    );
}
//根据编码获取字典信息列表
export function getOnlyChildList(data) {
    return request(`${apiUrl}/DictionaryApi/getOnlyChildList`,
        {
            method: 'POST',
            body: data || {},
        }
    );
}

  
  