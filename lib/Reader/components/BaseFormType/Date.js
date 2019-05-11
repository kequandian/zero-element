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

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _moment = _interopRequireDefault(require("moment"));

var WeekPicker = _antd.DatePicker.WeekPicker,
    MonthPicker = _antd.DatePicker.MonthPicker,
    RangePicker = _antd.DatePicker.RangePicker;
var componentMap = {
  'date': _antd.DatePicker,
  'week': WeekPicker,
  'month': MonthPicker,
  'range': RangePicker
};
var formatMap = {
  'date': 'YYYY-MM-DD',
  'week': 'YYYY-W',
  'month': 'YYYY-MM',
  'range': 'YYYY-MM-DD'
};

var _default = function _default(componentName) {
  var _temp;

  var Match = componentMap[componentName];
  return _temp =
  /*#__PURE__*/
  function (_Component) {
    (0, _inherits2["default"])(DateWrapped, _Component);

    function DateWrapped(props) {
      var _this;

      (0, _classCallCheck2["default"])(this, DateWrapped);
      _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(DateWrapped).call(this, props));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onChange", function (moment, dateString) {
        var _this$props = _this.props,
            onChange = _this$props.onChange,
            _this$props$options = _this$props.options,
            options = _this$props$options === void 0 ? {} : _this$props$options;

        if (onChange) {
          onChange(dateString);
        }
      });
      var value = props.value,
          _props$options = props.options,
          options = _props$options === void 0 ? {} : _props$options;
      var _options$nowTime = options.nowTime,
          nowTime = _options$nowTime === void 0 ? true : _options$nowTime;
      _this.state = {
        originalValue: value,
        value: initTime({
          value: value,
          nowTime: nowTime,
          componentName: componentName
        })
      };
      return _this;
    }

    (0, _createClass2["default"])(DateWrapped, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this$state = this.state,
            originalValue = _this$state.originalValue,
            value = _this$state.value; // 初始值为空且 nowTime !== false 的情况下，保存当前时间到 model

        if (!originalValue && value) {
          var _this$props2 = this.props,
              onChange = _this$props2.onChange,
              _this$props2$options = _this$props2.options,
              options = _this$props2$options === void 0 ? {} : _this$props2$options;
          var _options$format = options.format,
              format = _options$format === void 0 ? formatMap[componentName] : _options$format;

          if (componentName === 'range') {
            onChange(value.map(function (item) {
              return item.format(format);
            }));
          } else {
            onChange(value.format(format));
          }
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props3 = this.props,
            _this$props3$options = _this$props3.options,
            options = _this$props3$options === void 0 ? {} : _this$props3$options,
            onBlur = _this$props3.onBlur,
            restProps = (0, _objectWithoutProperties2["default"])(_this$props3, ["options", "onBlur"]);
        var _options$format2 = options.format,
            format = _options$format2 === void 0 ? formatMap[componentName] : _options$format2;
        var value = this.state.value;
        var props = (0, _objectSpread2["default"])({
          showToday: true
        }, restProps, {
          value: value,
          format: format,
          allowClear: false,
          onChange: this.onChange
        });
        return _react["default"].createElement(Match, props);
      }
    }], [{
      key: "getDerivedStateFromProps",
      value: function getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.originalValue !== nextProps.value) {
          var value = nextProps.value,
              _nextProps$options = nextProps.options,
              options = _nextProps$options === void 0 ? {} : _nextProps$options;
          var _options$nowTime2 = options.nowTime,
              nowTime = _options$nowTime2 === void 0 ? true : _options$nowTime2;
          return {
            originalValue: value,
            value: initTime({
              value: value,
              nowTime: nowTime,
              componentName: componentName
            })
          };
        }

        return null;
      }
    }]);
    return DateWrapped;
  }(_react.Component), _temp;
};

exports["default"] = _default;

function initTime(_ref) {
  var value = _ref.value,
      nowTime = _ref.nowTime,
      componentName = _ref.componentName;

  if (value instanceof _moment["default"]) {
    return value;
  }

  if (Array.isArray(value)) {
    if (value[0] instanceof _moment["default"]) {
      return value;
    } else {
      return [(0, _moment["default"])(value[0]), (0, _moment["default"])(value[1])];
    }
  }

  if (value) {
    return (0, _moment["default"])(value);
  } else {
    return nowTime ? componentName === 'range' ? [(0, _moment["default"])(), (0, _moment["default"])()] : (0, _moment["default"])() : undefined;
  }
}