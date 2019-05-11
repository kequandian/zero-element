"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFormItemType = getFormItemType;
exports.setFormItemTypeExtends = setFormItemTypeExtends;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _react = _interopRequireDefault(require("react"));

var _BaseFormType = _interopRequireDefault(require("../components/BaseFormType"));

var extendsFormItemType = {};

function getFormItemType(type, props) {
  // props : placeholder styles className ...
  var typeMap = (0, _objectSpread2["default"])({}, _BaseFormType["default"], extendsFormItemType);
  var MatchType = typeMap[type] || typeMap['input'];
  return _react["default"].createElement(MatchType, props);
}

function setFormItemTypeExtends(extendsObj) {
  extendsFormItemType = (0, _objectSpread2["default"])({}, extendsFormItemType, extendsObj);
}