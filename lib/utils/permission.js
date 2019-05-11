"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Perm = Perm;
exports.getPerm = getPerm;
exports.setPerm = setPerm;
exports.addPerm = addPerm;
exports.checkPerm = checkPerm;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _react = _interopRequireWildcard(require("react"));

var _utils = require("./utils");

var permData = {
  perms: []
}; // { perms: [ 'admin', 'sys-user-edit' ] }

function reducer(state, _ref) {
  var type = _ref.type,
      payload = _ref.payload;

  switch (type) {
    case 'set':
      return {
        perms: payload.perms
      };

    case 'add':
      return {
        perms: [].concat((0, _toConsumableArray2["default"])(state.perms), (0, _toConsumableArray2["default"])(payload.perms))
      };

    default:
      throw new Error();
  }
}

function Perm(_ref2) {
  var name = _ref2.name,
      _ref2$title = _ref2.title,
      title = _ref2$title === void 0 ? null : _ref2$title,
      location = _ref2.location,
      children = _ref2.children;
  var perms = permData.perms;
  var reject = (0, _react.useMemo)(function () {
    return !checkPerm(name, location);
  }, [perms, name, location]);

  if (reject) {
    return title;
  } else {
    return children;
  }
}

function getPerm() {
  var perms = permData.perms;
  return perms;
}

function setPerm(data) {
  var _useReducer = (0, _react.useReducer)(reducer, permData),
      _useReducer2 = (0, _slicedToArray2["default"])(_useReducer, 2),
      value = _useReducer2[0],
      dispatch = _useReducer2[1];

  return dispatch({
    type: 'set',
    payload: {
      perms: data
    }
  });
}

function addPerm(data) {
  var _useReducer3 = (0, _react.useReducer)(reducer, permData),
      _useReducer4 = (0, _slicedToArray2["default"])(_useReducer3, 2),
      value = _useReducer4[0],
      dispatch = _useReducer4[1];

  return dispatch({
    type: 'add',
    payload: {
      perms: data
    }
  });
}

function checkPerm(permission) {
  var location = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var perms = permData.perms;

  if (location) {
    perms = _utils.LS.get('permissions') || [];
  }

  return testPerm(permission, perms);
}

function testPerm(currentPerm, permList) {
  if (!Array.isArray(currentPerm)) {
    currentPerm = [currentPerm];
  }

  return currentPerm.some(function (perm) {
    return permList.some(function (existing) {
      return existing === perm;
    });
  });
}