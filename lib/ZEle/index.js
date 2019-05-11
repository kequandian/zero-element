"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ZEle;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireDefault(require("react"));

var _Model = require("../Model");

var _lifeCycle = require("../utils/hooks/lifeCycle");

var _Reader = _interopRequireDefault(require("../Reader"));

function ZEle(props) {
  var _useModel = (0, _Model.useModel)(props),
      _useModel2 = (0, _slicedToArray2["default"])(_useModel, 2),
      modelStatus = _useModel2[0],
      dispatch = _useModel2[1]; // const pageItemProps = {
  //   onChangePageTitle: handleChangePageTitle,
  // }


  return _react["default"].createElement("div", null, _react["default"].createElement(_Reader["default"], props));
}