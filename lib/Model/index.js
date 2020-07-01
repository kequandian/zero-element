"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getModel = getModel;
exports.useModel = useModel;
exports.createModel = createModel;
exports.getPageData = getPageData;
exports.setPageData = setPageData;
exports.removeModel = removeModel;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _iostore = require("iostore");

var _stores = _interopRequireDefault(require("iostore/src/stores"));

var _defaultEffects = _interopRequireDefault(require("./defaultEffects"));

var _defaultState = _interopRequireDefault(require("./defaultState"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var prevModels = '';
var pageData = {};

function useModel(options) {
  var data = options;

  if ((0, _typeof2["default"])(options) === 'object' && options.namespace) {
    var namespace = options.namespace; // 销毁可回收的 model

    if (namespace !== prevModels && _stores["default"][prevModels]) {
      if (checkParent(namespace, prevModels) === false && _stores["default"][prevModels]._recyclable === true) {
        if (process.env.NODE_ENV === 'development') {
          console.log("\u521B\u5EFA\u4E86\u65B0\u7684 model ".concat(namespace, ", \u56DE\u6536 model ").concat(prevModels));
        }

        removeModel(prevModels);
      }
    }
  } else if (typeof options === 'string') {
    data = {
      namespace: options
    };
  } else {
    throw new Error('params namespace is required');
  }

  checkModel(data.namespace);
  return (0, _iostore.useStore)()[data.namespace];
}

function getModel(namespace) {
  // checkModel(namespace);
  prevModels = namespace;
  return _stores["default"][namespace];
}

function checkModel(namespace) {
  if (!_stores["default"][namespace]) {
    createModel({
      namespace: namespace,
      auto: true
    });

    if (process.env.NODE_ENV === 'development') {
      console.warn('auto create model: ', namespace, _stores["default"]);
    }
  }
}

function createModel(_ref) {
  var namespace = _ref.namespace,
      _ref$state = _ref.state,
      state = _ref$state === void 0 ? {} : _ref$state,
      _ref$effects = _ref.effects,
      effects = _ref$effects === void 0 ? {} : _ref$effects,
      _ref$auto = _ref.auto,
      auto = _ref$auto === void 0 ? false : _ref$auto,
      _ref$recyclable = _ref.recyclable,
      recyclable = _ref$recyclable === void 0 ? true : _ref$recyclable;
  (0, _iostore.createStore)(_objectSpread(_objectSpread(_objectSpread(_objectSpread({}, JSON.parse(JSON.stringify(_objectSpread(_objectSpread({}, _defaultState["default"]), state)))), _defaultEffects["default"]), effects), {}, {
    namespace: namespace,
    _auto: auto,
    _recyclable: recyclable
  }));
  pageData[namespace] = {};
  return _stores["default"][namespace];
}

function getPageData(namespace) {
  return pageData[namespace];
}

function setPageData(namespace, key, value) {
  if (pageData[namespace]) {
    pageData[namespace][key] = value;
  } else {
    console.warn("pageData ".concat(namespace, " is undefined"), pageData);
  }
}

function removeModel(namespace) {
  delete _stores["default"][namespace];
  delete pageData[namespace];
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