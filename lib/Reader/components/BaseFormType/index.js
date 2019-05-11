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

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _Number = _interopRequireDefault(require("./Number"));

var _TextArea = _interopRequireDefault(require("./TextArea"));

var _Group = _interopRequireDefault(require("./Group"));

var _Date = _interopRequireDefault(require("./Date"));

var _contrast = _interopRequireDefault(require("../../utils/contrast"));

var _default = {
  input: _antd.Input,
  select:
  /*#__PURE__*/
  function (_Component) {
    (0, _inherits2["default"])(SelectWrapped, _Component);

    function SelectWrapped() {
      (0, _classCallCheck2["default"])(this, SelectWrapped);
      return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(SelectWrapped).apply(this, arguments));
    }

    (0, _createClass2["default"])(SelectWrapped, [{
      key: "shouldComponentUpdate",
      value: function shouldComponentUpdate(nextProps, nextState) {
        return (0, _contrast["default"])(this.props, nextProps, ['value', 'options']);
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props = this.props,
            _this$props$options = _this$props.options,
            options = _this$props$options === void 0 ? [] : _this$props$options,
            restProps = (0, _objectWithoutProperties2["default"])(_this$props, ["options"]);
        return _react["default"].createElement(_antd.Select, restProps, options.map(function (option, i) {
          return _react["default"].createElement(_antd.Select.Option, {
            value: option.value,
            key: i
          }, option.title);
        }));
      }
    }]);
    return SelectWrapped;
  }(_react.Component),
  radio:
  /*#__PURE__*/
  function (_Component2) {
    (0, _inherits2["default"])(RadioWrapped, _Component2);

    function RadioWrapped() {
      (0, _classCallCheck2["default"])(this, RadioWrapped);
      return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(RadioWrapped).apply(this, arguments));
    }

    (0, _createClass2["default"])(RadioWrapped, [{
      key: "shouldComponentUpdate",
      value: function shouldComponentUpdate(nextProps, nextState) {
        return (0, _contrast["default"])(this.props, nextProps, ['value', 'options']);
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props2 = this.props,
            _this$props2$options = _this$props2.options,
            options = _this$props2$options === void 0 ? [] : _this$props2$options,
            restProps = (0, _objectWithoutProperties2["default"])(_this$props2, ["options"]);
        return _react["default"].createElement(_antd.Radio.Group, restProps, options.map(function (option, i) {
          return _react["default"].createElement(_antd.Radio, {
            value: option.value,
            key: i
          }, option.title);
        }));
      }
    }]);
    return RadioWrapped;
  }(_react.Component),
  checkbox:
  /*#__PURE__*/
  function (_Component3) {
    (0, _inherits2["default"])(CheckboxWrapped, _Component3);

    function CheckboxWrapped() {
      (0, _classCallCheck2["default"])(this, CheckboxWrapped);
      return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(CheckboxWrapped).apply(this, arguments));
    }

    (0, _createClass2["default"])(CheckboxWrapped, [{
      key: "shouldComponentUpdate",
      value: function shouldComponentUpdate(nextProps, nextState) {
        return (0, _contrast["default"])(this.props, nextProps, ['value', 'options']);
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props3 = this.props,
            _this$props3$options = _this$props3.options,
            options = _this$props3$options === void 0 ? [] : _this$props3$options,
            restProps = (0, _objectWithoutProperties2["default"])(_this$props3, ["options"]);
        return _react["default"].createElement(_antd.Checkbox.Group, (0, _extends2["default"])({
          options: options.map(function (item) {
            return (0, _objectSpread2["default"])({}, item, {
              label: item.title
            });
          })
        }, restProps));
      }
    }]);
    return CheckboxWrapped;
  }(_react.Component),
  number: _Number["default"],
  textArea: _TextArea["default"],
  group: _Group["default"],
  date: (0, _Date["default"])('date'),
  week: (0, _Date["default"])('week'),
  month: (0, _Date["default"])('month'),
  range: (0, _Date["default"])('range'),
  plain:
  /*#__PURE__*/
  function (_Component4) {
    (0, _inherits2["default"])(Plain, _Component4);

    function Plain() {
      (0, _classCallCheck2["default"])(this, Plain);
      return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(Plain).apply(this, arguments));
    }

    (0, _createClass2["default"])(Plain, [{
      key: "render",
      value: function render() {
        return this.props.value || null;
      }
    }]);
    return Plain;
  }(_react.Component)
};
exports["default"] = _default;