"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useAPI;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _Model = require("../../Model");

var _DataPool = require("../../DataPool");

var _replaceKey = _interopRequireDefault(require("../replaceKey"));

function useAPI(API, _ref) {
  var namespace = _ref.namespace;

  var _useModel = (0, _Model.useModel)({
    namespace: namespace
  }),
      _useModel2 = (0, _slicedToArray2["default"])(_useModel, 1),
      modelStatus = _useModel2[0];

  var _useDataPool = (0, _DataPool.useDataPool)({
    namespace: namespace
  }),
      _useDataPool2 = (0, _slicedToArray2["default"])(_useDataPool, 1),
      dataPool = _useDataPool2[0];

  var APIUtils = (0, _replaceKey["default"])({
    modelStatus: modelStatus,
    dataPool: dataPool
  });

  if (typeof API === 'string') {
    return APIUtils.format(API);
  }

  return new Proxy(API, {
    get: function get(target, name) {
      if (target[name] !== undefined) {
        return APIUtils.format(target[name]);
      } else {
        console.warn("API ".concat(name, " is undefined, check your config file"));
        return null;
      }
    }
  });
}