"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useModel = checkDispatch;
exports.createModel = createModel;
exports.removeModel = removeModel;
exports.getModel = getModelEntity;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _Model = _interopRequireDefault(require("./Model"));

var _defaultEffects = _interopRequireDefault(require("./defaultEffects"));

var models = {};

function checkDispatch(options) {
  if ((0, _typeof2["default"])(options) === 'object') {
    var dispatch = options.dispatch,
        modelStatus = options.modelStatus,
        namespace = options.namespace;

    if (dispatch && typeof dispatch === 'function') {
      return [modelStatus, dispatch];
    } else {
      return getModel(options);
    }
  }
}

function getModel(_ref) {
  var namespace = _ref.namespace,
      rest = (0, _objectWithoutProperties2["default"])(_ref, ["namespace"]);

  if (!models[namespace]) {
    createModel({
      namespace: namespace,
      auto: true
    });
    console.log('auto create model: ', namespace, models);
  }

  return models[namespace].useModel(rest);
}

function getModelEntity(namespace) {
  return models[namespace].getModel();
}

function createModel(_ref2) {
  var namespace = _ref2.namespace,
      _ref2$reducers = _ref2.reducers,
      reducers = _ref2$reducers === void 0 ? {} : _ref2$reducers,
      _ref2$effects = _ref2.effects,
      effects = _ref2$effects === void 0 ? {} : _ref2$effects,
      _ref2$auto = _ref2.auto,
      auto = _ref2$auto === void 0 ? false : _ref2$auto;
  models[namespace] = new _Model["default"]({
    namespace: namespace,
    state: {
      listData: {},
      formData: {},
      searchData: {}
    },
    reducers: (0, _objectSpread3["default"])({
      save: function save(_ref3, _ref4) {
        var payload = _ref3.payload;
        var state = _ref4.state;
        return (0, _objectSpread3["default"])({}, state, payload);
      },
      saveData: function saveData(_ref5, _ref6) {
        var payload = _ref5.payload;
        var state = _ref6.state;
        var key = payload.key,
            data = payload.data;
        return (0, _objectSpread3["default"])({}, state, (0, _defineProperty2["default"])({}, key, (0, _objectSpread3["default"])({}, state[key], data)));
      }
    }, reducers),
    effects: (0, _objectSpread3["default"])({}, _defaultEffects["default"], effects),
    auto: auto
  });
}

function removeModel(namespace) {
  delete models[namespace];
}