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
      var location = _window["default"].location;

      if (location) {
        return _qs["default"].parse(location.search.replace('?', ''));
      }

      return {};
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