"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initExtra = initExtra;
exports.getExtraAll = getExtraAll;
exports.destroyExtra = destroyExtra;

var _react = _interopRequireDefault(require("react"));

var storage = {};

function initExtra(namespace, dispatch) {
  storage[namespace] = {};
  dispatch({
    type: 'extra',
    payload: new Proxy(storage[namespace], {
      get: function get(target, name) {
        return target[name];
      },
      set: function set(obj, prop, value) {
        if (value === null) {
          delete obj[prop];
        }

        obj[prop] = value;
        dispatch({
          type: 'extra',
          payload: obj
        });
        return true;
      }
    })
  });
}

function getExtraAll(namespace) {
  return Object.keys(storage[namespace]).map(function (key) {
    return _react["default"].cloneElement(storage[namespace][key], {
      key: key
    });
  });
}

function destroyExtra(namespace) {
  // 页面都移除了，无需触发 render
  delete storage[namespace];
}