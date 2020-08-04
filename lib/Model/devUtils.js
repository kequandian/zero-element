"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _window = _interopRequireDefault(require("../utils/window"));

function _default(data) {
  var handler = {
    get: function get(target, name) {
      if (name === 'info') {
        return data;
      }
    },
    set: function set(obj, prop, value) {
      return undefined;
    }
  };
  _window["default"].zele = new Proxy({}, handler);
}