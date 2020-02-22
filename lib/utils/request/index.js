"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.query = query;
exports.post = post;
exports.update = update;
exports.remove = remove;
exports.upload = upload;
exports.download = download;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _axios = _interopRequireWildcard(require("./axios"));

var _endpoint = require("./endpoint");

var _token = require("./token");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function canEndPoint(api) {
  return api.indexOf('http') === -1 ? (0, _endpoint.get)() : undefined;
}

function query(_x) {
  return _query.apply(this, arguments);
}

function _query() {
  _query = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(api) {
    var params,
        _args = arguments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            params = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
            return _context.abrupt("return", _axios["default"].get(api, {
              params: _objectSpread({
                _t: new Date().getTime()
              }, params),
              baseURL: canEndPoint(api),
              headers: {
                'Authorization': "Bearer " + (0, _token.getToken)()
              }
            })["catch"](_axios.error));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _query.apply(this, arguments);
}

function post(_x2) {
  return _post.apply(this, arguments);
}

function _post() {
  _post = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(api) {
    var data,
        _args2 = arguments;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            data = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
            return _context2.abrupt("return", _axios["default"].post(api, data, {
              baseURL: canEndPoint(api),
              headers: {
                'Authorization': "Bearer " + (0, _token.getToken)()
              }
            })["catch"](_axios.error));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _post.apply(this, arguments);
}

function update(_x3) {
  return _update.apply(this, arguments);
}

function _update() {
  _update = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(api) {
    var data,
        _args3 = arguments;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            data = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
            return _context3.abrupt("return", _axios["default"].put(api, data, {
              baseURL: canEndPoint(api),
              headers: {
                'Authorization': "Bearer " + (0, _token.getToken)()
              }
            })["catch"](_axios.error));

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _update.apply(this, arguments);
}

function remove(_x4) {
  return _remove.apply(this, arguments);
}

function _remove() {
  _remove = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(api) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt("return", _axios["default"]["delete"](api, {
              baseURL: canEndPoint(api),
              headers: {
                'Authorization': "Bearer " + (0, _token.getToken)()
              }
            })["catch"](_axios.error));

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _remove.apply(this, arguments);
}

function upload(_x5, _x6) {
  return _upload.apply(this, arguments);
}

function _upload() {
  _upload = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5(api, data) {
    var bodyData;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            bodyData = undefined;

            if (!(data instanceof FormData)) {
              bodyData = new FormData();
              Object.keys(data).forEach(function (key) {
                bodyData.append(key, data[key]);
              });
            } else {
              bodyData = data;
            }

            return _context5.abrupt("return", _axios["default"].post(api, bodyData, {
              baseURL: canEndPoint(api),
              headers: {
                'Authorization': "Bearer " + (0, _token.getToken)(),
                'Content-Type': undefined
              }
            })["catch"](_axios.error));

          case 3:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _upload.apply(this, arguments);
}

function download(_x7, _x8, _x9) {
  return _download.apply(this, arguments);
}

function _download() {
  _download = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee6(api, _ref, data) {
    var _ref$method, method, fileName;

    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _ref$method = _ref.method, method = _ref$method === void 0 ? 'get' : _ref$method, fileName = _ref.fileName;
            return _context6.abrupt("return", (0, _axios["default"])({
              url: api,
              method: method,
              baseURL: canEndPoint(api),
              responseType: 'blob',
              headers: {
                'Authorization': "Bearer " + (0, _token.getToken)()
              },
              params: method === 'get' ? data : undefined,
              data: method !== 'get' ? data : undefined
            }).then(function (res) {
              return downloadFile(res, fileName);
            })["catch"](_axios.error));

          case 2:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _download.apply(this, arguments);
}

function downloadFile(res) {
  var defaultName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'file';

  if (res.data.type === "application/json") {
    return Promise.reject('api 未返回文件数据流');
  } else {
    var disposition = res.headers['content-disposition'] || '';
    var matchRst = disposition.match(/filename=(\S+)/i);
    var fileName = matchRst && matchRst[1] || defaultName;
    var blob = new Blob([res.data]);

    if (window.navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(blob, fileName); //兼容ie10
    } else {
      var link = document.createElement("a");
      var evt = document.createEvent("HTMLEvents");
      evt.initEvent("click", false, false);
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(link.href);
    }
  }
}