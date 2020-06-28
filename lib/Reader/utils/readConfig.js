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

var _container = require("../../config/container");

var _layout = require("../../config/layout");

function UseLayout(props) {
  var n = props.n,
      restProps = (0, _objectWithoutProperties2["default"])(props, ["n"]);
  return /*#__PURE__*/_react["default"].createElement(_layout.Render, (0, _extends2["default"])({
    n: n
  }, restProps));
}

function UseItem(props) {
  var namespace = props.namespace,
      config = props.config,
      restProps = (0, _objectWithoutProperties2["default"])(props, ["namespace", "config"]);
  var layout = config.layout,
      component = config.component,
      itemCfg = config.config,
      restCfg = (0, _objectWithoutProperties2["default"])(config, ["layout", "component", "config"]);
  return /*#__PURE__*/_react["default"].createElement(_Animation.BaseEnter, config, /*#__PURE__*/_react["default"].createElement(UseLayout, (0, _extends2["default"])({
    n: layout,
    config: itemCfg
  }, restCfg), /*#__PURE__*/_react["default"].createElement(_container.Render, (0, _extends2["default"])({
    n: component,
    namespace: namespace,
    config: itemCfg
  }, restProps))));
}