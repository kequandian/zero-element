"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _window = _interopRequireDefault(require("../utils/window"));

var _qs = _interopRequireDefault(require("qs"));

function getSearch(location) {
  if (location.search) {
    return location.search.replace('?', '');
  } else {
    return location.hash.split('?')[1] || '';
  }
}

function getPathname(location) {
  return location.pathname;
}

var DataPool =
/*#__PURE__*/
function () {
  function DataPool(_ref) {
    var namespace = _ref.namespace;
    (0, _classCallCheck2["default"])(this, DataPool);
    this.namespace = namespace;
    this.record = {};
    this.location = this.getLocationSearch();
  }

  (0, _createClass2["default"])(DataPool, [{
    key: "getDataPool",
    value: function getDataPool() {
      return this;
    }
  }, {
    key: "setRecord",
    value: function setRecord(data) {
      this.record = data;
    }
  }, {
    key: "getLocationSearch",
    value: function getLocationSearch() {
      var _window$location = _window["default"].location,
          location = _window$location === void 0 ? {} : _window$location;

      if (location) {
        return _qs["default"].parse(getSearch(location));
      }

      return {};
    }
  }, {
    key: "getLocationPathname",
    value: function getLocationPathname() {
      var _window$location2 = _window["default"].location,
          location = _window$location2 === void 0 ? {} : _window$location2;

      if (location) {
        return getPathname(location);
      }

      return '';
    }
  }, {
    key: "setLocation",
    value: function setLocation() {
      this.location = this.getLocationSearch();
    }
  }]);
  return DataPool;
}();

exports["default"] = DataPool;