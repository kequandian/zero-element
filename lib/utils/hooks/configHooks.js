"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ConfigProxy;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _permission = require("../permission");

function ConfigProxy(props) {
  var _useState = (0, _react.useState)({}),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      config = _useState2[0],
      setConfig = _useState2[1];

  var perm = (0, _permission.getPerm)();
  (0, _react.useEffect)(function () {
    setConfig((0, _objectSpread2["default"])({}, configFilter(props.config)));
  }, [props.config, perm]);
  return _react["default"].cloneElement(props.children, {
    config: config
  });
}

function configFilter(config) {
  var _config$items = config.items,
      items = _config$items === void 0 ? [] : _config$items,
      restConfig = (0, _objectWithoutProperties2["default"])(config, ["items"]);
  var filter = [];
  var status403 = false; // 确保只插入一个 403 组件

  items.forEach(function (item) {
    var _item$config = item.config,
        config = _item$config === void 0 ? {} : _item$config;

    if (config.permission) {
      if (!(0, _permission.checkPerm)(config.permission, config.location)) {
        if (status403 === false) {
          status403 = true;
          filter.push({
            layout: 'Grid',
            component: '403'
          });
        }

        return false;
      }
    }

    filter.push(item);
  });
  return (0, _objectSpread2["default"])({}, restConfig, {
    items: filter
  });
}