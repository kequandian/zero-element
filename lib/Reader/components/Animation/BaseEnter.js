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

var _rcQueueAnim = _interopRequireDefault(require("rc-queue-anim"));

require("./index.css");

var BaseEnter =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2["default"])(BaseEnter, _Component);

  function BaseEnter() {
    (0, _classCallCheck2["default"])(this, BaseEnter);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(BaseEnter).apply(this, arguments));
  }

  (0, _createClass2["default"])(BaseEnter, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          restProps = (0, _objectWithoutProperties2["default"])(_this$props, ["children"]);
      return _react["default"].createElement(_rcQueueAnim["default"], {
        interval: 0,
        animConfig: [{
          opacity: [1, 0],
          translateY: [0, 40]
        }],
        animatingClassName: ['queue-anim-entering', 'Reader-display-none']
      }, _react["default"].Children.map(children, function (child) {
        return _react["default"].cloneElement(child, (0, _objectSpread2["default"])({
          key: 'content'
        }, restProps));
      }));
    }
  }]);
  return BaseEnter;
}(_react.Component);

exports["default"] = BaseEnter;