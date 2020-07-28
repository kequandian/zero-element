"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useBaseForm;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectDestructuringEmpty2 = _interopRequireDefault(require("@babel/runtime/helpers/objectDestructuringEmpty"));

var _Model = require("../../Model");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function useBaseForm(_ref, config) {
  var namespace = _ref.namespace,
      extraData = _ref.extraData;
  var _config$API = config.API,
      API = _config$API === void 0 ? {} : _config$API;
  var model = (0, _Model.useModel)({
    namespace: namespace,
    type: 'useBaseForm'
  });
  var formData = model.formData || {};
  var loading = model.loading;

  function onGetOne(_ref2) {
    (0, _objectDestructuringEmpty2["default"])(_ref2);

    if (loading) {
      return Promise.reject();
    }

    return model.fetchOne({
      API: API.getAPI,
      extraData: extraData,
      payload: {}
    });
  }

  function onCreateForm(_ref3) {
    var fields = _ref3.fields,
        options = _ref3.options;

    if (loading) {
      return Promise.reject();
    }

    return model.createForm({
      API: API.createAPI,
      options: options,
      // request options
      extraData: extraData,
      payload: _objectSpread(_objectSpread({}, formData), fields)
    });
  }

  function onUpdateForm(_ref4) {
    var fields = _ref4.fields,
        options = _ref4.options;

    if (loading) {
      return Promise.reject();
    }

    return model.updateForm({
      API: API.updateAPI,
      options: options,
      // request options
      extraData: extraData,
      payload: _objectSpread(_objectSpread({}, formData), fields)
    });
  }

  function onClearForm() {
    return model.save('formData', {});
  }

  return {
    loading: loading,
    config: config,
    data: formData,
    model: model,
    handle: {
      onGetOne: onGetOne,
      onCreateForm: onCreateForm,
      onUpdateForm: onUpdateForm,
      onClearForm: onClearForm
    }
  };
}