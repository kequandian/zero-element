import qs from 'qs';
import axios from 'axios';
import { get } from '@/config/APIConfig';
import global from '@/config/global';
import JSONbig from 'json-bigint';
// import { getToken } from './token';

const JSONbigString = JSONbig({ storeAsString: true });

const instance = axios.create({
  baseURL: get('endpoint'),
  // withCredentials: true, // 加了之后，反而其它项目也会出现跨域问题
  headers: {
    'Accept': 'application/json;charset=utf-8',
    'Content-Type': 'application/json;charset=utf-8',
    // 'Authorization': "Bearer " + getToken(),
  },
  paramsSerializer: function (params) {
    return qs.stringify(params, { arrayFormat: 'repeat' });
  },
  transformResponse: [
    function formatJSONBig(data, headers) {
      const contentType = headers['content-type'];

      if (contentType && contentType.indexOf('application/json') > -1) {
        return JSONbigString.parse(data);
      }
      return data;
    }
  ],
});

function error(err) {
  const { Unauthorized, RequestError } = global;

  if (err.response) {
    // 非 200 状态码
    if (err.response.status === 401 && typeof Unauthorized === 'function') {
      Unauthorized(err.response);
    }
    console.warn('请求错误', err.response.status, err.response);
    if (typeof RequestError === 'function') {
      RequestError(err.response);
    }
  } else {
    // 意料外错误
    console.warn('Error', err.message);
    if (typeof RequestError === 'function') {
      RequestError(err.message);
    }
  }
  console.warn('请求的配置: ', err.config);
  return Promise.reject(err);
}

export default instance;

export {
  error,
}