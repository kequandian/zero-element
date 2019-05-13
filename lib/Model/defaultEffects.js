"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _request = require("../utils/request");

// const sleep = ms => new Promise(res => setTimeout(_ => res(), ms));
function fetchList(_x, _x2) {
  return _fetchList.apply(this, arguments);
}

function _fetchList() {
  _fetchList = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(_ref, _ref2) {
    var API, payload, _ref$DIRECTRETURN, DIRECTRETURN, _ref$MODELPATH, MODELPATH, put, _ref3, result, records, _result$data, _records, pageSize, rest;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            API = _ref.API, payload = _ref.payload, _ref$DIRECTRETURN = _ref.DIRECTRETURN, DIRECTRETURN = _ref$DIRECTRETURN === void 0 ? false : _ref$DIRECTRETURN, _ref$MODELPATH = _ref.MODELPATH, MODELPATH = _ref$MODELPATH === void 0 ? 'listData' : _ref$MODELPATH;
            put = _ref2.put;
            console.log("fetchList to :", API, MODELPATH);
            _context.next = 5;
            return (0, _request.query)(API, payload);

          case 5:
            _ref3 = _context.sent;
            result = _ref3.data;

            if (!(result && result.code === 200)) {
              _context.next = 21;
              break;
            }

            if (!DIRECTRETURN) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", result);

          case 10:
            if (!Array.isArray(result.data)) {
              _context.next = 16;
              break;
            }

            records = result.data;
            _context.next = 14;
            return put({
              type: 'save',
              payload: (0, _defineProperty2["default"])({}, MODELPATH, {
                records: records
              })
            });

          case 14:
            _context.next = 19;
            break;

          case 16:
            _result$data = result.data, _records = _result$data.records, pageSize = _result$data.size, rest = (0, _objectWithoutProperties2["default"])(_result$data, ["records", "size"]);
            _context.next = 19;
            return put({
              type: 'save',
              payload: (0, _defineProperty2["default"])({}, MODELPATH, (0, _objectSpread2["default"])({}, rest, {
                pageSize: pageSize,
                records: _records
              }))
            });

          case 19:
            _context.next = 23;
            break;

          case 21:
            _context.next = 23;
            return put({
              type: 'save',
              payload: (0, _defineProperty2["default"])({}, MODELPATH, {
                records: []
              })
            });

          case 23:
            return _context.abrupt("return", result);

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _fetchList.apply(this, arguments);
}

var effects = {
  fetchList: fetchList
};
var _default = effects;
exports["default"] = _default;