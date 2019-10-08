"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var handler = {
  get: function get(target, name) {
    if (checkEnv()) {
      var v = window[name];

      if (typeof v === 'function') {
        return v.bind(window);
      }

      return v;
    } else {
      return function (_) {
        return void 0;
      };
    }
  },
  set: function set(obj, prop, value) {
    if (checkEnv()) {
      return window[prop] = value;
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
      checkEnv = function checkEnv(_) {
        return true;
      };

      if (!window.ZEle) {
        window.ZEle = {};
      }

      return true;
    }
  } catch (error) {
    return false;
  }

  checkEnv = function checkEnv(_) {
    return false;
  };
}

var win = new Proxy({}, handler);
var _default = win;
exports["default"] = _default;