import request, { error } from './axios';
import { get as getEndpoint } from './endpoint';
import { getToken } from './token';

function canEndPoint(api) {
  return api.indexOf('http') === -1 ? getEndpoint() : undefined
}

function setAuthorization(options) {
  const token = getToken();
  if (token) {
    options.headers = {
      ...options.headers,
      'Authorization': "Bearer " + token,
    }
  }
}

export async function query(api, params = {}) {
  const opt = {
    params: {
      _t: new Date().getTime(),
      ...params,
    },
    baseURL: canEndPoint(api),
    headers: {},
  };
  setAuthorization(opt);

  return request.get(api, opt).catch(error);
}
export async function post(api, data = {}, options = {}) {
  const opt = {
    baseURL: canEndPoint(api),
    headers: {},
    ...options,
  };
  setAuthorization(opt);

  return request.post(api, data, opt)
    .then(res => downloadFile(res))
    .catch(error);
}
export async function update(api, data = {}) {
  const opt = {
    baseURL: canEndPoint(api),
    headers: {},
  };
  setAuthorization(opt);

  return request.put(api, data, opt).catch(error);
}
export async function remove(api, data) {
  const opt = {
    baseURL: canEndPoint(api),
    headers: {},
    data,
  };
  setAuthorization(opt);

  return request.delete(api, opt).catch(error);
}
export async function upload(api, data, headers) {
  let bodyData = undefined;
  if (!(data instanceof FormData)) {
    bodyData = new FormData();
    Object.keys(data).forEach(key => {
      bodyData.append(key, data[key]);
    });
  } else {
    bodyData = data;
  }
  const opt = {
    baseURL: canEndPoint(api),
    headers: {
      'Content-Type': undefined,
      ...headers?headers:{}
    }
  };
  setAuthorization(opt);

  return request.post(api, bodyData, opt).catch(error);
}
export async function download(api, options = {}, data) {
  const { method = 'get', fileName } = options;
  const opt = {
    url: api,
    method,
    baseURL: canEndPoint(api),
    responseType: 'blob',
    headers: {},
    params: method === 'get' ? data : undefined,
    data: method !== 'get' ? data : undefined,
  };
  setAuthorization(opt);

  return request(opt)
    .then(res => downloadFile(res, fileName))
    .catch(error);
}

export async function preview(api, options = {}, data) {
  const { method = 'get', fileName } = options;
  const opt = {
    url: api,
    method,
    baseURL: canEndPoint(api),
    responseType: 'blob',
    headers: {},
    params: method === 'get' ? data : undefined,
    data: method !== 'get' ? data : undefined,
  };
  setAuthorization(opt);

  return request(opt)
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