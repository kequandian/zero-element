"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getChecked = getChecked;
exports.setChecked = setChecked;

var _utils = require("./utils");

function getChecked(namespace, fieldsConfig) {
  var ListFieldsConfig = _utils.LS.get('ListFieldsConfig') || {};

  if (ListFieldsConfig[namespace]) {
    return ListFieldsConfig[namespace];
  } else {
    if (fieldsConfig) {
      var filter = fieldsConfig.map(function (field) {
        return field.field;
      });
      setChecked(namespace, filter);
      return filter;
    }
  }

  return null;
}

function setChecked(namespace, fieldsConfig) {
  var ListFieldsConfig = _utils.LS.get('ListFieldsConfig') || {};
  ListFieldsConfig[namespace] = fieldsConfig;

  _utils.LS.set('ListFieldsConfig', ListFieldsConfig);
}