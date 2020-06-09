"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = get;
exports.set = set;
var actionSet = {};

function set(obj) {
  Object.keys(obj).forEach(function (key) {
    actionSet[key] = obj[key];
  });
}

function get(name) {
  if (name === undefined) return actionSet;
  return actionSet[name];
}