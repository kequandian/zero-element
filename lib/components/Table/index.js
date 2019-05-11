"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Table;

var _react = _interopRequireDefault(require("react"));

var _muiTables = _interopRequireDefault(require("mui-tables"));

var _locales = _interopRequireDefault(require("./locales"));

var columns = {
  "static": [{
    name: 'id',
    title: 'Id',
    isRowId: true,
    display: 'false',
    calculateCellDefinition: function calculateCellDefinition(entry) {
      return {
        display: entry.id,
        value: entry.id
      };
    }
  }, {
    name: 'title',
    title: 'Title',
    isRowId: true,
    calculateCellDefinition: function calculateCellDefinition(entry) {
      return {
        display: entry.title,
        value: entry.title
      };
    }
  }]
};

function Table(_ref) {
  var _ref$data = _ref.data,
      data = _ref$data === void 0 ? [] : _ref$data;
  return _react["default"].createElement(_muiTables["default"], {
    title: 'Intro Table',
    columns: columns,
    data: data,
    loading: false,
    translations: _locales["default"],
    toolbar: {
      showDates: true,
      startDate: new Date(Date.now() - 86400 * 1000),
      endDate: new Date(),
      startLabel: '开始时间',
      endLabel: '结束时间',
      handleDateChange: function handleDateChange(isStart) {
        return function (value) {
          return console.log(isStart, value);
        };
      }
    },
    display: {
      // fixedSearch: true,
      search: false,
      download: true
    },
    rows: {
      rowHover: true,
      selectable: true
    }
  });
}