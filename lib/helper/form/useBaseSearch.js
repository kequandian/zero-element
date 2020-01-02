"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useBaseSearch;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = require("react");

var _Model = require("../../Model");

var _PageContext = _interopRequireDefault(require("../../context/PageContext"));

var _useShare3 = _interopRequireDefault(require("../../utils/hooks/useShare"));

var _lifeCycle = require("../../utils/hooks/lifeCycle");

function useBaseSearch(_ref, config) {
  var namespace = _ref.namespace,
      _ref$modelPath = _ref.modelPath,
      modelPath = _ref$modelPath === void 0 ? 'searchData' : _ref$modelPath;
  var share = config.share;

  var _useShare = (0, _useShare3["default"])({
    share: share
  }),
      _useShare2 = (0, _slicedToArray2["default"])(_useShare, 3),
      shareData = _useShare2[0],
      setShare = _useShare2[1],
      destroyShare = _useShare2[2];

  var _useModel = (0, _Model.useModel)({
    namespace: namespace,
    type: 'useBaseSearch'
  }),
      _useModel2 = (0, _slicedToArray2["default"])(_useModel, 3),
      modelStatus = _useModel2[0],
      dispatch = _useModel2[1],
      onCanRecyclable = _useModel2[2];

  var context = (0, _react.useContext)(_PageContext["default"]);
  (0, _lifeCycle.useWillUnmount)(function () {
    return destroyShare('queryData');
  });
  var searchData = modelStatus[modelPath] || {};

  function onSearch(queryData) {
    var current = shareData.current,
        pageSize = shareData.pageSize,
        onGetList = shareData.onGetList;

    if (onGetList) {
      onGetList({
        current: 1,
        pageSize: pageSize,
        queryData: queryData
      });
    } else {
      console.warn("\u8BF7\u5728 conifg \u4E2D\u4F7F\u7528 share \u6765\u7ED1\u5B9A\u9700\u8981\u5237\u65B0\u7684 Table");
    }

    onSetSearchData(queryData);
  }

  function onSetSearchData() {
    var queryData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    setShare({
      queryData: queryData || {}
    });
  }

  function onClearSearch() {
    return dispatch({
      type: 'save',
      payload: (0, _defineProperty2["default"])({}, modelPath, {})
    });
  }

  return {
    loading: modelStatus.load.effects['fetchList'] || false,
    config: config,
    data: searchData,
    modelStatus: modelStatus,
    context: context,
    dispatch: dispatch,
    handle: {
      onSearch: onSearch,
      onSetSearchData: onSetSearchData,
      onClearSearch: onClearSearch,
      onCanRecyclable: onCanRecyclable
    }
  };
}