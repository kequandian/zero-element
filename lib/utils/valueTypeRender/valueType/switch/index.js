"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = valueTypeSwitch;

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _utils = require("../../utils");

function valueTypeSwitch(props) {
  var data = props.data,
      field = props.field,
      options = props.options;
  var text = data.text,
      index = data.index;

  function handleChange(value) {
    (0, _utils.saveToItems)(value, props);
  }

  return _react["default"].createElement(_antd.Switch, {
    checked: text,
    onChange: handleChange
  });
}