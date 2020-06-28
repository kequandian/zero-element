"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = reducer;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function reducer(state, _ref) {
  var type = _ref.type,
      payload = _ref.payload;
  var method = {
    extraNode: function extraNode() {
      return _objectSpread(_objectSpread({}, state), {}, {
        extra: payload
      });
    },
    extraState: function extraState() {
      return _objectSpread(_objectSpread({}, state), {}, {
        extraState: payload
      });
    },
    defaults: function defaults() {
      console.warn("\u672A\u5B9A\u4E49\u7684\u65B9\u6CD5: ".concat(type));
      return state;
    }
  };
  return (method[type] || method['defaults'])();
}