"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

// const sleep = ms => new Promise(res => setTimeout(_ => res(), ms));
function fetchList(_x) {
  return _fetchList.apply(this, arguments);
}

function _fetchList() {
  _fetchList = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(_ref) {
    var API, payload;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            API = _ref.API, payload = _ref.payload;
            console.log("fetchList to :", API, payload);

          case 2:
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