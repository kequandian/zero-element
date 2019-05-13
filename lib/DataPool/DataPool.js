"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _react = require("react");

var _window = _interopRequireDefault(require("../utils/window"));

var _qs = _interopRequireDefault(require("qs"));

var DataPool =
/*#__PURE__*/
function () {
  function DataPool(_ref) {
    var namespace = _ref.namespace;
    (0, _classCallCheck2["default"])(this, DataPool);
    this.namespace = namespace;
    this.queue = [];
    this.record = {};
    this.location = this.getLocationSearch();
  }

  (0, _createClass2["default"])(DataPool, [{
    key: "useDataPool",
    value: function useDataPool() {
      var _this = this;

      var _useState = (0, _react.useState)(),
          _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
          setState = _useState2[1];

      (0, _react.useEffect)(function () {
        // 初始订阅，或者取消订阅之后新的订阅
        var index = _this.queue.length;

        _this.queue.push(setState);

        return function () {
          // 更新后取消订阅
          _this.queue.splice(index, 1);
        };
      });
      return [{
        record: this.record,
        location: this.location
      }, {
        setRecord: this.setRecord.bind(this),
        setLocation: this.setLocation.bind(this)
      }];
    }
  }, {
    key: "dispatchUpdate",
    value: function dispatchUpdate() {
      this.queue.forEach(function (setState) {
        return setState({});
      });
    }
  }, {
    key: "setRecord",
    value: function setRecord(data) {
      this.record = data;
      this.dispatchUpdate();
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
      this.dispatchUpdate();
    }
  }]);
  return DataPool;
}();

exports["default"] = DataPool;