"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = formHooks;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _queryString = _interopRequireDefault(require("query-string"));

var _modelHooks = _interopRequireDefault(require("./modelHooks"));

var _PageContext = require("../../components/EventProxy/PageContext");

function formHooks(props) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _props$modelStatus = props.modelStatus,
      modelStatus = _props$modelStatus === void 0 ? {} : _props$modelStatus,
      requester = props.requester,
      dataPool = props.dataPool,
      history = props.history,
      _props$config = props.config,
      config = _props$config === void 0 ? {} : _props$config;
  var REDIRECT = config.REDIRECT;
  var modelPath = options.modelPath;
  var hooks = (0, _modelHooks["default"])(props, {
    modelPath: modelPath
  });
  var formData = hooks.getSelfModelStatus();

  function onGetData() {
    // const id = dataPool.getToLocation('id') || dataPool.getToRecord('id');
    hooks.fetch('fetchOne', {// payload: {
      //   id,
      // }
    });
  }

  function onFieldsChange(fields) {
    var _payload;

    var err = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    requester.save({
      payload: (_payload = {}, (0, _defineProperty2["default"])(_payload, modelPath, (0, _objectSpread2["default"])({}, formData, fields)), (0, _defineProperty2["default"])(_payload, "formValidate", err), _payload)
    });
  }

  function fetchSuccess(_ref) {
    var code = _ref.code,
        _ref$data = _ref.data,
        data = _ref$data === void 0 ? {} : _ref$data;
    if (code !== 200) return false;

    var _getPageContext = (0, _PageContext.getPageContext)(),
        onModalClose = _getPageContext.onModalClose,
        onListRefresh = _getPageContext.onListRefresh,
        pageModalVisible = _getPageContext.pageModalVisible;

    if (REDIRECT) {
      var path = REDIRECT;

      if (path.indexOf('{')) {
        var keyList = path.match(/\{\w+\}/g);
        keyList && keyList.forEach(function (key) {
          if (key.indexOf('{') > -1) {
            path = path.replace(key, data[key.replace(/\{|\}/g, '')]);
          }
        });
        path = path;
      }

      history.push(path);
    } else if (REDIRECT === undefined) {
      if (pageModalVisible === true) {
        if (onModalClose) {
          onModalClose();
        }
      }

      if (onListRefresh) {
        onListRefresh();
      }
    }
  }

  return {
    getSelfModelStatus: hooks.getSelfModelStatus,
    setSelfModelStatus: hooks.setSelfModelStatus,
    save: hooks.save,
    createForm: hooks.fetch.bind(this, 'createForm'),
    updateForm: hooks.fetch.bind(this, 'updateForm'),
    onGetData: onGetData,
    onFieldsChange: onFieldsChange,
    fetchSuccess: fetchSuccess
  };
}