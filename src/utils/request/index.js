import qs from 'qs';
import request, { error } from './axios';
import { get as getEndpoint } from './endpoint';
import { getToken } from './token';

function canEndPoint(api) {
  return api.indexOf('http') === -1 ? getEndpoint() : undefined
}

export async function query(api, params = {}) {
  return request.get(api, {
    params: {
      _t: new Date().getTime(),
      ...params,
    },
    baseURL: canEndPoint(api),
    paramsSerializer: function (params) {
      return qs.stringify(params, { arrayFormat: 'repeat' });
    },
    headers: {
      'Authorization': "Bearer " + getToken(),
    },
  }).catch(error);
}
export async function post(api, data = {}) {
  return request.post(api, data, {
    baseURL: canEndPoint(api),
    headers: {
      'Authorization': "Bearer " + getToken(),
    }
  }).catch(error);
}
export async function update(api, data = {}) {
  return request.put(api, data, {
    baseURL: canEndPoint(api),
    headers: {
      'Authorization': "Bearer " + getToken(),
    },
  }).catch(error);
}
export async function remove(api) {
  return request.delete(api, {
    baseURL: canEndPoint(api),
    headers: {
      'Authorization': "Bearer " + getToken(),
    },
  }).catch(error);
}
export async function upload(api, data) {
  let bodyData = undefined;
  if (!(data instanceof FormData)) {
    bodyData = new FormData();
    Object.keys(data).forEach(key => {
      bodyData.append(key, data[key]);
    });
  } else {
    bodyData = data;
  }

  return request.post(api, bodyData, {
    baseURL: canEndPoint(api),
    headers: {
      'Authorization': "Bearer " + getToken(),
      'Content-Type': undefined,
    }
  }).catch(error);
}
export async function download(api, { method = 'get', fileName }) {
  return request({
    url: api,
    method,
    baseURL: canEndPoint(api),
    responseType: 'blob',
    headers: {
      'Authorization': "Bearer " + getToken(),
    },
  })
    .then(res => downloadFile(res, fileName))
    .catch(error);
}

function downloadFile(res, defaultName = 'file') {
  if (res.data.type === "application/json") {
    return Promise.reject('api 未返回文件数据流');
  } else {
    const disposition = res.headers['content-disposition'] || '';
    const matchRst = disposition.match(/filename="(\S+)"/i);
    const fileName = matchRst && matchRst[1] || defaultName;

    const blob = new Blob([res.data]);
    if (window.navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(blob, fileName); //兼容ie10
    } else {
      const link = document.createElement("a");
      const evt = document.createEvent("HTMLEvents");
      evt.initEvent("click", false, false);
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(link.href);
    }
  }
}