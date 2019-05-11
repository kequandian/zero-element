"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ComponentPortal;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _react = _interopRequireDefault(require("react"));

var _TitledHeader = _interopRequireDefault(require("../components/Layout/TitledHeader"));

/**
 * 管理一下内部用到的零散组件
 *
 * @export
 * @param {object} [object] 初始注册的组件
 */
function ComponentPortal() {
  var set = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  this.componentSet = (0, _objectSpread2["default"])({
    Empty: function Empty(props) {
      return props.children;
    },
    TitledHeader: _TitledHeader["default"]
  }, set);
}

ComponentPortal.prototype.get = function (key) {
  return this.componentSet[key] || this.componentSet['Empty'];
};

ComponentPortal.prototype["if"] = function (_boolean, trueKey, falseKey) {
  return _boolean ? this.componentSet[trueKey] : this.componentSet[falseKey];
};