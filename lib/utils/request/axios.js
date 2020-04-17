"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.error = error;
exports["default"] = void 0;

var _qs = _interopRequireDefault(require("qs"));

var _axios = _interopRequireDefault(require("axios"));

var _APIConfig = require("zero-element-global/lib/APIConfig");

var _global = _interopRequireDefault(require("zero-element-global/lib/global"));

var _jsonBigint = _interopRequireDefault(require("json-bigint"));

// import { getToken } from './token';
var JSONbigString = (0, _jsonBigint["default"])({
  storeAsString: true
});

var instance = _axios["default"].create({
  baseURL: (0, _APIConfig.get)('endpoint'),
  // withCredentials: true, // 加了之后，反而其它项目也会出现跨域问题
  headers: {
    'Accept': 'application/json;charset=utf-8',
    'Content-Type': 'application/json;charset=utf-8' // 'Authorization': "Bearer " + getToken(),

  },
  paramsSerializer: function paramsSerializer(params) {
    return _qs["default"].stringify(params, {
      arrayFormat: 'repeat'
    });
  },
  transformResponse: [function formatJSONBig(data, headers) {
    var contentType = headers['content-type'];

    if (contentType && contentType.indexOf('application/json') > -1) {
      return JSONbigString.parse(data);
    }

    return data;
  }]
});

function error(err) {
  var Unauthorized = _global["default"].Unauthorized,
      RequestError = _global["default"].RequestError;

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

var _default = instance;
exports["default"] = _default;