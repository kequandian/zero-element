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
    headers: {
      'Authorization': "Bearer " + getToken(),
    },
  }).catch(error);
}
export async function post(api, data = {}, options = {}) {
  return request.post(api, data, {
    baseURL: canEndPoint(api),
    headers: {
      'Authorization': "Bearer " + getToken(),
    },
    ...options,
  })
    .then(res => downloadFile(res))
    .catch(error);
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
export async function download(api, options = {}, data) {
  const { method = 'get', fileName } = options;

  return request({
    url: api,
    method,
    baseURL: canEndPoint(api),
    responseType: 'blob',
    headers: {
      'Authorization': "Bearer " + getToken(),
    },
    params: method === 'get' ? data : undefined,
    data: method !== 'get' ? data : undefined,
  })
    .then(res => downloadFile(res, fileName))
    .catch(error);
}

export async function preview(api, options = {}, data) {
  const { method = 'get', fileName } = options;

  return request({
    url: api,
    method,
    baseURL: canEndPoint(api),
    responseType: 'blob',
    headers: {
      'Authorization': "Bearer " + getToken(),
    },
    params: method === 'get' ? data : undefined,
    data: method !== 'get' ? data : undefined,
  })
    .then(res => previewFile(res, fileName))
    .catch(error);
}

function downloadFile(res, defaultName = 'file') {
  const contentType = res.headers['content-type'];

  if (contentType && contentType.indexOf('application/json') > -1) {
    return Promise.resolve(res);
  } else {
    const fileName = getFileName(res, defaultName);

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

function previewFile(res) {
  const contentType = res.headers['content-type'];

  if (contentType && contentType.indexOf('application/json') > -1) {
    return Promise.resolve(res);
  } else {
    const fileName = getFileName(res);

    const blob = new Blob([res.data], { type: contentType });
    if (window.navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(blob, fileName); //兼容ie10
    } else {
      const url = URL.createObjectURL(blob);

      window.open(url, '_blank', '');
    }
  }
}

function getFileName(res, defaultName = '') {
  const disposition = res.headers['content-disposition'] || '';
  const matchRst = disposition.match(/filename=["]{0,1}([\w.@%-]+)["]{0,1}/i);

  const fileName = matchRst && decodeURI(matchRst[1]) || defaultName;

  return fileName;
}