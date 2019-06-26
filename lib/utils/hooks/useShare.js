"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useShare;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = require("react");

var shareStorage = {};
/**
 * 用于在组件之间分享一些纯函数的方法
 *
 * @export
 * @param {object} options 配置
 * - share 分享的 key
 * @returns Hooks, 执行后返回以下组成的数组:
 * - {object} 当前已分享的数据
 * - {function} 设置新的分享
 * - {function} 销毁已有的分享
 */

function useShare(options) {
  var share = options.share;

  if (shareStorage[share] === undefined) {
    shareStorage[share] = new Share(share);
  }

  return shareStorage[share].useShare(options);
}

var Share =
/*#__PURE__*/
function () {
  function Share(share) {
    (0, _classCallCheck2["default"])(this, Share);
    (0, _defineProperty2["default"])(this, "state", {});
    (0, _defineProperty2["default"])(this, "queue", []);
    this.key = share;
  }

  (0, _createClass2["default"])(Share, [{
    key: "useShare",
    value: function useShare(options) {
      var _this = this;

      var _useState = (0, _react.useState)(),
          _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
          set = _useState2[1]; // eslint-disable-next-line react-hooks/exhaustive-deps


      (0, _react.useEffect)(function () {
        var index = _this.queue.length;

        _this.queue.push(set);

        return function () {
          _this.queue.splice(index, 1);
        };
      });
      return [this.state, this.setData.bind(this), this.destroyShare.bind(this)];
    }
  }, {
    key: "getData",
    value: function getData() {
      return this.state;
    }
  }, {
    key: "setData",
    value: function setData(data) {
      var _this2 = this;

      this.state = (0, _objectSpread2["default"])({}, this.state, data);
      var queue = [].concat(this.queue);
      this.queue.length = 0;
      queue.forEach(function (set) {
        return set(_this2.state);
      });
    }
  }, {
    key: "destroyShare",
    value: function destroyShare() {
      var _this3 = this;

      for (var _len = arguments.length, keyList = new Array(_len), _key = 0; _key < _len; _key++) {
        keyList[_key] = arguments[_key];
      }

      if (keyList.length === 0) {
        delete shareStorage[this.key];
        this.queue = [];
      } else {
        keyList.forEach(function (key) {
          delete _this3.state[key];
        });
      }
    }
  }]);
  return Share;
}();