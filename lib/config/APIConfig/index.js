"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.set = set;
exports.get = get;
var config = {};

function set(obj) {
  Object.keys(obj).forEach(function (key) {
    config[key] = obj[key];
  });
}

function get(key) {
  return config[key];
}