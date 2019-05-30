"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useBaseList;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _Model = require("../../Model");

var _format = require("../../utils/format");

var _APIConfig = require("zero-element-global/lib/APIConfig");

var _DataPool = require("../../DataPool");

function useBaseList(_ref, config) {
  var namespace = _ref.namespace,
      _ref$modelPath = _ref.modelPath,
      modelPath = _ref$modelPath === void 0 ? 'listData' : _ref$modelPath;
  var _config$API = config.API,
      API = _config$API === void 0 ? {} : _config$API;

  var _useModel = (0, _Model.useModel)({
    namespace: namespace
  }),
      _useModel2 = (0, _slicedToArray2["default"])(_useModel, 2),
      modelStatus = _useModel2[0],
      dispatch = _useModel2[1];

  var dataPool = (0, _DataPool.getDataPool)(namespace);
  var listData = modelStatus[modelPath];
  var current = listData.current,
      pageSize = listData.pageSize,
      _listData$records = listData.records,
      records = _listData$records === void 0 ? [] : _listData$records;
  var fAPI = (0, _format.formatAPI)(API, {
    namespace: namespace
  });

  function onGetList(_ref2) {
    var _ref2$current = _ref2.current,
        current = _ref2$current === void 0 ? (0, _APIConfig.get)('DEFAULT_current') : _ref2$current,
        _ref2$pageSize = _ref2.pageSize,
        pageSize = _ref2$pageSize === void 0 ? (0, _APIConfig.get)('DEFAULT_pageSize') : _ref2$pageSize,
        _ref2$queryData = _ref2.queryData,
        queryData = _ref2$queryData === void 0 ? {} : _ref2$queryData;
    var api = fAPI.listAPI;

    if (api) {
      dispatch({
        type: 'fetchList',
        API: api,
        MODELPATH: modelPath,
        DIRECTRETURN: false,
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
    // dataPool.setRecord(record); 应该由 handleAction 的上一层调用
    var api = fAPI.deleteAPI;

    if (api) {
      dispatch({
        type: 'deleteOne',
        API: api,
        MODELPATH: modelPath
      }).then(function (_ref4) {
        var code = _ref4.code;

        if (code === 200) {
          onRefresh();
        }
      });
    }
  }

  return {
    config: config,
    data: records,
    modelStatus: modelStatus,
    handle: {
      onGetList: onGetList,
      onRefresh: onRefresh,
      onDelete: onDelete
    }
  };
}