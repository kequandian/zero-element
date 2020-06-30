"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatAPI = formatAPI;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _Model = require("../Model");

var _location = require("./location");

var _replaceKey = _interopRequireDefault(require("./replaceKey"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function formatAPI(API, _ref) {
  var namespace = _ref.namespace,
      data = _ref.data,
      _ref$placeholder = _ref.placeholder,
      placeholder = _ref$placeholder === void 0 ? 'undefined' : _ref$placeholder;
  var model = (0, _Model.getModel)(namespace);

  var _getPageData = (0, _Model.getPageData)(namespace),
      formData = _getPageData.formData,
      pageData = (0, _objectWithoutProperties2["default"])(_getPageData, ["formData"]);

  var locationData = (0, _location.getLocationSearch)();
  var APIUtils = (0, _replaceKey["default"])({
    model: model,
    locationData: locationData,
    formData: formData,
    data: _objectSpread(_objectSpread({}, pageData), data),
    placeholder: placeholder
  });

  if (typeof API === 'string') {
    return APIUtils.format(API);
  }

  return new Proxy(API, {
    get: function get(target, name) {
      if (target[name] !== undefined) {
        return APIUtils.format(target[name]);
      } else {
        console.warn("API ".concat(name, " is undefined, check your config file"));
        return null;
      }
    }
  });
}