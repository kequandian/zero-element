"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = replaceKey;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _toArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toArray"));

/**
 *  API 参数化的具体实现
 * @param {object} {modelStatus, dataPool} model state 和 dataPool
 * - [id] 从 dataPool.location 中替换 id 的值
 * - (id) 从 dataPool.record 中替换 id 的值
 * - {id} 从 modelStatus 中替换 id 的值
 */
function replaceKey(_ref) {
  var modelStatus = _ref.modelStatus,
      dataPool = _ref.dataPool;
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
        var keyList = string.match(/\{\w+\}|\[\w+\]|\(\w+\)/g);
        keyList && keyList.forEach(function (key) {
          if (key.indexOf('[') > -1) {
            string = string.replace(key, dataPool.location[key.replace(/\[|\]/g, '')]);
          } else if (key.indexOf('(') > -1) {
            string = string.replace(key, dataPool.record[key.replace(/\(|\)/g, '')]);
          } else if (key.indexOf('{') > -1) {
            string = string.replace(key, modelStatus.formData[key.replace(/\{|\}/g, '')]);
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