"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = searchHooks;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _queryString = _interopRequireDefault(require("query-string"));

var _modelHooks = _interopRequireDefault(require("./modelHooks"));

var _PageContext = require("../../components/EventProxy/PageContext");

function searchHooks(props) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _props$modelStatus = props.modelStatus,
      modelStatus = _props$modelStatus === void 0 ? {} : _props$modelStatus,
      requester = props.requester,
      dataPool = props.dataPool,
      history = props.history;
  var modelPath = options.modelPath;
  var hooks = (0, _modelHooks["default"])(props, {
    modelPath: modelPath
  });
  var searchData = hooks.getSelfModelStatus();

  function onFieldsChange(fields, err) {
    var _payload;

    requester.save({
      payload: (_payload = {}, (0, _defineProperty2["default"])(_payload, modelPath, (0, _objectSpread2["default"])({}, searchData, fields)), (0, _defineProperty2["default"])(_payload, "searchValidate", err), _payload)
    });
  }

  function onRefresh() {
    var pageContext = (0, _PageContext.getPageContext)();

    if (pageContext.onListRefresh) {
      pageContext.onListRefresh();
    }
  }

  function onReset() {
    hooks.setSelfModelStatus({});
  }

  function onSubmit(values) {
    var _getPageContext = (0, _PageContext.getPageContext)(),
        onListFetch = _getPageContext.onListFetch;

    var cloneValue = (0, _objectSpread2["default"])({}, values);
    Object.keys(cloneValue).forEach(function (key) {
      if ((0, _typeof2["default"])(cloneValue[key]) === 'object' && cloneValue[key].hasOwnProperty('value')) {
        cloneValue[key] = cloneValue[key].value;
      }
    });

    if (onListFetch) {
      onListFetch({}, cloneValue);
    }
  }

  return {
    getSelfModelStatus: hooks.getSelfModelStatus,
    setSelfModelStatus: hooks.setSelfModelStatus,
    save: hooks.save,
    onFieldsChange: onFieldsChange,
    onRefresh: onRefresh,
    onSubmit: onSubmit,
    onReset: onReset
  };
}