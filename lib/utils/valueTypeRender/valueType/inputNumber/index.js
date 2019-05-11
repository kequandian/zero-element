"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = valueTypeInputNumber;

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _utils = require("../../utils");

function valueTypeInputNumber(props) {
  var data = props.data,
      field = props.field,
      options = props.options;
  var _data$text = data.text,
      text = _data$text === void 0 ? '/' : _data$text,
      index = data.index;

  function handleChange(value) {
    (0, _utils.saveToItems)(value, props);
  }

  var value = parseInt(text, 10);

  if (isNaN(value)) {
    return text;
  }

  return _react["default"].createElement(_antd.InputNumber, {
    value: value,
    onChange: handleChange
  });
}