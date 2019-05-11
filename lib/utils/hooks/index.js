"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "modelHooks", {
  enumerable: true,
  get: function get() {
    return _modelHooks["default"];
  }
});
Object.defineProperty(exports, "listHooks", {
  enumerable: true,
  get: function get() {
    return _listHooks["default"];
  }
});
Object.defineProperty(exports, "searchHooks", {
  enumerable: true,
  get: function get() {
    return _searchHooks["default"];
  }
});
Object.defineProperty(exports, "formHooks", {
  enumerable: true,
  get: function get() {
    return _formHooks["default"];
  }
});
Object.defineProperty(exports, "childrenHooks", {
  enumerable: true,
  get: function get() {
    return _childrenHooks["default"];
  }
});
exports.lifeCycle = void 0;

var _modelHooks = _interopRequireDefault(require("./modelHooks"));

var lifeCycle = _interopRequireWildcard(require("./lifeCycle"));

exports.lifeCycle = lifeCycle;

var _listHooks = _interopRequireDefault(require("./listHooks"));

var _searchHooks = _interopRequireDefault(require("./searchHooks"));

var _formHooks = _interopRequireDefault(require("./formHooks"));

var _childrenHooks = _interopRequireDefault(require("./childrenHooks"));