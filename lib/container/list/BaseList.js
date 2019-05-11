"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = BaseList;

var _react = _interopRequireWildcard(require("react"));

var _baseList = _interopRequireDefault(require("../../helper/list/baseList"));

var _Table = _interopRequireDefault(require("../../components/Table"));

function BaseList(props) {
  var namespace = props.namespace;
  var listProps = (0, _baseList["default"])(namespace);
  var getList = listProps.getList;
  (0, _react.useEffect)(function (_) {
    getList();
  }, []);
  console.log(111, props, listProps);
  return _react["default"].createElement(_Table["default"], listProps);
}