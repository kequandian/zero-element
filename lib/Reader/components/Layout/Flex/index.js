"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Flex = _interopRequireDefault(require("./Flex"));

var _FlexItem = _interopRequireDefault(require("./FlexItem"));

var _default = function _default(_ref) {
  var align = _ref.align,
      justify = _ref.justify,
      children = _ref.children;
  return _react["default"].createElement(_Flex["default"], {
    align: align,
    justify: justify
  }, _react["default"].Children.map(children, function (child) {
    var span = child.props.span || '';
    var style = {};
    var flex = isNaN(Number(span)) ? undefined : Number(span);

    if (flex === undefined) {
      style.width = span;
    }

    return _react["default"].createElement(_FlexItem["default"], {
      flex: flex,
      style: style
    }, child);
  }));
};

exports["default"] = _default;