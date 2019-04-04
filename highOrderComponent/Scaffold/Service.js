import request from '@/utils/request';
import config from '@/config/config';

const apiUrl =  `${config.mockServer}/${config.gateWayUrl.zydxg}`;



//根据传入的URL进行请求
export async function queryInfoByUrl(url,params){
    return request(`${apiUrl}${url}`,
      {
        method: 'POST',
        body: params,
      }
    );
}   
