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
exports.clearPageData = clearPageData;
exports.setHooks = setHooks;
exports.getHooks = getHooks;
exports.setRef = setRef;
exports.removeModel = removeModel;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _iostore = require("iostore");

var _stores = _interopRequireDefault(require("iostore/src/stores"));

var _defaultEffects = _interopRequireDefault(require("./defaultEffects"));

var _defaultState = _interopRequireDefault(require("./defaultState"));

var _devUtils = _interopRequireDefault(require("./devUtils"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var refs = {};
var pageData = {};
var hooksData = {};
(0, _devUtils["default"])({
  refs: refs,
  pageData: pageData,
  hooksData: hooksData,
  models: _stores["default"]
});

function useModel(options) {
  var data = options;

  if ((0, _typeof2["default"])(options) === 'object' && options.namespace) {} else if (typeof options === 'string') {
    data = {
      namespace: options
    };
  } else {
    throw new Error('params namespace is required');
  }

  var _data = data,
      namespace = _data.namespace,
      ref = _data.ref;

  if (ref) {
    setRef(namespace, ref);
  } // 销毁可回收的 model


  var autoCreateModels = Object.keys(_stores["default"]).filter(function (key) {
    return _stores["default"][key]._auto;
  });
  var loseRef = [];
  autoCreateModels.forEach(function (ns) {
    if (!checkRef(ns)) {
      if (namespace !== ns && _stores["default"][ns] && _stores["default"][namespace] && _stores["default"][namespace]._auto) {
        var _checkFamily = checkFamily(ns, namespace),
            _checkFamily2 = (0, _slicedToArray2["default"])(_checkFamily, 2),
            isFamily = _checkFamily2[0],
            kin = _checkFamily2[1];

        if (isFamily === false) {
          loseRef.push(ns);
        } else if (isFamily) {
          if (kin === 'parent') {} else if (kin !== 'self' && kin !== 'sibling') {
            loseRef.push(ns);
          }
        }
      }
    }
  });
  recycleModelList(loseRef);
  checkModel(data.namespace);
  return (0, _iostore.useStore)()[data.namespace];
}

function recycleModel(namespace) {
  if (_stores["default"][namespace]) {
    if (checkRef(namespace)) {
      return false;
    }

    if (process.env.NODE_ENV === 'development') {
      console.log("\u56DE\u6536 model %c".concat(namespace, "%c\n\u5F53\u524D\u5168\u90E8 model"), 'color: red', '', _stores["default"]);
    }

    removeModel(namespace);
  }
}

function recycleModelList(prevModelsList) {
  prevModelsList.forEach(function (namespace) {
    recycleModel(namespace);
  });
}

function getModel(namespace) {
  // checkModel(namespace);
  return _stores["default"][namespace];
}

function checkModel(namespace) {
  if (!_stores["default"][namespace]) {
    createModel({
      namespace: namespace,
      auto: true
    });

    if (process.env.NODE_ENV === 'development') {
      console.log("auto create model: %c".concat(namespace, "%c\n\u5F53\u524D\u5168\u90E8 model"), 'color: green', '', _stores["default"]);
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
      recyclable = _ref$recyclable === void 0 ? true : _ref$recyclable,
      _ref$useDefault = _ref.useDefault,
      useDefault = _ref$useDefault === void 0 ? true : _ref$useDefault;
  (0, _iostore.createStore)(_objectSpread(_objectSpread(_objectSpread(_objectSpread({}, JSON.parse(JSON.stringify(_objectSpread(_objectSpread({}, useDefault ? _defaultState["default"] : {}), state)))), useDefault ? _defaultEffects["default"] : {}), effects), {}, {
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
    if (process.env.NODE_ENV === 'development') {
      console.warn("pageData ".concat(namespace, " is undefined"), pageData);
    }
  }
}

function clearPageData(namespace, key) {
  var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (pageData[namespace]) {
    pageData[namespace][key] = value;
  }
}

function setHooks(namespace, hooks) {
  hooksData[namespace] = hooks;
}

function getHooks(namespace) {
  return hooksData[namespace] || {};
}

function setRef(namespace, ref) {
  if (!refs[namespace]) {
    refs[namespace] = [];
  }

  refs[namespace] = refs[namespace].filter(function (r) {
    return r.current;
  });
  refs[namespace].push(ref);
}

function checkRef(namespace) {
  if (Array.isArray(refs[namespace])) {
    return refs[namespace].some(function (r) {
      return r.current;
    });
  }

  return false;
}

function removeModel(namespace) {
  delete _stores["default"][namespace];
  delete pageData[namespace];
  delete refs[namespace];
}

/**
 * 判断两个 namespace 之间的亲属关系
 * @param {string} name 当前 namespace
 * @param {string} prevName 另一个 namespace
 * @returns {array} [ 是否亲属, 具体的亲属关系: parent 还是 child 抑或是 sibling ]
 */
function checkFamily(name, prevName) {
  var isFamily = name.split('_')[0] === prevName.split('_')[0];
  var kin = null;

  if (isFamily) {
    var nextIncludePrev = name.indexOf(prevName) > -1;
    var prevIncludeNext = prevName.indexOf(name) > -1;

    if (nextIncludePrev) {
      if (prevIncludeNext) {
        kin = 'self';
      } else {
        kin = 'child';
      }
    } else if (prevIncludeNext) {
      kin = 'parent';
    } else {
      kin = 'sibling';
    }
  }

  return [isFamily, kin];
}