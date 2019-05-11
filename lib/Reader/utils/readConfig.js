"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMainLayout = getMainLayout;
exports.getItem = getItem;
exports.getFormItem = getFormItem;
exports.setLayoutExtends = setLayoutExtends;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

var LayoutSet = _interopRequireWildcard(require("../components/Layout"));

var _Animation = require("../components/Animation");

var _getFormItemType = require("./getFormItemType");

var _baseComponents = require("../../global/baseComponents");

var FormItem = _antd.Form.Item;
var extendsLayout = {};

function getMainLayout(layoutName) {
  var layoutMap = (0, _objectSpread2["default"])({}, LayoutSet, extendsLayout);

  if (layoutName === undefined) {
    return layoutMap['Grid'];
  }

  return layoutMap[layoutName] || function (layoutName) {
    console.warn("\u672A\u5B9A\u4E49\u7684 Layout: ".concat(layoutName));
    return _react["default"].createElement("div", null, "\u672A\u5B9A\u4E49\u7684 Layout: ", String(layoutName));
  }.bind(null, layoutName);
}

function getItem(itemConfig, index, props) {
  var _itemConfig$PREVENTRE = itemConfig.PREVENTRENDER,
      PREVENTRENDER = _itemConfig$PREVENTRE === void 0 ? false : _itemConfig$PREVENTRE,
      component = itemConfig.component,
      restConfig = (0, _objectWithoutProperties2["default"])(itemConfig, ["PREVENTRENDER", "component"]);
  return _react["default"].createElement(_Animation.BaseEnter, (0, _extends2["default"])({}, restConfig, {
    key: index
  }), PREVENTRENDER ? null : _react["default"].createElement(_baseComponents.Render, (0, _extends2["default"])({
    n: component
  }, props)));
}

function getFormItem(getFieldDecorator, field) {
  var fieldName = field.field,
      label = field.label,
      value = field.value,
      _field$extra = field.extra,
      extra = _field$extra === void 0 ? '' : _field$extra,
      span = field.span,
      _field$rules = field.rules,
      rules = _field$rules === void 0 ? [] : _field$rules,
      type = field.type,
      rest = (0, _objectWithoutProperties2["default"])(field, ["field", "label", "value", "extra", "span", "rules", "type"]);
  return _react["default"].createElement(FormItem, {
    key: fieldName,
    label: label === undefined ? fieldName : label // hasFeedback={true}
    ,
    extra: extra,
    span: span
  }, getFieldDecorator(fieldName, {
    initialValue: value,
    rules: [].concat((0, _toConsumableArray2["default"])(defaultRule(type)), (0, _toConsumableArray2["default"])(rules)),
    validateTrigger: 'onBlur'
  })((0, _getFormItemType.getFormItemType)(type, rest)));
}

function defaultRule(type) {
  var ruleMap = {
    'email': [{
      type: 'email',
      message: '错误的邮箱格式。正确示例: abc@def.com'
    }],
    'phone': [{
      pattern: /[0-9-()（）]{7,18}/,
      message: '错误的电话号码格式。应该由 7 到 18 位数字组成'
    }],
    'mobile': [{
      pattern: /0?(13|14|15|17|18)[0-9]{9}/,
      message: '错误的手机号码格式'
    }]
  };
  return ruleMap[type] || [];
}
/**
 *
 * 对外暴露的方法，用于添加额外的 Layout 或者覆盖原有的 Layout
 * @export
 * @param {*} extendsObj
 */


function setLayoutExtends(extendsObj) {
  extendsLayout = (0, _objectSpread2["default"])({}, extendsLayout, extendsObj);
}