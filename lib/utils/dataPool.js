"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = dataPool;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _queryString = _interopRequireDefault(require("query-string"));

var _PageContext = require("../components/EventProxy/PageContext");

function dataPool(props) {
  var location = props.location,
      dispatch = props.dispatch,
      namespace = props.namespace;
  var modelStatus = props.modelStatus || {};
  var pool = {
    location: _queryString["default"].parse(location.search.replace('?', '')),
    record: {} // List 的当前操作行

  };
  return {
    register: function register(newModelStatus) {
      modelStatus = newModelStatus;
    },
    getToLocation: function getToLocation(key) {
      return pool.location[key];
    },
    clearLocation: function clearLocation() {
      pool.location = {};
    },
    registerToRecord: function registerToRecord(obj) {
      pool.record = obj;
    },
    getToRecord: function getToRecord(key) {
      return pool.record[key];
    },
    clearRecord: function clearRecord() {
      pool.record = {};
    },
    getToForm: function getToForm(key) {
      var pageContext = (0, _PageContext.getPageContext)();
      var _pageContext$pageData = pageContext.pageData,
          pageData = _pageContext$pageData === void 0 ? {} : _pageContext$pageData;
      var _pageData$formData = pageData.formData,
          formData = _pageData$formData === void 0 ? {} : _pageData$formData;
      return formData[key];
    },
    getToFormAll: function getToFormAll() {
      var modelPath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'formData';
      return modelStatus[modelPath];
    },
    clearForm: function clearForm() {
      var _objectSpread2;

      var dataPath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'formData';
      var pageContext = (0, _PageContext.getPageContext)();
      var _pageContext$pageData2 = pageContext.pageData,
          pageData = _pageContext$pageData2 === void 0 ? {} : _pageContext$pageData2;
      (0, _PageContext.setPageContext)('pageData', (0, _objectSpread3["default"])({}, pageData, (_objectSpread2 = {}, (0, _defineProperty2["default"])(_objectSpread2, dataPath, {}), (0, _defineProperty2["default"])(_objectSpread2, "formValidate", {}), _objectSpread2)));
    },
    getToFormAllErr: function getToFormAllErr() {
      return modelStatus.formValidate || {};
    },
    getToSearchAll: function getToSearchAll() {
      var modelPath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'searchData';
      return modelStatus[modelPath];
    },
    clearSearch: function clearSearch() {
      var _payload;

      var modelPath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'searchData';
      dispatch({
        type: "".concat(namespace, "/save"),
        payload: (_payload = {}, (0, _defineProperty2["default"])(_payload, modelPath, {}), (0, _defineProperty2["default"])(_payload, "searchValidate", {}), _payload)
      });
    },
    getAll: function getAll() {
      var pageContext = (0, _PageContext.getPageContext)();
      var _pageContext$pageData3 = pageContext.pageData,
          pageData = _pageContext$pageData3 === void 0 ? {} : _pageContext$pageData3;
      return {
        modelStatus: modelStatus,
        pool: pool,
        pageData: pageData
      };
    }
  };
}