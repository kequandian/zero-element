"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = childrenHooks;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

function childrenHooks(props) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _props$modelStatus = props.modelStatus,
      modelStatus = _props$modelStatus === void 0 ? {} : _props$modelStatus,
      requester = props.requester;
  var modelPath = options.modelPath,
      itemsPath = options.itemsPath;
  var formData = modelStatus[modelPath] || {};

  function getSelfModelStatus() {
    var defaultValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var match = modelStatus[modelPath];

    if (match === undefined) {
      console.warn("model state ".concat(modelPath, " is undefined"));
      return defaultValue;
    } else {
      return match[itemsPath] && (0, _toConsumableArray2["default"])(match[itemsPath]) || defaultValue;
    }
  }

  function setSelfModelStatus(data) {
    var tempObje = {};
    tempObje[itemsPath] = data;
    requester.save({
      payload: (0, _defineProperty2["default"])({}, modelPath, (0, _objectSpread2["default"])({}, formData, tempObje))
    });
  }

  return {
    getSelfModelStatus: getSelfModelStatus,
    setSelfModelStatus: setSelfModelStatus
  };
}