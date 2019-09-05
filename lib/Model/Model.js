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
        effects = _ref$effects === void 0 ? {} : _ref$effects,
        auto = _ref.auto;
    (0, _classCallCheck2["default"])(this, Model);
    this.state = state;
    this.queue = []; // { demo: _=> {} }

    this.reducers = reducers; // { async demo: ({payload}, { state, put }) => await put({type,payload}) }

    this.effects = effects;
    this.namespace = namespace;
    this.auto = auto;
  }

  (0, _createClass2["default"])(Model, [{
    key: "useModel",
    value: function useModel(options) {
      var _this = this;

      var _useState = (0, _react.useState)(),
          _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
          setState = _useState2[1];

      (0, _react.useEffect)(function () {
        // 初始订阅，或者取消订阅之后新的订阅
        var symbol = Symbol(options.type);

        _this.queue.push({
          type: options.type,
          symbol: symbol,
          setState: setState
        });

        return function () {
          // 更新后取消订阅
          _this.queue = _this.queue.filter(function (item) {
            return item.symbol !== symbol;
          });
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
    key: "setState",
    value: function setState(key, data) {
      if (typeof key === 'string') {
        this.state[key] = _objectSpread({}, this.state[key] || {}, {}, data);
      } else {
        this.state = _objectSpread({}, this.getState(), {}, key);
      }
    }
  }, {
    key: "getModel",
    value: function getModel() {
      return this;
    }
  }, {
    key: "update",
    value: function update() {
      this.queue.forEach(function (item) {
        return item.setState({});
      });
    }
  }, {
    key: "dispatch",
    value: function dispatch(data) {
      var _this2 = this;

      var type = data.type; // reducers

      if (this.reducers[type]) {
        var action = this.reducers[type];
        var rst = action(data, {
          state: this.getState()
        });
        this.setState(rst); // 触发 state 更新

        this.update();
        return;
      } // effects
      else if (this.effects[type]) {
          var _action = function _action() {
            for (var _len = arguments.length, arg = new Array(_len), _key = 0; _key < _len; _key++) {
              arg[_key] = arguments[_key];
            }

            return new Promise(function (res, rej) {
              var _this2$effects;

              _this2.dispatch({
                type: 'loading',
                payload: {
                  loading: true,
                  effect: type
                }
              });

              var rst = (_this2$effects = _this2.effects)[type].apply(_this2$effects, arg);

              rst.then(res)["catch"](rej);
            })["finally"](function (_) {
              _this2.dispatch({
                type: 'loading',
                payload: {
                  loading: false,
                  effect: type
                }
              });
            });
          };

          return _action(data, {
            state: this.getState(),
            put: this.dispatch.bind(this)
          });
        }

      console.warn("\u672A\u5B9A\u4E49\u7684\u65B9\u6CD5: ".concat(type));
    }
  }]);
  return Model;
}();

exports["default"] = Model;