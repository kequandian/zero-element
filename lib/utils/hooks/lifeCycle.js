"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useWillMount = useWillMount;
exports.useDidMount = useDidMount;
exports.useWillUnmount = useWillUnmount;
exports.useForceUpdate = useForceUpdate;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = require("react");

/* eslint-disable react-hooks/exhaustive-deps */
function useWillMount(func) {
  (0, _react.useMemo)(function () {
    return void func();
  }, []);
}

function useDidMount(func) {
  (0, _react.useEffect)(function () {
    return void func();
  }, []);
}

function useWillUnmount(func) {
  (0, _react.useEffect)(function () {
    return func;
  }, []);
}

function useForceUpdate() {
  var _useReducer = (0, _react.useReducer)(function (x) {
    return x + 1;
  }, 0),
      _useReducer2 = (0, _slicedToArray2["default"])(_useReducer, 2),
      forceUpdate = _useReducer2[1];

  return forceUpdate;
}