"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToken = getToken;
exports.saveToken = saveToken;
exports.removeToken = removeToken;
exports.getAccount = getAccount;
exports.getUserId = getUserId;
exports.setAvatar = setAvatar;
exports.getAvatar = getAvatar;

var _utils = require("../utils");

function getToken() {
  return _utils.SS.get('token') || _utils.LS.get('token');
}

function saveToken(_ref) {
  var account = _ref.account,
      token = _ref.token,
      avatar = _ref.avatar,
      permissions = _ref.permissions,
      remember = _ref.remember;

  if (remember) {
    _utils.LS.set('token', token);

    _utils.LS.set('permissions', permissions);

    _utils.LS.set('avatar', avatar);
  } else {
    _utils.SS.set('token', token);

    _utils.SS.set('permissions', permissions);

    _utils.SS.set('avatar', avatar);
  }
}

function removeToken() {
  _utils.SS.clear();

  ['token', 'permissions', 'avatar'].forEach(function (key) {
    _utils.LS.del(key);
  });
}

function getAccount() {
  var token = _utils.SS.get('token') || _utils.LS.get('token');

  if (token === undefined || token === null) {
    return null;
  }

  if (token.split('\.').length !== 3) {
    try {
      var _str = new Buffer(token, 'base64').toString();

      var jsonObject = JSON.parse(_str);
      return jsonObject.login_name;
    } catch (e) {}

    return null;
  }

  var str = new Buffer(token.split('\.')[1], 'base64').toString();
  return str.split(',')[2].split(':')[1].replace(/\"/g, "");
}

function getUserId() {
  var token = _utils.SS.get('token') || _utils.LS.get('token');

  if (token === undefined || token === null) {
    return null;
  }

  if (token.split('\.').length !== 3) {
    try {
      var _str2 = new Buffer(token, 'base64').toString();

      var jsonObject = JSON.parse(_str2);
      return jsonObject.login_name;
    } catch (e) {}

    return null;
  }

  var str = new Buffer(token.split('\.')[1], 'base64').toString();
  return str.split(',')[1].split(':')[1].replace(/\"/g, "");
}

function setAvatar(avatar) {
  _utils.SS.set('avatar', avatar);

  _utils.LS.set('avatar', avatar);
}

function getAvatar() {
  return _utils.SS.get('avatar') || _utils.LS.get('avatar');
}