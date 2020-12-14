"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = replaceKey;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _toArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toArray"));

var _window = _interopRequireDefault(require("./window"));

var _lodash = _interopRequireDefault(require("lodash"));

/**
 *  API 参数化的具体实现
 * @param {object}
 * - [id] 从 locationData 中替换 id 的值
 * - (id) 从 model.record 中替换 id 的值
 * - {id} 从 pageData.formData 中替换 id 的值
 * - <id> 从传入的 data 中替换 id 的值
 * - !#id#! 从 window.ZEle 中替换 id 的值
 */
function replaceKey(_ref) {
  var model = _ref.model,
      locationData = _ref.locationData,
      _ref$formData = _ref.formData,
      formData = _ref$formData === void 0 ? {} : _ref$formData,
      _ref$data = _ref.data,
      data = _ref$data === void 0 ? {} : _ref$data,
      placeholder = _ref.placeholder,
      _ref$encodeURI = _ref.encodeURI,
      encodeURI = _ref$encodeURI === void 0 ? false : _ref$encodeURI;

  function handleReplace(str, key, value) {
    var v = value;

    if (!v && v !== 0) {
      v = placeholder;
    }

    return str.replace(key, encodeURI ? encodeURIComponent(v) : v);
  }

  return {
    format: function format(string) {
      if (!string) {
        if (string === undefined) {
          console.error('API 未定义');
          return {};
        }

        ;
        return string;
      }

      ;

      if (typeof string === 'string') {
        var keyList = string.match(/\{\w+(.\w+)*\}|\[\w+\]|\(\w+(.\w+)*\)|\<\w+(.\w+)*\>|\!\#\w+(.\w+)*\#\!/g);
        keyList && keyList.forEach(function (key) {
          if (key.indexOf('[') > -1) {
            string = handleReplace(string, key, locationData[key.replace(/\[|\]/g, '')]);
          } else if (key.indexOf('(') > -1) {
            string = handleReplace(string, key, getDeepValue(model.record, key.replace(/\(|\)/g, '')));
          } else if (key.indexOf('{') > -1) {
            string = handleReplace(string, key, getDeepValue(formData, key.replace(/\{|\}/g, '')));
          } else if (key.indexOf('<') > -1) {
            string = handleReplace(string, key, getDeepValue(data, key.replace(/\<|\>/g, '')));
          } else if (key.indexOf('!#') > -1) {
            var pureKey = key.replace(/\!\#|\#\!/g, '');
            string = handleReplace(string, key, _window["default"].ZEle[pureKey]);
          }
        });
      } else {
        if (string.lenght !== undefined) {
          var _string = string,
              _string2 = (0, _toArray2["default"])(_string),
              ary = _string2.slice(0);

          ary.forEach(function (item, i) {
            return ary[i] = format(item);
          });
          return ary;
        } else {
          var _string3 = string,
              obj = (0, _extends2["default"])({}, _string3);
          Object.keys(obj).forEach(function (key) {
            var rst = format(obj[key]);

            if (rst === 'undefined' || rst === undefined) {
              // 没有值的字段，直接去掉
              delete obj[key];
            } else {
              obj[key] = format(obj[key]);
            }
          });
          return obj;
        }
      }

      return string;
    }
  };
}

function getDeepValue(data, key) {
  return _lodash["default"].get(data, key);
}