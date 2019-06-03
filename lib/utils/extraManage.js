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
  storage[namespace] = {
    state: {},
    node: {}
  };
  dispatch({
    type: 'extraNode',
    payload: new Proxy(storage[namespace].node, handlerNode(namespace, dispatch))
  });
  dispatch({
    type: 'extraState',
    payload: new Proxy(storage[namespace].state, handlerState(namespace, dispatch))
  });
}

function handlerNode(namespace, dispatch) {
  return {
    set: function set(obj, prop, value) {
      if (value === null) {
        delete obj[prop];
      } else {
        obj[prop] = value;
      }

      dispatch({
        type: 'extraNode',
        payload: new Proxy(storage[namespace].node, handlerNode(namespace, dispatch))
      });
      return true;
    }
  };
}

function handlerState(namespace, dispatch) {
  return {
    set: function set(obj, prop, value) {
      if (value === null) {
        delete obj[prop];
      } else {
        obj[prop] = value;
      }

      dispatch({
        type: 'extraState',
        payload: new Proxy(storage[namespace].state, handlerState(namespace, dispatch))
      });
      return true;
    }
  };
}

function getExtraAll(namespace) {
  return Object.keys(storage[namespace].node).map(function (key) {
    return _react["default"].cloneElement(storage[namespace].node[key], {
      key: key
    });
  });
}

function destroyExtra(namespace) {
  // 页面都移除了，无需触发 render
  delete storage[namespace];
}