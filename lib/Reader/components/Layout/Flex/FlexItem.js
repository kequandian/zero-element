"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _react = _interopRequireDefault(require("react"));

var FlexItem = function FlexItem(_ref) {
  var children = _ref.children,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? {} : _ref$style,
      _ref$className = _ref.className,
      className = _ref$className === void 0 ? '' : _ref$className,
      _ref$flex = _ref.flex,
      flex = _ref$flex === void 0 ? '0 1 auto' : _ref$flex;
  var defaultStyle = (0, _objectSpread2["default"])({}, style, {
    flex: flex
  });
  var defaultClassName = className;
  return _react["default"].createElement("div", {
    style: defaultStyle,
    className: defaultClassName
  }, children);
};

var _default = FlexItem;
exports["default"] = _default;