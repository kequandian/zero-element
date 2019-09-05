"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useShare;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = require("react");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
        var symbol = Symbol(options.type);

        _this.queue.push({
          set: set,
          symbol: symbol
        });

        return function () {
          _this.queue = _this.queue.filter(function (i) {
            return i.symbol !== symbol;
          });
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

      this.state = _objectSpread({}, this.state, {}, data);
      this.queue.forEach(function (i) {
        return i.set(_this2.state);
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