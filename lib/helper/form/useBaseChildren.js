"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useBaseChildren;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread4 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = require("react");

var _Model = require("../../Model");

var _format = require("../../utils/format");

var _APIConfig = require("zero-element-global/lib/APIConfig");

var _PageContext = _interopRequireDefault(require("../../context/PageContext"));

var _lifeCycle = require("../../utils/hooks/lifeCycle");

var _useShare3 = _interopRequireDefault(require("../../utils/hooks/useShare"));

function useBaseChildren(_ref, config) {
  var namespace = _ref.namespace,
      _ref$modelPath = _ref.modelPath,
      modelPath = _ref$modelPath === void 0 ? 'formData' : _ref$modelPath,
      _ref$itemsPath = _ref.itemsPath,
      itemsPath = _ref$itemsPath === void 0 ? 'items' : _ref$itemsPath,
      _ref$symbol = _ref.symbol,
      symbol = _ref$symbol === void 0 ? "useBaseChildren_".concat(modelPath, "_").concat(itemsPath) : _ref$symbol;
  var _config$API = config.API,
      API = _config$API === void 0 ? {} : _config$API,
      share = config.share;
  var symbolRef = (0, _react.useRef)(Symbol('useBaseChildren'));
  var idRef = (0, _react.useRef)(0);

  var _useShare = (0, _useShare3["default"])({
    share: share,
    symbol: symbolRef.current
  }),
      _useShare2 = (0, _slicedToArray2["default"])(_useShare, 3),
      setShare = _useShare2[1],
      destroyShare = _useShare2[2];

  var model = (0, _Model.getModel)(namespace);
  var modelStatus = model.state;

  var _useModel = (0, _Model.useModel)({
    namespace: namespace,
    type: 'useBaseChildren',
    symbol: symbol
  }),
      _useModel2 = (0, _slicedToArray2["default"])(_useModel, 2),
      dispatch = _useModel2[1];

  var context = (0, _react.useContext)(_PageContext["default"]);
  var formData = modelStatus[modelPath];
  var itemsData = formData[itemsPath] || [];
  var fAPI = (0, _format.formatAPI)(API, {
    namespace: namespace
  });
  (0, _lifeCycle.useWillMount)(function (_) {
    if (share) {
      setShare({
        onGetList: onGetList
      });
    }
  });
  (0, _lifeCycle.useWillUnmount)(function () {
    return destroyShare('onGetList');
  });

  function onGetList(_ref2) {
    var _ref2$current = _ref2.current,
        current = _ref2$current === void 0 ? (0, _APIConfig.get)('DEFAULT_current') : _ref2$current,
        _ref2$pageSize = _ref2.pageSize,
        pageSize = _ref2$pageSize === void 0 ? (0, _APIConfig.get)('DEFAULT_pageSize') : _ref2$pageSize,
        _ref2$queryData = _ref2.queryData,
        queryData = _ref2$queryData === void 0 ? {} : _ref2$queryData;
    var api = fAPI.listAPI;
    console.warn('TODO', api);
  }

  function onCreate(data) {
    itemsData.push((0, _objectSpread4["default"])({}, data, {
      '_id': idRef.current++
    }));
    dispatch({
      type: 'save',
      payload: (0, _objectSpread4["default"])({}, modelStatus, (0, _defineProperty2["default"])({}, modelPath, (0, _objectSpread4["default"])({}, formData, (0, _defineProperty2["default"])({}, itemsPath, itemsData))))
    });
  }

  function onRemoveChild(_ref3) {
    var record = _ref3.record,
        _ref3$options = _ref3.options,
        options = _ref3$options === void 0 ? {} : _ref3$options;
    var test = itemsData.filter(function (item) {
      if (item._id !== undefined) {
        return item._id !== record._id;
      }

      return item.id !== record.id;
    });
    dispatch({
      type: 'saveData',
      payload: {
        key: modelPath,
        data: (0, _defineProperty2["default"])({}, itemsPath, test)
      }
    });
  }

  return {
    config: config,
    data: itemsData,
    modelStatus: modelStatus,
    context: context,
    handle: {
      onGetList: onGetList,
      onCreate: onCreate,
      onRemoveChild: onRemoveChild
    }
  };
}