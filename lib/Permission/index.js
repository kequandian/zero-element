"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePermission = usePermission;
exports.removePermission = removePermission;
exports.setPerm = setPerm;
exports.delPerm = delPerm;
exports["default"] = Perm;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _react = _interopRequireDefault(require("react"));

var _Permission = _interopRequireDefault(require("./Permission"));

var _elements = require("zero-element-global/lib/elements");

var permPools = {};

function usePermission(options) {
  if ((0, _typeof2["default"])(options) === 'object') {
    var _options$namespace = options.namespace,
        namespace = _options$namespace === void 0 ? 'global' : _options$namespace;
    return getPermission(namespace);
  }

  return getPermission('global');
}

function getPermission(namespace) {
  if (!permPools[namespace]) {
    createPermission({
      namespace: namespace
    });
  }

  return permPools[namespace].usePermission();
}

function createPermission(_ref) {
  var namespace = _ref.namespace;
  permPools[namespace] = new _Permission["default"]({
    namespace: namespace
  });
}

function removePermission(namespace) {
  delete permPools[namespace];
}

function setPerm(perm) {
  var namespace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'global';
  permPools[namespace].setPerm(perm);
}

function delPerm(perm) {
  var namespace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'global';
  permPools[namespace].delPerm(perm);
}

function Perm(props) {
  var perm = props.perm,
      _props$rej = props.rej,
      rej = _props$rej === void 0 ? null : _props$rej,
      _props$namespace = props.namespace,
      namespace = _props$namespace === void 0 ? 'global' : _props$namespace,
      children = props.children;

  var _getPermission = getPermission(namespace),
      _getPermission2 = (0, _slicedToArray2["default"])(_getPermission, 1),
      permObj = _getPermission2[0];

  if (permObj[perm]) {
    return children;
  } else {
    return rej || _react["default"].createElement(_elements.Render, {
      n: "PermRej"
    });
  }
}