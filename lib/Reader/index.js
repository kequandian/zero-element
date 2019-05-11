"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "setBaseComponentExtends", {
  enumerable: true,
  get: function get() {
    return _readConfig.setBaseComponentExtends;
  }
});
Object.defineProperty(exports, "setLayoutExtends", {
  enumerable: true,
  get: function get() {
    return _readConfig.setLayoutExtends;
  }
});
Object.defineProperty(exports, "getMainLayout", {
  enumerable: true,
  get: function get() {
    return _readConfig.getMainLayout;
  }
});
Object.defineProperty(exports, "getItem", {
  enumerable: true,
  get: function get() {
    return _readConfig.getItem;
  }
});
Object.defineProperty(exports, "getFormItem", {
  enumerable: true,
  get: function get() {
    return _readConfig.getFormItem;
  }
});
Object.defineProperty(exports, "setFormItemTypeExtends", {
  enumerable: true,
  get: function get() {
    return _getFormItemType.setFormItemTypeExtends;
  }
});
exports.Animation = exports["default"] = void 0;

var _Reader = _interopRequireDefault(require("./Reader"));

var AnimationSet = _interopRequireWildcard(require("./components/Animation"));

var _readConfig = require("./utils/readConfig");

var _getFormItemType = require("./utils/getFormItemType");

var _default = _Reader["default"];
exports["default"] = _default;
var Animation = AnimationSet;
exports.Animation = Animation;