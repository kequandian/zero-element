"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDataPool = getDataPoolEntity;
exports.createDataPool = createDataPool;
exports.removeDataPool = removeDataPool;

var _DataPool = _interopRequireDefault(require("./DataPool"));

var pools = {};

function getDataPoolEntity(namespace) {
  if (!pools[namespace]) {
    createDataPool({
      namespace: namespace
    });
  }

  return pools[namespace].getDataPool();
}

function createDataPool(_ref) {
  var namespace = _ref.namespace;
  pools[namespace] = new _DataPool["default"]({
    namespace: namespace
  });
}

function removeDataPool(namespace) {
  delete pools[namespace];
}