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
exports.preview = preview;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _axios = _interopRequireWildcard(require("./axios"));

var _endpoint = require("./endpoint");

var _token = require("./token");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function canEndPoint(api) {
  return api.indexOf('http') === -1 ? (0, _endpoint.get)() : undefined;
}

function setAuthorization(options) {
  var token = (0, _token.getToken)();

  if (token) {
    options.headers = _objectSpread(_objectSpread({}, options.headers), {}, {
      'Authorization': "Bearer " + token
    });
  }
}

function query(_x) {
  return _query.apply(this, arguments);
}

function _query() {
  _query = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(api) {
    var params,
        opt,
        _args = arguments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            params = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
            opt = {
              params: _objectSpread({
                _t: new Date().getTime()
              }, params),
              baseURL: canEndPoint(api),
              headers: {}
            };
            setAuthorization(opt);
            return _context.abrupt("return", _axios["default"].get(api, opt)["catch"](_axios.error));

          case 4:
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
  _post = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(api) {
    var data,
        options,
        opt,
        _args2 = arguments;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            data = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
            options = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : {};
            opt = _objectSpread({
              baseURL: canEndPoint(api),
              headers: {}
            }, options);
            setAuthorization(opt);
            return _context2.abrupt("return", _axios["default"].post(api, data, opt).then(function (res) {
              return downloadFile(res);
            })["catch"](_axios.error));

          case 5:
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
  _update = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(api) {
    var data,
        opt,
        _args3 = arguments;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            data = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
            opt = {
              baseURL: canEndPoint(api),
              headers: {}
            };
            setAuthorization(opt);
            return _context3.abrupt("return", _axios["default"].put(api, data, opt)["catch"](_axios.error));

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _update.apply(this, arguments);
}

function remove(_x4, _x5) {
  return _remove.apply(this, arguments);
}

function _remove() {
  _remove = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(api, data) {
    var opt;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            opt = {
              baseURL: canEndPoint(api),
              headers: {},
              data: data
            };
            setAuthorization(opt);
            return _context4.abrupt("return", _axios["default"]["delete"](api, opt)["catch"](_axios.error));

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _remove.apply(this, arguments);
}

function upload(_x6, _x7, _x8) {
  return _upload.apply(this, arguments);
}

function _upload() {
  _upload = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(api, data, headers) {
    var bodyData, opt;
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

            opt = {
              baseURL: canEndPoint(api),
              headers: _objectSpread({
                'Content-Type': undefined
              }, headers ? headers : {})
            };
            setAuthorization(opt);
            return _context5.abrupt("return", _axios["default"].post(api, bodyData, opt)["catch"](_axios.error));

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _upload.apply(this, arguments);
}

function download(_x9) {
  return _download.apply(this, arguments);
}

function _download() {
  _download = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(api) {
    var options,
        data,
        _options$method,
        method,
        fileName,
        opt,
        _args6 = arguments;

    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            options = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};
            data = _args6.length > 2 ? _args6[2] : undefined;
            _options$method = options.method, method = _options$method === void 0 ? 'get' : _options$method, fileName = options.fileName;
            opt = {
              url: api,
              method: method,
              baseURL: canEndPoint(api),
              responseType: 'blob',
              headers: {},
              params: method === 'get' ? data : undefined,
              data: method !== 'get' ? data : undefined
            };
            setAuthorization(opt);
            return _context6.abrupt("return", (0, _axios["default"])(opt).then(function (res) {
              return downloadFile(res, fileName);
            })["catch"](_axios.error));

          case 6:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _download.apply(this, arguments);
}

function preview(_x10) {
  return _preview.apply(this, arguments);
}

function _preview() {
  _preview = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(api) {
    var options,
        data,
        _options$method2,
        method,
        fileName,
        opt,
        _args7 = arguments;

    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            options = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : {};
            data = _args7.length > 2 ? _args7[2] : undefined;
            _options$method2 = options.method, method = _options$method2 === void 0 ? 'get' : _options$method2, fileName = options.fileName;
            opt = {
              url: api,
              method: method,
              baseURL: canEndPoint(api),
              responseType: 'blob',
              headers: {},
              params: method === 'get' ? data : undefined,
              data: method !== 'get' ? data : undefined
            };
            setAuthorization(opt);
            return _context7.abrupt("return", (0, _axios["default"])(opt).then(function (res) {
              return previewFile(res, fileName);
            })["catch"](_axios.error));

          case 6:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _preview.apply(this, arguments);
}

function downloadFile(res) {
  var defaultName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'file';
  var contentType = res.headers['content-type'];

  if (contentType && contentType.indexOf('application/json') > -1) {
    return Promise.resolve(res);
  } else {
    var fileName = getFileName(res, defaultName);
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

function previewFile(res) {
  var contentType = res.headers['content-type'];

  if (contentType && contentType.indexOf('application/json') > -1) {
    return Promise.resolve(res);
  } else {
    var fileName = getFileName(res);
    var blob = new Blob([res.data], {
      type: contentType
    });

    if (window.navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(blob, fileName); //兼容ie10
    } else {
      var url = URL.createObjectURL(blob);
      window.open(url, '_blank', '');
    }
  }
}

function getFileName(res) {
  var defaultName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var disposition = res.headers['content-disposition'] || '';
  var matchRst = disposition.match(/filename=["]{0,1}([\w.@%-]+)["]{0,1}/i);
  var fileName = matchRst && decodeURI(matchRst[1]) || defaultName;
  return fileName;
}