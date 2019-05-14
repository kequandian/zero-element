"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useWillMount = useWillMount;
exports.useDidMount = useDidMount;
exports.useWillUnmount = useWillUnmount;

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