"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = modelHooks;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

function modelHooks(props) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _props$modelStatus = props.modelStatus,
      modelStatus = _props$modelStatus === void 0 ? {} : _props$modelStatus,
      requester = props.requester;
  var modelPath = options.modelPath;

  function getSelfModelStatus(defaultValue) {
    var match = modelStatus[modelPath];

    if (match === undefined) {
      if (modelPath.indexOf('children') === -1) {
        console.warn("model state ".concat(modelPath, " is undefined"));
      }

      return defaultValue;
    } else if (match instanceof Object) {
      if (defaultValue !== undefined) {
        if (Array.isArray(match) && match.length === 0) {
          return defaultValue;
        }

        if (Object.keys(match).length === 0) {
          return defaultValue;
        }

        return match;
      }
    }

    return match;
  }

  function setSelfModelStatus(data) {
    requester.save({
      payload: (0, _defineProperty2["default"])({}, modelPath, (0, _objectSpread2["default"])({}, data))
    });
  }

  function fetch(name, data) {
    return requester[name]((0, _objectSpread2["default"])({
      MODELPATH: modelPath
    }, data));
  }

  return {
    getSelfModelStatus: getSelfModelStatus,
    setSelfModelStatus: setSelfModelStatus,
    fetch: fetch,
    save: fetch.bind(this, 'save')
  };
}