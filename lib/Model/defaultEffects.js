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

var _APIConfig = require("zero-element-global/lib/APIConfig");

// const sleep = ms => new Promise(res => setTimeout(_ => res(), ms));
function fetchList(_x, _x2) {
  return _fetchList.apply(this, arguments);
}

function _fetchList() {
  _fetchList = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(_ref, _ref2) {
    var API, payload, DIRECTRETURN, MODELPATH, put, _ref10, result, records, data;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            API = _ref.API, payload = _ref.payload, DIRECTRETURN = _ref.DIRECTRETURN, MODELPATH = _ref.MODELPATH;
            put = _ref2.put;
            console.log("fetchList to :", API, MODELPATH);
            _context.next = 5;
            return (0, _request.query)(API, payload);

          case 5:
            _ref10 = _context.sent;
            result = _ref10.data;

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
    var API, payload, _ref11, result;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            API = _ref3.API, payload = _ref3.payload;
            console.log("deleteOne to :", API);
            _context2.next = 4;
            return (0, _request.remove)(API, payload);

          case 4:
            _ref11 = _context2.sent;
            result = _ref11.data;

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

function fetchOne(_x4, _x5) {
  return _fetchOne.apply(this, arguments);
}

function _fetchOne() {
  _fetchOne = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(_ref4, _ref5) {
    var API, payload, DIRECTRETURN, MODELPATH, put, _ref12, result;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            API = _ref4.API, payload = _ref4.payload, DIRECTRETURN = _ref4.DIRECTRETURN, MODELPATH = _ref4.MODELPATH;
            put = _ref5.put;
            console.log("fetchOne to :", API);
            _context3.next = 5;
            return (0, _request.query)(API, payload);

          case 5:
            _ref12 = _context3.sent;
            result = _ref12.data;

            if (!(result && result.code === 200)) {
              _context3.next = 14;
              break;
            }

            if (!DIRECTRETURN) {
              _context3.next = 10;
              break;
            }

            return _context3.abrupt("return", result);

          case 10:
            _context3.next = 12;
            return put({
              type: 'save',
              payload: (0, _defineProperty2["default"])({}, MODELPATH, (0, _objectSpread2["default"])({}, result.data))
            });

          case 12:
            _context3.next = 16;
            break;

          case 14:
            _context3.next = 16;
            return put({
              type: 'save',
              payload: (0, _defineProperty2["default"])({}, MODELPATH, {})
            });

          case 16:
            return _context3.abrupt("return", result);

          case 17:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _fetchOne.apply(this, arguments);
}

function createForm(_x6, _x7) {
  return _createForm.apply(this, arguments);
}

function _createForm() {
  _createForm = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(_ref6, _ref7) {
    var API, payload, put, _ref13, result;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            API = _ref6.API, payload = _ref6.payload;
            put = _ref7.put;
            console.log("createForm to :", API);
            _context4.next = 5;
            return (0, _request.post)(API, payload);

          case 5:
            _ref13 = _context4.sent;
            result = _ref13.data;

            if (result && result.code === 200) {
              console.log('添加数据成功');
            }

            return _context4.abrupt("return", result);

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _createForm.apply(this, arguments);
}

function updateForm(_x8, _x9) {
  return _updateForm.apply(this, arguments);
}

function _updateForm() {
  _updateForm = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5(_ref8, _ref9) {
    var API, payload, put, _ref14, result;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            API = _ref8.API, payload = _ref8.payload;
            put = _ref9.put;
            console.log("updateForm to :", API);
            _context5.next = 5;
            return (0, _request.update)(API, payload);

          case 5:
            _ref14 = _context5.sent;
            result = _ref14.data;

            if (result && result.code === 200) {
              console.log('添加数据成功');
            }

            return _context5.abrupt("return", result);

          case 9:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _updateForm.apply(this, arguments);
}

var effects = {
  fetchList: fetchList,
  deleteOne: deleteOne,
  fetchOne: fetchOne,
  createForm: createForm,
  updateForm: updateForm
};
var _default = effects;
exports["default"] = _default;