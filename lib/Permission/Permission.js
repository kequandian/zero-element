"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _react = require("react");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Permission =
/*#__PURE__*/
function () {
  function Permission(_ref) {
    var perm = _ref.perm;
    (0, _classCallCheck2["default"])(this, Permission);
    this.queue = [];
    this.perm = {};
  }

  (0, _createClass2["default"])(Permission, [{
    key: "usePermission",
    value: function usePermission() {
      var _this = this;

      var _useState = (0, _react.useState)(),
          _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
          setState = _useState2[1];

      (0, _react.useEffect)(function () {
        // 初始订阅，或者取消订阅之后新的订阅
        var index = _this.queue.length;

        _this.queue.push(setState);

        return function () {
          // 更新后取消订阅
          _this.queue.splice(index, 1);
        };
      });
      return [this.perm, {
        setPerm: this.setPerm.bind(this),
        delPerm: this.delPerm.bind(this)
      }];
    }
  }, {
    key: "dispatchUpdate",
    value: function dispatchUpdate() {
      this.queue.forEach(function (setState) {
        return setState({});
      });
    }
  }, {
    key: "setPerm",
    value: function setPerm(perm) {
      this.handlePerm(perm, true);
    }
  }, {
    key: "delPerm",
    value: function delPerm(perm) {
      this.handlePerm(perm, false);
    }
  }, {
    key: "handlePerm",
    value: function handlePerm(perm, type) {
      var rst = {};

      if (!Array.isArray(perm)) {
        perm = [perm];
      }

      perm.forEach(function (key) {
        rst[key] = type;
      });
      this.perm = _objectSpread({}, this.perm, {}, rst);
      this.dispatchUpdate();
    }
  }]);
  return Permission;
}();

exports["default"] = Permission;