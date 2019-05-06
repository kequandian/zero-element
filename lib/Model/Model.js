"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _react = require("react");

var sleep = function sleep(ms) {
  return new Promise(function (res) {
    return setTimeout(function (_) {
      return res();
    }, ms);
  });
};

var isPromise = function isPromise(func) {
  if (func instanceof Promise) return true;
  if ((0, _typeof2["default"])(func) === 'object' && typeof func.then === 'function') return true;
  return false;
};

var Model =
/*#__PURE__*/
function () {
  function Model(config) {
    (0, _classCallCheck2["default"])(this, Model);
    this.state = {};
    this.queue = [];
    this.reducers = {
      save: function save() {
        return {
          name: 'XiaoMing'
        };
      }
    };
    this.effects = {
      test: function () {
        var _test = (0, _asyncToGenerator2["default"])(
        /*#__PURE__*/
        _regenerator["default"].mark(function _callee(payload, _ref) {
          var state;
          return _regenerator["default"].wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  state = _ref.state;
                  console.log(111111, payload, state);
                  _context.next = 4;
                  return sleep(1000);

                case 4:
                  console.log('ok!');

                case 5:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        function test(_x, _x2) {
          return _test.apply(this, arguments);
        }

        return test;
      }()
    };
    this.namespace = '';
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
    value: function dispatch(_ref2) {
      var _this2 = this;

      var type = _ref2.type,
          payload = _ref2.payload;
      var action = this.reducers[type] || this.effects[type];

      if (action) {
        var rst = action(payload, {
          state: this.getState() // put: this.dispatch,

        });

        if (isPromise(rst)) {// rst.then();
        } else {
          this.state = (0, _objectSpread2["default"])({}, this.getState(), rst); // 触发 state 更新

          this.queue.forEach(function (setState) {
            return setState(_this2.state);
          });
        }
      }
    }
  }]);
  return Model;
}();

exports["default"] = Model;