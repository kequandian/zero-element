"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UseLayout = UseLayout;
exports.UseItem = UseItem;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _Animation = require("../components/Animation");

var _baseComponents = require("zero-element-global/lib/baseComponents");

var _layout = require("zero-element-global/lib/layout");

function UseLayout(props) {
  var n = props.n,
      restProps = (0, _objectWithoutProperties2["default"])(props, ["n"]);
  console.log(333, props);
  return _react["default"].createElement(_layout.Render, (0, _extends2["default"])({
    n: n
  }, restProps));
}

function UseItem(props) {
  var namespace = props.namespace,
      config = props.config;
  var layout = config.layout,
      component = config.component,
      itemCfg = config.config,
      restCfg = (0, _objectWithoutProperties2["default"])(config, ["layout", "component", "config"]);
  return _react["default"].createElement(_Animation.BaseEnter, config, _react["default"].createElement(UseLayout, (0, _extends2["default"])({
    n: layout,
    config: itemCfg
  }, restCfg), _react["default"].createElement(_baseComponents.Render, {
    n: component,
    namespace: namespace,
    config: itemCfg
  })));
}