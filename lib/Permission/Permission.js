"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _react = require("react");

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
      this.perm = (0, _objectSpread2["default"])({}, this.perm, rst);
      this.dispatchUpdate();
    }
  }]);
  return Permission;
}();

exports["default"] = Permission;