"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useBaseSearch;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = require("react");

var _Model = require("../../Model");

var _PageContext = _interopRequireDefault(require("../../context/PageContext"));

var _useShare3 = _interopRequireDefault(require("../../utils/hooks/useShare"));

function useBaseSearch(_ref, config) {
  var namespace = _ref.namespace,
      _ref$modelPath = _ref.modelPath,
      modelPath = _ref$modelPath === void 0 ? 'searchData' : _ref$modelPath,
      _ref$symbol = _ref.symbol,
      symbol = _ref$symbol === void 0 ? "useBaseSearch_".concat(modelPath) : _ref$symbol;
  var share = config.share;
  var symbolRef = (0, _react.useRef)(Symbol('useBaseSearch'));

  var _useShare = (0, _useShare3["default"])({
    share: share,
    symbol: symbolRef.current
  }),
      _useShare2 = (0, _slicedToArray2["default"])(_useShare, 1),
      shareData = _useShare2[0];

  var _useModel = (0, _Model.useModel)({
    namespace: namespace,
    type: 'useBaseSearch',
    symbol: symbol
  }),
      _useModel2 = (0, _slicedToArray2["default"])(_useModel, 2),
      modelStatus = _useModel2[0],
      dispatch = _useModel2[1];

  var context = (0, _react.useContext)(_PageContext["default"]);
  var searchData = modelStatus[modelPath];

  function onSearch(options) {
    var onGetList = shareData.onGetList;

    if (onGetList) {
      onGetList(options);
    } else {
      console.warn("\u8BF7\u5728 conifg \u4E2D\u4F7F\u7528 share \u6765\u7ED1\u5B9A\u9700\u8981\u5237\u65B0\u7684 Table");
    }
  }

  return {
    config: config,
    data: searchData,
    modelStatus: modelStatus,
    context: context,
    handle: {
      onSearch: onSearch
    }
  };
}