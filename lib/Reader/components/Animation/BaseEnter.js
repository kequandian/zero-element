"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = BaseEnter;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _reactMotion = require("react-motion");

var _lifeCycle = require("../../../utils/hooks/lifeCycle");

function BaseEnter(_ref) {
  var children = _ref.children;

  var _useState = (0, _react.useState)(20),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      offsetY = _useState2[0],
      setOffsetY = _useState2[1];

  (0, _lifeCycle.useDidMount)(function (_) {
    setOffsetY(0);
  });
  return _react["default"].createElement(_reactMotion.Motion, {
    style: {
      x: (0, _reactMotion.spring)(offsetY, _reactMotion.presets.noWobble)
    }
  }, function (interpolatingStyle) {
    var style = {};

    if (interpolatingStyle.x !== 0) {
      style.transform = "translateY(".concat(interpolatingStyle.x, "px)");
    }

    return _react["default"].createElement("div", {
      style: style
    }, children);
  });
}