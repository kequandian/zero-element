"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var Number =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2["default"])(Number, _Component);

  function Number() {
    (0, _classCallCheck2["default"])(this, Number);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(Number).apply(this, arguments));
  }

  (0, _createClass2["default"])(Number, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          _this$props$options = _this$props.options,
          options = _this$props$options === void 0 ? {} : _this$props$options,
          restProps = (0, _objectWithoutProperties2["default"])(_this$props, ["options"]);
      var type = options.type,
          _options$symbol = options.symbol,
          symbol = _options$symbol === void 0 ? '￥' : _options$symbol;
      var numberProps = (0, _objectSpread2["default"])({}, restProps, typeMap[type] && typeMap[type](symbol) || {});
      return _react["default"].createElement(_antd.InputNumber, numberProps);
    }
  }]);
  return Number;
}(_react.Component);

exports["default"] = Number;
;
var typeMap = {
  currency: function currency(symbol) {
    return {
      formatter: function formatter(value) {
        return "".concat(symbol, " ").concat(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      },
      parser: function parser(value) {
        return value.replace(/\D/g, '');
      },
      defaultValue: 0
    };
  }
};