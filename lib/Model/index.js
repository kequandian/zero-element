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

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _Model = _interopRequireDefault(require("./Model"));

var _defaultEffects = _interopRequireDefault(require("./defaultEffects"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var models = {};
var prevModels = '';

function checkDispatch(options) {
  if ((0, _typeof2["default"])(options) === 'object') {
    var dispatch = options.dispatch,
        modelStatus = options.modelStatus,
        _options$namespace = options.namespace,
        namespace = _options$namespace === void 0 ? 'defaultName' : _options$namespace;

    if (dispatch && typeof dispatch === 'function') {
      return [modelStatus, dispatch];
    } else {
      // 销毁可回收的 model
      if (namespace !== prevModels && models[prevModels]) {
        if (checkParent(namespace, prevModels) === false && models[prevModels].recyclable === true) {
          if (process.env.NODE_ENV === 'development') {
            console.log("\u521B\u5EFA\u4E86\u65B0\u7684 model ".concat(namespace, ", \u56DE\u6536 model ").concat(prevModels));
          }

          removeModel(prevModels);
        }
      }

      return getModel(options);
    }
  }
}

function getModel(_ref) {
  var _ref$namespace = _ref.namespace,
      namespace = _ref$namespace === void 0 ? 'defaultName' : _ref$namespace,
      rest = (0, _objectWithoutProperties2["default"])(_ref, ["namespace"]);
  checkModel(namespace);
  prevModels = namespace;
  return models[namespace].useModel(rest);
}

function getModelEntity() {
  var namespace = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'defaultName';
  checkModel(namespace);
  return models[namespace].getModel();
}

function checkModel() {
  var namespace = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'defaultName';

  if (!models[namespace]) {
    createModel({
      namespace: namespace,
      auto: true
    });

    if (process.env.NODE_ENV === 'development') {
      console.log('auto create model: ', namespace, models);
    }
  }
}

function createModel(_ref2) {
  var namespace = _ref2.namespace,
      _ref2$state = _ref2.state,
      state = _ref2$state === void 0 ? {} : _ref2$state,
      _ref2$reducers = _ref2.reducers,
      reducers = _ref2$reducers === void 0 ? {} : _ref2$reducers,
      _ref2$effects = _ref2.effects,
      effects = _ref2$effects === void 0 ? {} : _ref2$effects,
      _ref2$auto = _ref2.auto,
      auto = _ref2$auto === void 0 ? false : _ref2$auto;
  models[namespace] = new _Model["default"]({
    namespace: namespace,
    state: _objectSpread({
      listData: {
        records: []
      },
      formData: {},
      searchData: {},
      load: {
        loading: false,
        effects: {}
      }
    }, state),
    reducers: _objectSpread({
      save: function save(_ref3, _ref4) {
        var payload = _ref3.payload;
        var state = _ref4.state;
        return _objectSpread({}, state, {}, payload);
      },
      saveData: function saveData(_ref5, _ref6) {
        var payload = _ref5.payload;
        var state = _ref6.state;
        var key = payload.key,
            data = payload.data;
        return _objectSpread({}, state, (0, _defineProperty2["default"])({}, key, _objectSpread({}, state[key], {}, data)));
      },
      loading: function loading(_ref7, _ref8) {
        var payload = _ref7.payload;
        var state = _ref8.state;
        var loading = payload.loading,
            effect = payload.effect;
        return _objectSpread({}, state, {
          load: {
            loading: loading,
            effects: (0, _defineProperty2["default"])({}, effect, loading)
          }
        });
      }
    }, reducers),
    effects: _objectSpread({}, _defaultEffects["default"], {}, effects),
    auto: auto
  });
  return models[namespace];
}

function removeModel(namespace) {
  delete models[namespace];
}

/**
 * 判断两个 namespace 之间是否有父子关系
 * @param {string} name 当前 namespace
 * @param {string} prevName 另一个 namespace
 * @returns {boolean} name 是 prevName 的父关系
 */
function checkParent(name, prevName) {
  return name.split('_')[0] === prevName.split('_')[0] && name.indexOf(prevName) > -1;
}