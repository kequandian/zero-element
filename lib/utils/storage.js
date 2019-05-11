"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SS = exports.LS = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var handler = {
  get: function get(target, name) {
    if (checkEnv()) {
      return target[name];
    } else {
      return function (_) {
        return void 0;
      };
    }
  }
};

function checkEnv() {
  try {
    if (window) {
      if (window.localStorage && window.sessionStorage) {
        checkEnv = function checkEnv(_) {
          return true;
        };

        return true;
      }
    }
  } catch (error) {
    return false;
  }

  checkEnv = function checkEnv(_) {
    return false;
  };
}

var LSUtils = {
  set: function set(key, value) {
    value = (0, _typeof2["default"])(value) === "object" ? JSON.stringify(value) : value;
    localStorage.setItem(key, value);
  },
  get: function get(key) {
    var value = localStorage.getItem(key) || '';

    if (value === "" || value.indexOf("{") < 0 && value.indexOf("[") < 0) {
      return value;
    } else {
      return JSON.parse(value);
    }
  },
  del: function del(key) {
    localStorage.removeItem(key);
  },
  clear: function clear() {
    localStorage.clear();
  }
};
var SSUtils = {
  set: function set(key, value) {
    value = (0, _typeof2["default"])(value) === "object" ? JSON.stringify(value) : value;
    sessionStorage.setItem(key, value);
  },
  get: function get(key) {
    var value = sessionStorage.getItem(key) || '';

    if (value === "" || value.indexOf("{") < 0 && value.indexOf("[") < 0) {
      return value;
    } else {
      return JSON.parse(value);
    }
  },
  del: function del(key) {
    sessionStorage.removeItem(key);
  },
  clear: function clear() {
    sessionStorage.clear();
  }
};
var LS = new Proxy(LSUtils, handler);
exports.LS = LS;
var SS = new Proxy(SSUtils, handler);
exports.SS = SS;