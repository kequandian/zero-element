"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = get;
exports.set = set;

var _storage = require("../storage");

var _window = _interopRequireDefault(require("../window"));

function get() {
  var winZEle = _window["default"].ZEle;

  if (winZEle.endpoint) {
    return winZEle.endpoint;
  }

  return _storage.SS.get('endpoint') || _storage.LS.get('endpoint');
}

function set(endpoint, type) {
  if (type === undefined) {
    _window["default"].ZEle.endpoint = endpoint;
  }
}