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
  var namespace = props.namespace,
      config = props.config;
  var listProps = (0, _baseList["default"])({
    namespace: namespace,
    modelPath: 'listData'
  }, config);
  var onGetList = listProps.onGetList,
      onDelete = listProps.onDelete;
  (0, _react.useEffect)(function (_) {
    onGetList({});
  }, []);
  return _react["default"].createElement(_Table["default"], listProps);
}