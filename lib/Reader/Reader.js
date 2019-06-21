"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Reader;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _readConfig = require("./utils/readConfig");

function Reader(props) {
  var namespace = props.namespace,
      _props$config = props.config,
      config = _props$config === void 0 ? {} : _props$config,
      restProps = (0, _objectWithoutProperties2["default"])(props, ["namespace", "config"]);
  return _react["default"].createElement(_readConfig.UseLayout, (0, _extends2["default"])({
    n: config.layout,
    title: config.title
  }, config.config || {}), config.items && config.items.map(function (itemCfg, i) {
    return _react["default"].createElement(_readConfig.UseItem, (0, _extends2["default"])({
      key: i,
      config: itemCfg,
      namespace: itemCfg.namespace || namespace
    }, restProps));
  }));
}