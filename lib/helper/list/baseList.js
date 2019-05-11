"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _Model = require("../../Model");

var _endpoint = require("../../utils/request/endpoint");

function _default(namespace) {
  var _useModel = (0, _Model.useModel)({
    namespace: namespace
  }),
      _useModel2 = (0, _slicedToArray2["default"])(_useModel, 2),
      modelStatus = _useModel2[0],
      dispatch = _useModel2[1];

  var _modelStatus$listData = modelStatus.listData,
      listData = _modelStatus$listData === void 0 ? {} : _modelStatus$listData;
  var _listData$records = listData.records,
      records = _listData$records === void 0 ? [] : _listData$records;

  function getList() {
    (0, _endpoint.set)('http://127.0.0.1:8080');
    dispatch({
      type: 'fetchList',
      API: '/api/generate/sql'
    });
  }

  return {
    data: records,
    modelStatus: modelStatus,
    getList: getList
  };
}