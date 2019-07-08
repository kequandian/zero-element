import request, { error } from './axios';
import { get as getEndpoint } from './endpoint';
import { getToken } from './token';

export async function query(api, params = {}) {
  return request.get(api, {
    params: {
      _t: new Date().getTime(),
      ...params,
    },
    baseURL: getEndpoint(),
    headers: {
      'Authorization': "Bearer " + getToken(),
    },
  }).catch(error);
}
export async function post(api, data = {}) {
  return request.post(api, data, {
    baseURL: getEndpoint(),
    headers: {
      'Authorization': "Bearer " + getToken(),
    }
  }).catch(error);
}
export async function update(api, data = {}) {
  return request.put(api, data, {
    baseURL: getEndpoint(),
    headers: {
      'Authorization': "Bearer " + getToken(),
    },
  }).catch(error);
}
export async function remove(api) {
  return request.delete(api, {
    baseURL: getEndpoint(),
    headers: {
      'Authorization': "Bearer " + getToken(),
    },
  }).catch(error);
}