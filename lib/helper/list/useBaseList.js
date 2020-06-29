"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useBaseList;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _Model = require("../../Model");

var _APIConfig = require("../../config/APIConfig");

var _lifeCycle = require("../../utils/hooks/lifeCycle");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function useBaseList(_ref, config) {
  var namespace = _ref.namespace;
  var _config$API = config.API,
      API = _config$API === void 0 ? {} : _config$API;
  var model = (0, _Model.useModel)({
    namespace: namespace,
    type: 'useBaseList'
  });
  var listData = model.listData;
  var current = listData.current,
      pageSize = listData.pageSize,
      records = listData.records;
  var loading = model.fetchList.loading;
  (0, _Model.setPageData)(namespace, 'onGetList', onGetList);
  (0, _Model.setPageData)(namespace, 'current', current);
  (0, _Model.setPageData)(namespace, 'pageSize', pageSize);
  (0, _lifeCycle.useWillUnmount)(function () {
    (0, _Model.setPageData)(namespace, 'onGetList', undefined);
    (0, _Model.setPageData)(namespace, 'current', undefined);
    (0, _Model.setPageData)(namespace, 'pageSize', undefined);
  });

  function onGetList(_ref2) {
    var _objectSpread2;

    var _ref2$current = _ref2.current,
        current = _ref2$current === void 0 ? (0, _APIConfig.get)('DEFAULT_current') : _ref2$current,
        _ref2$pageSize = _ref2.pageSize,
        pageSize = _ref2$pageSize === void 0 ? (0, _APIConfig.get)('DEFAULT_pageSize') : _ref2$pageSize,
        _ref2$queryData = _ref2.queryData,
        queryData = _ref2$queryData === void 0 ? {} : _ref2$queryData,
        _ref2$sorter = _ref2.sorter,
        sorter = _ref2$sorter === void 0 ? {} : _ref2$sorter;

    var _getPageData = (0, _Model.getPageData)(namespace),
        qD = _getPageData.queryData;

    var field = sorter.field,
        order = sorter.order;

    var payload = _objectSpread(_objectSpread(_objectSpread({}, qD), queryData), {}, (_objectSpread2 = {}, (0, _defineProperty2["default"])(_objectSpread2, (0, _APIConfig.get)('REQUEST_FIELD_current'), current), (0, _defineProperty2["default"])(_objectSpread2, (0, _APIConfig.get)('REQUEST_FIELD_pageSize'), pageSize), _objectSpread2));

    if (field && order) {
      payload[(0, _APIConfig.get)('REQUEST_FIELD_field')] = field;
      payload[(0, _APIConfig.get)('REQUEST_FIELD_order')] = order === 'ascend' ? (0, _APIConfig.get)('REQUEST_FIELD_ascend') : (0, _APIConfig.get)('REQUEST_FIELD_descend');
    }

    if (loading) {
      return Promise.reject();
    }

    return model.fetchList({
      API: API.listAPI,
      payload: payload
    });
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
    if (API.deleteAPI) {
      model.deleteOne({
        API: API.deleteAPI
      }).then(function (_ref4) {
        var code = _ref4.code;

        if (code === 200) {
          onRefresh();
        }
      });
    }
  }

  function onClearList() {
    return model.listData = {
      records: []
    };
  }

  return {
    loading: loading,
    config: config,
    data: records,
    model: model,
    handle: {
      onGetList: onGetList,
      onRefresh: onRefresh,
      onDelete: onDelete,
      onClearList: onClearList
    }
  };
}