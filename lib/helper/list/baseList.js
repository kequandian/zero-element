"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _Model = require("../../Model");

var _useAPI = _interopRequireDefault(require("../../utils/hooks/useAPI"));

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

  var _modelStatus$listData = modelStatus.listData,
      listData = _modelStatus$listData === void 0 ? {} : _modelStatus$listData;
  var _listData$records = listData.records,
      records = _listData$records === void 0 ? [] : _listData$records;
  var formatAPI = (0, _useAPI["default"])(API, {
    namespace: namespace
  });

  function getList() {
    var api = formatAPI.listAPI;

    if (formatAPI) {
      dispatch({
        type: 'fetchList',
        API: api,
        MODELPATH: modelPath
      });
    }
  }

  return {
    data: records,
    modelStatus: modelStatus,
    getList: getList
  };
}