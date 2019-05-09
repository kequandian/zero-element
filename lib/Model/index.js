"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useModel = checkDispatch;
exports.createModel = createModel;
exports.removeModel = removeModel;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _Model = _interopRequireDefault(require("./Model"));

var _defaultEffects = _interopRequireDefault(require("./defaultEffects"));

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
    createModel({
      namespace: namespace
    });
    console.log('auto create model', namespace, models);
  }

  return models[namespace].useModel();
}

function createModel(_ref) {
  var namespace = _ref.namespace,
      _ref$reducers = _ref.reducers,
      reducers = _ref$reducers === void 0 ? {} : _ref$reducers,
      _ref$effects = _ref.effects,
      effects = _ref$effects === void 0 ? {} : _ref$effects;
  models[namespace] = new _Model["default"]({
    namespace: namespace,
    reducers: (0, _objectSpread2["default"])({
      save: function save(_ref2, _ref3) {
        var payload = _ref2.payload;
        var state = _ref3.state;
        return (0, _objectSpread2["default"])({}, state, payload);
      }
    }, reducers),
    effects: (0, _objectSpread2["default"])({}, _defaultEffects["default"], effects)
  });
}

function removeModel(namespace) {
  delete models[namespace];
}