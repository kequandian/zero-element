"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveToItems = saveToItems;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _PageContext = require("../../components/EventProxy/PageContext");

function saveToItems(value, props) {
  var data = props.data,
      field = props.field,
      options = props.options;
  var index = data.index;

  var _getPageContext = (0, _PageContext.getPageContext)(),
      requester = _getPageContext.requester,
      dataPool = _getPageContext.dataPool;

  var formData = dataPool.getToFormAll();
  var itemsField = options.itemsField;
  var items = (0, _toConsumableArray2["default"])(formData[itemsField]);
  items[index][field] = value;
  requester.save({
    payload: {
      'formData': (0, _objectSpread3["default"])({}, dataPool.getToFormAll(), (0, _defineProperty2["default"])({}, itemsField, (0, _toConsumableArray2["default"])(items)))
    }
  });
}