"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.set = set;
exports["default"] = void 0;
var global = {};

function set(obj) {
  Object.keys(obj).forEach(function (key) {
    global[key] = obj[key];
  });
}

var _default = global;
exports["default"] = _default;