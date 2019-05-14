"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "modelHooks", {
  enumerable: true,
  get: function get() {
    return _modelHooks["default"];
  }
});
exports.lifeCycle = void 0;

var _modelHooks = _interopRequireDefault(require("./modelHooks"));

var lifeCycle = _interopRequireWildcard(require("./lifeCycle"));

exports.lifeCycle = lifeCycle;