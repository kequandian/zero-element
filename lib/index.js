"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ZEle = _interopRequireDefault(require("./ZEle"));

var _APIConfig = require("./config/APIConfig");

(0, _APIConfig.set)({
  'DEFAULT_current': 1,
  'DEFAULT_pageSize': 10,
  'REQUEST_FIELD_current': 'pageNumber',
  'REQUEST_FIELD_pageSize': 'pageSize',
  'REQUEST_FIELD_field': 'field',
  // api 排序的字段
  'REQUEST_FIELD_order': 'order',
  // api 排序的方式
  'REQUEST_FIELD_ascend': 'ascend',
  // api 排序方式的 ascend 映射
  'REQUEST_FIELD_descend': 'descend',
  // api 排序方式的 descend 映射
  'REQUEST_FIELD_total': 'total',
  // 预留字段
  'REQUEST_FIELD_records': 'records',
  // 预留字段
  'REQUEST_FIELD_PID': 'pid',
  // 预留字段
  'RESPONSE_FIELD_current': 'current',
  'RESPONSE_FIELD_pageSize': 'size',
  'RESPONSE_FIELD_total': 'total',
  'RESPONSE_FIELD_records': 'records',
  'RESPONSE_FIELD_PID': 'pid'
});
var _default = _ZEle["default"];
exports["default"] = _default;