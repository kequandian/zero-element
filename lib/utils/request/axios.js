"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.error = error;
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _APIConfig = require("../../global/APIConfig");

var _get = (0, _APIConfig.get)(),
    endpoint = _get.endpoint;

var instance = _axios["default"].create({
  baseURL: endpoint,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json' // 'Authorization': "Bearer " + getToken(),

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

var _default = instance;
exports["default"] = _default;