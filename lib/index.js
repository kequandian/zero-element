"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ZEle = _interopRequireDefault(require("./ZEle"));

var _baseComponents = require("./global/baseComponents");

var _BaseList = _interopRequireDefault(require("./container/list/BaseList"));

var _APIConfig = require("./global/APIConfig");

(0, _baseComponents.set)({
  BaseList: _BaseList["default"]
});
(0, _APIConfig.set)({
  'FIELD_current': 'current',
  'FIELD_pageSize': 'pageSize',
  'FIELD_total': 'total',
  'FIELD_PID': 'pid'
});
var _default = _ZEle["default"];
exports["default"] = _default;