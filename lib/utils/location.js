"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLocationSearch = getLocationSearch;
exports.getLocationPathname = getLocationPathname;

var _window = _interopRequireDefault(require("./window"));

var _qs = _interopRequireDefault(require("qs"));

function getSearch(location) {
  if (location.search) {
    return location.search.replace('?', '');
  } else {
    return location.hash.split('?')[1] || '';
  }
}

function getPathname(location) {
  return location.pathname;
}

function getLocationSearch() {
  var _win$location = _window["default"].location,
      location = _win$location === void 0 ? {} : _win$location;

  if (location) {
    return _qs["default"].parse(getSearch(location));
  }

  return {};
}

function getLocationPathname() {
  var _win$location2 = _window["default"].location,
      location = _win$location2 === void 0 ? {} : _win$location2;

  if (location) {
    return getPathname(location);
  }

  return '';
}