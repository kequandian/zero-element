"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useBaseForm;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectDestructuringEmpty2 = _interopRequireDefault(require("@babel/runtime/helpers/objectDestructuringEmpty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = require("react");

var _Model = require("../../Model");

var _format = require("../../utils/format");

var _PromiseGen = require("../../utils/PromiseGen");

var _PageContext = _interopRequireDefault(require("../../context/PageContext"));

function useBaseForm(_ref, config) {
  var namespace = _ref.namespace,
      _ref$modelPath = _ref.modelPath,
      modelPath = _ref$modelPath === void 0 ? 'formData' : _ref$modelPath,
      _ref$symbol = _ref.symbol,
      symbol = _ref$symbol === void 0 ? "useBaseForm_".concat(modelPath) : _ref$symbol;
  var _config$API = config.API,
      API = _config$API === void 0 ? {} : _config$API;

  var _useModel = (0, _Model.useModel)({
    namespace: namespace,
    type: 'useBaseForm',
    symbol: symbol
  }),
      _useModel2 = (0, _slicedToArray2["default"])(_useModel, 2),
      modelStatus = _useModel2[0],
      dispatch = _useModel2[1];

  var context = (0, _react.useContext)(_PageContext["default"]);
  var formData = modelStatus[modelPath];
  var fAPI = (0, _format.formatAPI)(API, {
    namespace: namespace
  });

  function onGetOne(_ref2) {
    (0, _objectDestructuringEmpty2["default"])(_ref2);
    var api = fAPI.getAPI;
    return (0, _PromiseGen.PromiseAPI)(api, function () {
      return dispatch({
        type: 'fetchOne',
        API: api,
        MODELPATH: modelPath,
        DIRECTRETURN: false,
        payload: {}
      });
    });
  }

  function onCreateForm(_ref3) {
    var fields = _ref3.fields;
    var api = fAPI.createAPI;
    return (0, _PromiseGen.PromiseAPI)(api, function () {
      return dispatch({
        type: 'createForm',
        API: api,
        MODELPATH: modelPath,
        payload: (0, _objectSpread2["default"])({}, fields, formData)
      });
    });
  }

  function onUpdateForm(_ref4) {
    var fields = _ref4.fields;
    var api = fAPI.updateAPI;
    return (0, _PromiseGen.PromiseAPI)(api, function () {
      return dispatch({
        type: 'updateForm',
        API: api,
        MODELPATH: modelPath,
        payload: (0, _objectSpread2["default"])({}, fields, formData)
      });
    });
  }

  return {
    config: config,
    data: formData,
    modelStatus: modelStatus,
    context: context,
    handle: {
      onGetOne: onGetOne,
      onCreateForm: onCreateForm,
      onUpdateForm: onUpdateForm
    }
  };
}