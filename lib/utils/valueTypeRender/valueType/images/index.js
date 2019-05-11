"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = valueTypeImages;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _lifeCycle = require("../../../hooks/lifeCycle");

var _ImageView = _interopRequireDefault(require("../../../../components/BaseElement/ImageView"));

function valueTypeImages(_ref) {
  var text = _ref.data.text;

  var _useState = (0, _react.useState)(''),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      url = _useState2[0],
      setUrl = _useState2[1];

  (0, _lifeCycle.useDidMount)(function () {
    try {
      setUrl(JSON.parse(text)[0]);
    } catch (error) {
      setUrl(text);
    }
  });
  return _react["default"].createElement(_ImageView["default"], {
    url: url
  });
}