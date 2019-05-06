"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireDefault(require("react"));

var _Model = require("./Model");

var _default = function _default(props) {
  var _useModel = (0, _Model.useModel)(props),
      _useModel2 = (0, _slicedToArray2["default"])(_useModel, 2),
      modelStatus = _useModel2[0],
      dispatch = _useModel2[1];

  console.log(111, modelStatus);
  return _react["default"].createElement("div", null, "TestTestTest name: ", modelStatus.name, _react["default"].createElement("button", {
    onClick: function onClick() {
      return dispatch({
        type: 'test',
        payload: {
          demo: 123456
        }
      });
    }
  }, "Click test"), _react["default"].createElement("button", {
    onClick: function onClick() {
      return dispatch({
        type: 'save',
        payload: {
          demo: 123456
        }
      });
    }
  }, "Click save"));
};

exports["default"] = _default;