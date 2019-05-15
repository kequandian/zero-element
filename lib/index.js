"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ZEle = _interopRequireDefault(require("./ZEle"));

var _APIConfig = require("zero-element-global/lib/APIConfig");

(0, _APIConfig.set)({
  'DEFAULT_current': 1,
  'DEFAULT_pageSize': 10,
  'FIELD_current': 'current',
  'FIELD_pageSize': 'pageSize',
  'FIELD_total': 'total',
  'FIELD_records': 'records',
  'FIELD_PID': 'pid'
});
var _default = _ZEle["default"];
exports["default"] = _default;