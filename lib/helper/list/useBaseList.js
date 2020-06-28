"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useBaseList;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = require("react");

var _Model = require("../../Model");

var _format = require("../../utils/format");

var _APIConfig = require("../../config/APIConfig");

var _PromiseGen = require("../../utils/PromiseGen");

var _lifeCycle = require("../../utils/hooks/lifeCycle");

var _useShare3 = _interopRequireDefault(require("../../utils/hooks/useShare"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function useBaseList(_ref, config) {
  var namespace = _ref.namespace,
      _ref$modelPath = _ref.modelPath,
      modelPath = _ref$modelPath === void 0 ? 'listData' : _ref$modelPath,
      extraData = _ref.extraData;
  var _config$API = config.API,
      API = _config$API === void 0 ? {} : _config$API,
      share = config.share;

  var _useShare = (0, _useShare3["default"])({
    share: share
  }),
      _useShare2 = (0, _slicedToArray2["default"])(_useShare, 3),
      shareData = _useShare2[0],
      setShare = _useShare2[1],
      destroyShare = _useShare2[2];

  var _useModel = (0, _Model.useModel)({
    namespace: namespace,
    type: 'useBaseList'
  }),
      _useModel2 = (0, _slicedToArray2["default"])(_useModel, 3),
      modelStatus = _useModel2[0],
      dispatch = _useModel2[1],
      onCanRecyclable = _useModel2[2];

  var listData = modelStatus[modelPath];
  var current = listData.current,
      pageSize = listData.pageSize,
      records = listData.records;
  var fAPI = (0, _react.useRef)();
  fAPI.current = (0, _format.formatAPI)(API, {
    namespace: namespace,
    data: extraData
  });
  var loading = false; // const loading = modelStatus.load.effects['fetchList'] || false;

  (0, _lifeCycle.useWillMount)(function (_) {
    if (share) {
      setShare({
        onGetList: onGetList
      });
    }
  });
  (0, _react.useEffect)(function (_) {
    if (share) {
      var _current = listData.current,
          _pageSize = listData.pageSize;
      setShare({
        current: _current,
        pageSize: _pageSize
      });
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [share, listData]);
  (0, _lifeCycle.useWillUnmount)(function () {
    return destroyShare(['onGetList', 'current', 'pageSize']);
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
    var qD = shareData.queryData;
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

    var api = fAPI.current.listAPI;
    return (0, _PromiseGen.PromiseAPI)(api, function () {
      return dispatch({
        type: 'fetchList',
        API: api,
        MODELPATH: modelPath,
        payload: payload
      });
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
    var api = fAPI.current.deleteAPI;

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

  function onClearList() {
    return dispatch({
      type: 'save',
      payload: (0, _defineProperty2["default"])({}, modelPath, {})
    });
  }

  return {
    loading: loading,
    config: config,
    data: records,
    modelStatus: modelStatus,
    dispatch: dispatch,
    handle: {
      onGetList: onGetList,
      onRefresh: onRefresh,
      onDelete: onDelete,
      onClearList: onClearList,
      onCanRecyclable: onCanRecyclable
    }
  };
}