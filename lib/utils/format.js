"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatTableFields = formatTableFields;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

var _BaseElement = require("../components/BaseElement");

var _valueTypeRender = require("./valueTypeRender");

/**
 *
 * 统一 Table columns 的格式
 * @export
 * @param {array} fields 标准化的 fields
 * @param {array} operation 对该行的操作
 * @param {boolean} NOTREGISTER 不要把 record 注册到 dataPool
 * @returns antd Table columns
 */
function formatTableFields() {
  var fields = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var operation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var NOTREGISTER = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var operationCfg = {};
  var rst = fields.map(function (fieldCfg, i) {
    var field = fieldCfg.field,
        label = fieldCfg.label,
        valueType = fieldCfg.valueType,
        _fieldCfg$render = fieldCfg.render,
        render = _fieldCfg$render === void 0 ? i === 0 ? renderLoading : (0, _valueTypeRender.valueTypeRender)(valueType, fieldCfg) : _fieldCfg$render,
        rest = (0, _objectWithoutProperties2["default"])(fieldCfg, ["field", "label", "valueType", "render"]);

    if (field === 'operation') {
      operationCfg = fieldCfg;
      return {};
    }

    return (0, _objectSpread2["default"])({
      dataIndex: field,
      title: label,
      render: render
    }, rest);
  }).filter(function (fieldCfg) {
    return fieldCfg.dataIndex;
  });

  if (operation.length > 0) {
    rst.push((0, _objectSpread2["default"])({
      dataIndex: 'operation',
      align: 'right'
    }, operationCfg, {
      // fixed  width
      title: _BaseElement.ListFieldsEdit,
      render: function render(text, record, index) {
        if (record.loading) return null;
        return _react["default"].createElement(_BaseElement.ListOperation, {
          text: text,
          record: record,
          index: index,
          operation: operation,
          NOTREGISTER: NOTREGISTER
        });
      }
    }));
  }

  return rst;
}

var renderLoading = function renderLoading(text, record) {
  return record.loading === true ? _react["default"].createElement(_antd.Spin, {
    style: {
      marginRight: '1em'
    }
  }) : text;
};