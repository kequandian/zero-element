"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _request = require("../utils/request");

var _APIConfig = require("../global/APIConfig");

// const sleep = ms => new Promise(res => setTimeout(_ => res(), ms));
function fetchList(_x, _x2) {
  return _fetchList.apply(this, arguments);
}

function _fetchList() {
  _fetchList = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(_ref, _ref2) {
    var API, payload, _ref$DIRECTRETURN, DIRECTRETURN, _ref$MODELPATH, MODELPATH, put, _ref4, result, records, data;

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
            _ref4 = _context.sent;
            result = _ref4.data;

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
            data = result.data;
            _context.next = 19;
            return put({
              type: 'save',
              payload: (0, _defineProperty2["default"])({}, MODELPATH, (0, _objectSpread2["default"])({}, data, {
                current: data[(0, _APIConfig.get)('FIELD_current')],
                pageSize: data[(0, _APIConfig.get)('FIELD_pageSize')],
                total: data[(0, _APIConfig.get)('FIELD_total')],
                records: data[(0, _APIConfig.get)('FIELD_records')]
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

function deleteOne(_x3) {
  return _deleteOne.apply(this, arguments);
}

function _deleteOne() {
  _deleteOne = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(_ref3) {
    var API, payload, _ref5, result;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            API = _ref3.API, payload = _ref3.payload;
            console.log("deleteOne to :", API);
            _context2.next = 4;
            return (0, _request.query)(API, payload);

          case 4:
            _ref5 = _context2.sent;
            result = _ref5.data;

            if (result && result.code === 200) {
              console.log('删除成功');
            }

            return _context2.abrupt("return", result);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _deleteOne.apply(this, arguments);
}

var effects = {
  fetchList: fetchList,
  deleteOne: deleteOne
};
var _default = effects;
exports["default"] = _default;