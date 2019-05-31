"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = reducer;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

function reducer(state, _ref) {
  var type = _ref.type,
      payload = _ref.payload;
  var method = {
    extra: function extra() {
      return (0, _objectSpread2["default"])({}, state, {
        extra: payload
      });
    },
    defaults: function defaults() {
      console.warn("\u672A\u5B9A\u4E49\u7684\u65B9\u6CD5: ".concat(type));
      return state;
    }
  };
  return (method[type] || method['defaults'])();
}