"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = valueTypeStatus;

var _status = _interopRequireDefault(require("./status.config"));

function valueTypeStatus(props) {
  var _props$options = props.options,
      options = _props$options === void 0 ? {} : _props$options,
      _props$data$text = props.data.text,
      text = _props$data$text === void 0 ? '' : _props$data$text;
  var _options$statusMap = options.statusMap,
      statusMap = _options$statusMap === void 0 ? {} : _options$statusMap;
  return statusMap[text] || _status["default"][text] || text;
}