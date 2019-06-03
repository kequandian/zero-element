"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ZEle;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _PageContext = _interopRequireDefault(require("../context/PageContext"));

var _lifeCycle = require("../utils/hooks/lifeCycle");

var _reducer = _interopRequireDefault(require("./reducer"));

var _DataPool = require("../DataPool");

var _Reader = _interopRequireDefault(require("../Reader"));

var _extraManage = require("../utils/extraManage");

var Provider = _PageContext["default"].Provider;

function ZEle(props) {
  var namespace = props.namespace,
      _props$destroy = props.destroy,
      destroy = _props$destroy === void 0 ? {} : _props$destroy;

  var _useReducer = (0, _react.useReducer)(_reducer["default"], {
    namespace: namespace,
    extra: {},
    extraState: {}
  }),
      _useReducer2 = (0, _slicedToArray2["default"])(_useReducer, 2),
      pageState = _useReducer2[0],
      dispatch = _useReducer2[1];

  (0, _lifeCycle.useWillMount)(function (_) {
    (0, _extraManage.initExtra)(namespace, dispatch);
  });
  (0, _lifeCycle.useWillUnmount)(function () {
    var destroyObj = destroy;

    if (destroy && destroy === true) {
      destroyObj = {
        dataPool: true,
        extra: true
      };
    }

    destroyObj.dataPool ? (0, _DataPool.destroyDataPool)(namespace) : void 0;
    destroyObj.extra ? (0, _extraManage.destroyExtra)(namespace) : void 0;
  });
  return _react["default"].createElement(Provider, {
    value: pageState
  }, _react["default"].createElement(_Reader["default"], props), _react["default"].createElement("div", null, pageState.extra.modal));
}