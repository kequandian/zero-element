"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.valueTypeRender = valueTypeRender;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _react = _interopRequireDefault(require("react"));

var valueTypeSet = _interopRequireWildcard(require("./valueType"));

var valueTypeMap = (0, _objectSpread2["default"])({}, valueTypeSet, {
  'defaults': RenderUndefined
});

function valueTypeRender(type, config) {
  if (!type) return undefined;
  var MatchComponent = valueTypeMap[type] || valueTypeMap['defaults'];
  return function (text, record, index) {
    return _react["default"].createElement(MatchComponent, (0, _extends2["default"])({}, config, {
      data: {
        text: text,
        record: record,
        index: index,
        type: type
      }
    }));
  };
}

function RenderUndefined(_ref) {
  var _ref$data = _ref.data,
      _ref$data$text = _ref$data.text,
      text = _ref$data$text === void 0 ? '' : _ref$data$text,
      type = _ref$data.type;
  console.warn("\u672A\u5B9A\u4E49\u7684 valueType \u7C7B\u578B: ".concat(type));
  return text;
}