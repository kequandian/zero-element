import axios from 'axios';
import { get } from 'zero-element-global/lib/APIConfig';
import { getToken } from './token';

const instance = axios.create({
  baseURL: get('endpoint'),
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': "Bearer " + getToken(),
  }
});

function error(err) {
  if (err.response) {
    // 非 200 状态码
    console.warn('请求错误', err.response.status, err.response);
  } else {
    // 意料外错误
    console.warn('Error', err.message);
  }
  console.warn('请求的配置: ', err.config);
  return Promise.reject(err);
}

export default instance;

export {
  error,
}