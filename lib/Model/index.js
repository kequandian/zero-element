"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useModel = checkDispatch;
exports.createModel = createModel;
exports.removeModel = removeModel;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _Model = _interopRequireDefault(require("./Model"));

var models = {};

function checkDispatch(props) {
  if ((0, _typeof2["default"])(props) === 'object') {
    var dispatch = props.dispatch,
        modelStatus = props.modelStatus,
        namespace = props.namespace;
    return getModel(namespace);

    if (dispatch && typeof dispatch === 'function') {
      return [modelStatus, dispatch];
    } else {
      return getModel(namespace);
    }
  }
}

function getModel(namespace) {
  if (!models[namespace]) {
    createModel(namespace);
  }

  return models[namespace].useModel();
}

function createModel(namespace) {
  models[namespace] = new _Model["default"](namespace);
  console.log('create', namespace, models);
}

function removeModel(namespace) {
  delete models[namespace];
}