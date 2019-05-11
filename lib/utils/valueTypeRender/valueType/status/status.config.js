"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setStatusMap = setStatusMap;
exports["default"] = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var statusMap = {
  NORMAL: '正常',
  FORBIDDEN: '禁用'
};

function setStatusMap(newMap) {
  statusMap = (0, _objectSpread2["default"])({}, statusMap, newMap);
}

var _default = statusMap;
exports["default"] = _default;