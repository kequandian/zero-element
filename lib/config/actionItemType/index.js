"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.set = set;
exports.get = get;
exports.Render = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var actionItemTypeSet = {};

function set(NodeObj) {
  Object.keys(NodeObj).forEach(function (key) {
    actionItemTypeSet[key] = NodeObj[key];
  });
}

function get(name) {
  return actionItemTypeSet[name];
}

var Render = function Render(_ref) {
  var n = _ref.n,
      restProps = (0, _objectWithoutProperties2["default"])(_ref, ["n"]);

  var Component = actionItemTypeSet[n] || function () {
    return /*#__PURE__*/_react["default"].createElement("div", null, "\u672A\u5B9A\u4E49\u7684 actionItemType: ", n);
  };

  return /*#__PURE__*/_react["default"].createElement(Component, restProps);
};

exports.Render = Render;