"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

require("./index.css");

var AntdTextArea = _antd.Input.TextArea;

var TextArea =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2["default"])(TextArea, _Component);

  function TextArea() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, TextArea);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(TextArea)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onChange", function (e) {
      var value = e.target.value;
      var _this$props$options = _this.props.options,
          options = _this$props$options === void 0 ? {} : _this$props$options;
      var max = options.max;

      if (_this.props.onChange) {
        _this.props.onChange(value.slice(0, max));
      }
    });
    return _this;
  }

  (0, _createClass2["default"])(TextArea, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          _this$props$options2 = _this$props.options,
          options = _this$props$options2 === void 0 ? {} : _this$props$options2,
          _this$props$value = _this$props.value,
          value = _this$props$value === void 0 ? '' : _this$props$value,
          restProps = (0, _objectWithoutProperties2["default"])(_this$props, ["options", "value"]);
      var _options$max = options.max,
          max = _options$max === void 0 ? false : _options$max,
          restOpt = (0, _objectWithoutProperties2["default"])(options, ["max"]);
      var textAreaProps = (0, _objectSpread2["default"])({
        rows: 3,
        value: value
      }, restProps, restOpt);
      return _react["default"].createElement("div", {
        className: "Reader-TextArea-box"
      }, _react["default"].createElement(AntdTextArea, (0, _extends2["default"])({}, textAreaProps, {
        onChange: this.onChange
      })), _react["default"].createElement(Tips, {
        value: value,
        max: max
      }));
    }
  }]);
  return TextArea;
}(_react.Component);

exports["default"] = TextArea;
;

var Tips = function Tips(_ref) {
  var value = _ref.value,
      max = _ref.max;
  var inputtedStyle = {
    color: getColor(value.length, max)
  };
  return _react["default"].createElement("div", {
    className: "Reader-TextArea-tips"
  }, "\u5DF2\u8F93\u5165\uFF1A", _react["default"].createElement("span", {
    style: inputtedStyle
  }, value.length), max ? "/".concat(max) : null);
};

function getColor(now, max) {
  if (!max) return '#bfbfbf';
  if (now === max) return 'rgb(255, 0, 0)'; // 影响性能
  // if (!max) return '#bfbfbf';
  // return `rgb(${255 * (now / max)}, 0, 0)`;
}