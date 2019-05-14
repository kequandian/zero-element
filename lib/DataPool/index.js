"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDataPool = useDataPool;
exports.createDataPool = createDataPool;
exports.removeDataPool = removeDataPool;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _DataPool = _interopRequireDefault(require("./DataPool"));

var pools = {};

function useDataPool(options) {
  if ((0, _typeof2["default"])(options) === 'object') {
    var namespace = options.namespace;
    return getDataPool(namespace);
  }
}

function getDataPool(namespace) {
  if (!pools[namespace]) {
    createDataPool({
      namespace: namespace
    });
  }

  return pools[namespace].useDataPool();
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