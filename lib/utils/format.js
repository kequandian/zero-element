"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatAPI = formatAPI;

var _Model = require("../Model");

var _DataPool = require("../DataPool");

var _replaceKey = _interopRequireDefault(require("./replaceKey"));

function formatAPI(API, _ref) {
  var namespace = _ref.namespace;
  var model = (0, _Model.getModel)(namespace);
  var dataPool = (0, _DataPool.getDataPool)(namespace);
  var APIUtils = (0, _replaceKey["default"])({
    model: model,
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