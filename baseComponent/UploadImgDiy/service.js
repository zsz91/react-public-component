import request from '../../utils/request';
import config from '../../config/config';

const uploadUrl = config.uploadUrl.split('?')[0];

export function uploadFile(params) {
  return request(uploadUrl,
    {
      method: 'POST',
      body: params,
    }
  );
}
