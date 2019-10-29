"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useBaseForm;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectDestructuringEmpty2 = _interopRequireDefault(require("@babel/runtime/helpers/objectDestructuringEmpty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = require("react");

var _Model = require("../../Model");

var _format = require("../../utils/format");

var _PromiseGen = require("../../utils/PromiseGen");

var _PageContext = _interopRequireDefault(require("../../context/PageContext"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function useBaseForm(_ref, config) {
  var namespace = _ref.namespace,
      _ref$modelPath = _ref.modelPath,
      modelPath = _ref$modelPath === void 0 ? 'formData' : _ref$modelPath,
      extraData = _ref.extraData;
  var _config$API = config.API,
      API = _config$API === void 0 ? {} : _config$API;

  var _useModel = (0, _Model.useModel)({
    namespace: namespace,
    type: 'useBaseForm'
  }),
      _useModel2 = (0, _slicedToArray2["default"])(_useModel, 2),
      modelStatus = _useModel2[0],
      dispatch = _useModel2[1];

  var context = (0, _react.useContext)(_PageContext["default"]);
  var formData = modelStatus[modelPath] || {};
  var fAPI = (0, _format.formatAPI)(API, {
    namespace: namespace,
    data: extraData
  });
  var loading = modelStatus.load.effects['fetchOne'] || modelStatus.load.effects['createForm'] || modelStatus.load.effects['updateForm'] || false;

  function onGetOne(_ref2) {
    (0, _objectDestructuringEmpty2["default"])(_ref2);

    if (loading) {
      return Promise.reject();
    }

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

    if (loading) {
      return Promise.reject();
    }

    var api = fAPI.createAPI;
    return (0, _PromiseGen.PromiseAPI)(api, function () {
      return dispatch({
        type: 'createForm',
        API: api,
        MODELPATH: modelPath,
        payload: _objectSpread({}, formData, {}, fields)
      });
    });
  }

  function onUpdateForm(_ref4) {
    var fields = _ref4.fields;

    if (loading) {
      return Promise.reject();
    }

    var api = fAPI.updateAPI;
    return (0, _PromiseGen.PromiseAPI)(api, function () {
      return dispatch({
        type: 'updateForm',
        API: api,
        MODELPATH: modelPath,
        payload: _objectSpread({}, formData, {}, fields)
      });
    });
  }

  function onClearForm() {
    return dispatch({
      type: 'save',
      payload: (0, _defineProperty2["default"])({}, modelPath, {})
    });
  }

  return {
    loading: loading,
    config: config,
    data: formData,
    modelStatus: modelStatus,
    context: context,
    dispatch: dispatch,
    handle: {
      onGetOne: onGetOne,
      onCreateForm: onCreateForm,
      onUpdateForm: onUpdateForm,
      onClearForm: onClearForm
    }
  };
}