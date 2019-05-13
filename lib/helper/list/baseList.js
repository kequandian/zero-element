"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _Model = require("../../Model");

var _useAPI = _interopRequireDefault(require("../../utils/hooks/useAPI"));

var _APIConfig = require("../../global/APIConfig");

var _DataPool = require("../../DataPool");

function _default(_ref, config) {
  var namespace = _ref.namespace,
      modelPath = _ref.modelPath;
  var _config$API = config.API,
      API = _config$API === void 0 ? {} : _config$API;

  var _useModel = (0, _Model.useModel)({
    namespace: namespace
  }),
      _useModel2 = (0, _slicedToArray2["default"])(_useModel, 2),
      modelStatus = _useModel2[0],
      dispatch = _useModel2[1];

  var _useDataPool = (0, _DataPool.useDataPool)({
    namespace: namespace
  }),
      _useDataPool2 = (0, _slicedToArray2["default"])(_useDataPool, 2),
      setRecord = _useDataPool2[1].setRecord;

  var _modelStatus$listData = modelStatus.listData,
      listData = _modelStatus$listData === void 0 ? {} : _modelStatus$listData;
  var current = listData.current,
      pageSize = listData.pageSize,
      _listData$records = listData.records,
      records = _listData$records === void 0 ? [] : _listData$records;
  var formatAPI = (0, _useAPI["default"])(API, {
    namespace: namespace
  });

  function onGetList(_ref2) {
    var _ref2$current = _ref2.current,
        current = _ref2$current === void 0 ? (0, _APIConfig.get)('DEFAULT_current') : _ref2$current,
        _ref2$pageSize = _ref2.pageSize,
        pageSize = _ref2$pageSize === void 0 ? (0, _APIConfig.get)('DEFAULT_pageSize') : _ref2$pageSize,
        _ref2$queryData = _ref2.queryData,
        queryData = _ref2$queryData === void 0 ? {} : _ref2$queryData;
    var api = formatAPI.listAPI;

    if (api) {
      dispatch({
        type: 'fetchList',
        API: api,
        MODELPATH: modelPath,
        payload: (0, _objectSpread2["default"])({}, queryData, {
          current: current,
          pageSize: pageSize
        })
      });
    }
  }

  function onRefresh() {
    onGetList({
      current: current,
      pageSize: pageSize
    });
  }

  function onDelete(_ref3) {
    var record = _ref3.record,
        _ref3$options = _ref3.options,
        options = _ref3$options === void 0 ? {} : _ref3$options;
    setRecord(record);
    var api = formatAPI.deleteAPI;

    if (api) {
      dispatch({
        type: 'deleteOne',
        API: api,
        MODELPATH: modelPath
      }).then(function (data) {
        console.log(233333, data);
      });
    }
  }

  return {
    config: config,
    data: records,
    modelStatus: modelStatus,
    onGetList: onGetList,
    onRefresh: onRefresh,
    onDelete: onDelete
  };
}