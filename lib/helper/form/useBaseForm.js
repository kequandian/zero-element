"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useBaseForm;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectDestructuringEmpty2 = _interopRequireDefault(require("@babel/runtime/helpers/objectDestructuringEmpty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _Model = require("../../Model");

var _useAPI = _interopRequireDefault(require("../../utils/hooks/useAPI"));

function useBaseForm(_ref, config) {
  var namespace = _ref.namespace,
      _ref$modelPath = _ref.modelPath,
      modelPath = _ref$modelPath === void 0 ? 'formData' : _ref$modelPath;
  var _config$API = config.API,
      API = _config$API === void 0 ? {} : _config$API;

  var _useModel = (0, _Model.useModel)({
    namespace: namespace
  }),
      _useModel2 = (0, _slicedToArray2["default"])(_useModel, 2),
      modelStatus = _useModel2[0],
      dispatch = _useModel2[1];

  var formData = modelStatus[modelPath];
  var formatAPI = (0, _useAPI["default"])(API, {
    namespace: namespace
  });

  function onGetOne(_ref2) {
    (0, _objectDestructuringEmpty2["default"])(_ref2);
    var api = formatAPI.getAPI;
    if (api) dispatch({
      type: 'fetchOne',
      API: api,
      MODELPATH: modelPath,
      DIRECTRETURN: false,
      payload: (0, _objectSpread2["default"])({}, queryData, {
        current: current,
        pageSize: pageSize
      })
    });
  }

  function onCreateForm(_ref3) {
    var fields = _ref3.fields;
    var api = formatAPI.createAPI;

    if (api) {
      dispatch({
        type: 'createForm',
        API: api,
        MODELPATH: modelPath,
        payload: (0, _objectSpread2["default"])({}, fields, formData)
      }).then(function (_ref4) {
        var code = _ref4.code;

        if (code === 200) {
          console.log('创建成功');
        }
      });
    }
  }

  function onUpdateForm(_ref5) {
    var fields = _ref5.fields;
    var api = formatAPI.updateAPI;

    if (api) {
      dispatch({
        type: 'updateForm',
        API: api,
        MODELPATH: modelPath,
        payload: (0, _objectSpread2["default"])({}, fields, formData)
      }).then(function (_ref6) {
        var code = _ref6.code;

        if (code === 200) {
          console.log('更新成功');
        }
      });
    }
  }

  return {
    config: config,
    data: formData,
    modelStatus: modelStatus,
    onGetOne: onGetOne,
    onCreateForm: onCreateForm,
    onUpdateForm: onUpdateForm
  };
}