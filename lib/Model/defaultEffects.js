"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _request = require("../utils/request");

var _APIConfig = require("../config/APIConfig");

var _format = require("../utils/format");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// const sleep = ms => new Promise(res => setTimeout(_ => res(), ms));
function fetchList(_x) {
  return _fetchList.apply(this, arguments);
}

function _fetchList() {
  _fetchList = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
    var API, payload, fAPI, _yield$query, result, records, data;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            API = _ref.API, payload = _ref.payload;
            fAPI = (0, _format.formatAPI)(API, {
              namespace: this.namespace,
              data: this._pageData
            });

            if (process.env.NODE_ENV === 'development') {
              console.log("fetchList ".concat(fAPI), payload);
            }

            _context.next = 5;
            return (0, _request.query)(fAPI, payload);

          case 5:
            _yield$query = _context.sent;
            result = _yield$query.data;

            if (result && result.code === 200) {
              if (Array.isArray(result.data)) {
                records = result.data;
                this.records = records;
              } else {
                data = result.data;
                this.records = _objectSpread(_objectSpread({}, data), {}, {
                  current: data[(0, _APIConfig.get)('RESPONSE_FIELD_current')],
                  pageSize: data[(0, _APIConfig.get)('RESPONSE_FIELD_pageSize')],
                  total: data[(0, _APIConfig.get)('RESPONSE_FIELD_total')],
                  records: data[(0, _APIConfig.get)('RESPONSE_FIELD_records')]
                });
              }
            } else {
              this.records = {
                records: []
              };
            }

            console.log(111, this);
            return _context.abrupt("return", result);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _fetchList.apply(this, arguments);
}

function deleteOne(_x2) {
  return _deleteOne.apply(this, arguments);
}

function _deleteOne() {
  _deleteOne = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_ref2) {
    var API, payload, fAPI, _yield$remove, result;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            API = _ref2.API, payload = _ref2.payload;
            fAPI = (0, _format.formatAPI)(API, {
              namespace: this.namespace,
              data: this._pageData
            });
            _context2.next = 4;
            return (0, _request.remove)(fAPI, payload);

          case 4:
            _yield$remove = _context2.sent;
            result = _yield$remove.data;

            if (result && result.code === 200) {
              console.log('删除成功');
            }

            return _context2.abrupt("return", result);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return _deleteOne.apply(this, arguments);
}

function fetchOne(_x3) {
  return _fetchOne.apply(this, arguments);
}

function _fetchOne() {
  _fetchOne = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_ref3) {
    var API, payload, fAPI, _yield$query2, result;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            API = _ref3.API, payload = _ref3.payload;
            fAPI = (0, _format.formatAPI)(API, {
              namespace: this.namespace,
              data: this._pageData
            });
            _context3.next = 4;
            return (0, _request.query)(fAPI, payload);

          case 4:
            _yield$query2 = _context3.sent;
            result = _yield$query2.data;

            if (result && result.code === 200) {
              this.formData = _objectSpread({}, result.data);
            } else {
              this.formData = {};
            }

            return _context3.abrupt("return", result);

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));
  return _fetchOne.apply(this, arguments);
}

function createForm(_x4) {
  return _createForm.apply(this, arguments);
}

function _createForm() {
  _createForm = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(_ref4) {
    var API, payload, options, fAPI, _yield$post, result;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            API = _ref4.API, payload = _ref4.payload, options = _ref4.options;
            fAPI = (0, _format.formatAPI)(API, {
              namespace: this.namespace,
              data: this._pageData
            });
            _context4.next = 4;
            return (0, _request.post)(fAPI, payload, options);

          case 4:
            _yield$post = _context4.sent;
            result = _yield$post.data;

            if (result && result.code === 200) {
              console.log('添加数据成功');
            }

            return _context4.abrupt("return", result);

          case 8:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));
  return _createForm.apply(this, arguments);
}

function updateForm(_x5) {
  return _updateForm.apply(this, arguments);
}

function _updateForm() {
  _updateForm = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(_ref5) {
    var API, payload, options, fAPI, _yield$update, result;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            API = _ref5.API, payload = _ref5.payload, options = _ref5.options;
            fAPI = (0, _format.formatAPI)(API, {
              namespace: this.namespace,
              data: this._pageData
            });
            _context5.next = 4;
            return (0, _request.update)(fAPI, payload, options);

          case 4:
            _yield$update = _context5.sent;
            result = _yield$update.data;

            if (result && result.code === 200) {
              console.log('修改数据成功');
            }

            return _context5.abrupt("return", result);

          case 8:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));
  return _updateForm.apply(this, arguments);
}

function setRecord(payload) {
  this.record = payload;
}

var effects = {
  fetchList: fetchList,
  deleteOne: deleteOne,
  fetchOne: fetchOne,
  createForm: createForm,
  updateForm: updateForm,
  setRecord: setRecord
};
var _default = effects;
exports["default"] = _default;