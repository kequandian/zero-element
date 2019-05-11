"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _react = _interopRequireDefault(require("react"));

require("./index.css");

var Flex = function Flex(props) {
  var _props$align = props.align,
      align = _props$align === void 0 ? 'center' : _props$align,
      _props$justify = props.justify,
      justify = _props$justify === void 0 ? 'space-between' : _props$justify,
      _props$style = props.style,
      style = _props$style === void 0 ? {} : _props$style,
      _props$className = props.className,
      className = _props$className === void 0 ? '' : _props$className,
      children = props.children;
  var defaultStyle = (0, _objectSpread2["default"])({}, style, {
    alignItems: align,
    justifyContent: justify
  });
  var defaultClassName = "Zele-Layout-flex ".concat(className);
  return _react["default"].createElement("div", {
    style: defaultStyle,
    className: defaultClassName
  }, children);
};

var _default = Flex;
exports["default"] = _default;