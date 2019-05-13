"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ZEle;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _PageContext = _interopRequireDefault(require("../context/PageContext"));

var _lifeCycle = require("../utils/hooks/lifeCycle");

var _DataPool = require("../DataPool");

var _Reader = _interopRequireDefault(require("../Reader"));

var Provider = _PageContext["default"].Provider;

function ZEle(props) {
  var namespace = props.namespace;

  var _useState = (0, _react.useState)({
    namespace: namespace
  }),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      pageState = _useState2[0],
      setPageState = _useState2[1];

  (0, _lifeCycle.useWillUnmount)(function () {
    (0, _DataPool.removeDataPool)(namespace);
  });
  return _react["default"].createElement(Provider, {
    value: pageState
  }, _react["default"].createElement(_Reader["default"], props));
}