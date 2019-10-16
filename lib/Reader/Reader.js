"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Reader;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _readConfig = require("./utils/readConfig");

var _DataPool = require("../DataPool");

var _request = require("../utils/request");

var _global = _interopRequireDefault(require("zero-element-global/lib/global"));

function Reader(props) {
  var namespace = props.namespace,
      _props$config = props.config,
      config = _props$config === void 0 ? {} : _props$config,
      restProps = (0, _objectWithoutProperties2["default"])(props, ["namespace", "config"]);

  var _ref = window.ZEle || {},
      _ref$remoteConfig = _ref.remoteConfig,
      remoteConfig = _ref$remoteConfig === void 0 ? {} : _ref$remoteConfig;

  var _useState = (0, _react.useState)(function (_) {
    var _global$removeConfig = _global["default"].removeConfig,
        removeConfig = _global$removeConfig === void 0 ? true : _global$removeConfig;
    var dataPool = (0, _DataPool.getDataPool)(namespace);
    var pathname = dataPool.getLocationPathname();
    var searchData = dataPool.getLocationSearch();
    var matchItem = remoteConfig[pathname];

    if (process.env.NODE_ENV === 'production') {
      if (removeConfig && matchItem) {
        var search = matchItem.search;

        if (search && Array.isArray(search)) {
          var rst = search.every(function (key) {
            return searchData[key] !== undefined;
          });
          if (!rst) return config;
        }

        getRemoteConfig(matchItem);
        return {
          layout: 'Loading'
        };
      }
    }

    return config;
  }),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      canConfig = _useState2[0],
      setCanConfig = _useState2[1];

  function getRemoteConfig(_ref2) {
    var target = _ref2.target,
        path = _ref2.path;
    console.log("\u9875\u9762 ".concat(path, " \u4F7F\u7528\u4E86\u8FDC\u7AEF\u914D\u7F6E\u6587\u4EF6"));
    (0, _request.query)(target).then(function (_ref3) {
      var status = _ref3.status,
          data = _ref3.data;

      if (status === 200) {
        if (data.code) {
          if (data.code === 200) {
            setCanConfig(data.data);
            return false;
          }
        } else {
          setCanConfig(data);
          return false;
        }
      }

      throw new Error('网络错误');
    })["catch"](function (e) {
      if (e.message) {
        console.warn(e.message);
      }

      console.warn("\u9875\u9762 ".concat(path, " \u672A\u80FD\u6B63\u5E38\u83B7\u53D6\u8FDC\u7AEF\u914D\u7F6E\u6587\u4EF6"));
      setCanConfig(config);
    });
  }

  if ((0, _typeof2["default"])(canConfig) !== 'object') {
    throw new Error('canConfig is invalid');
  }

  return _react["default"].createElement(_readConfig.UseLayout, (0, _extends2["default"])({
    n: canConfig.layout,
    title: canConfig.title
  }, canConfig.config || {}), canConfig.items && canConfig.items.map(function (itemCfg, i) {
    return _react["default"].createElement(_readConfig.UseItem, (0, _extends2["default"])({
      key: i,
      config: itemCfg,
      namespace: itemCfg.namespace || namespace
    }, restProps));
  }));
}