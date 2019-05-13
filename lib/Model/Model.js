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

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _react = require("react");

var isPromise = function isPromise(func) {
  if (func instanceof Promise) return true;
  if ((0, _typeof2["default"])(func) === 'object' && typeof func.then === 'function') return true;
  return false;
};

var Model =
/*#__PURE__*/
function () {
  function Model(_ref) {
    var namespace = _ref.namespace,
        _ref$state = _ref.state,
        state = _ref$state === void 0 ? {} : _ref$state,
        _ref$reducers = _ref.reducers,
        reducers = _ref$reducers === void 0 ? {} : _ref$reducers,
        _ref$effects = _ref.effects,
        effects = _ref$effects === void 0 ? {} : _ref$effects;
    (0, _classCallCheck2["default"])(this, Model);
    this.state = state;
    this.queue = []; // { demo: _=> {} }

    this.reducers = reducers; // { async demo: ({payload}, { state, put }) => await put({type,payload}) }

    this.effects = effects;
    this.namespace = namespace;
  }

  (0, _createClass2["default"])(Model, [{
    key: "useModel",
    value: function useModel() {
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
      return [this.getState(), this.dispatch.bind(this)];
    }
  }, {
    key: "getState",
    value: function getState() {
      return this.state;
    }
  }, {
    key: "dispatch",
    value: function dispatch(data) {
      var _this2 = this;

      var type = data.type;
      var action = this.reducers[type] || this.effects[type];

      if (action) {
        var rst = action(data, {
          state: this.getState(),
          put: this.dispatch.bind(this)
        });

        if (isPromise(rst)) {// effects
        } else {
          // reducers
          this.state = (0, _objectSpread2["default"])({}, this.getState(), rst); // 触发 state 更新

          this.queue.forEach(function (setState) {
            return setState(_this2.state);
          });
        }
      } else {
        console.warn("\u672A\u5B9A\u4E49\u7684\u65B9\u6CD5: ".concat(action));
      }
    }
  }]);
  return Model;
}();

exports["default"] = Model;