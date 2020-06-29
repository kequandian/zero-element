"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useBaseChildren;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = require("react");

var _Model = require("../../Model");

var _format = require("../../utils/format");

var _APIConfig = require("../../config/APIConfig");

var _lifeCycle = require("../../utils/hooks/lifeCycle");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function useBaseChildren(_ref, config) {
  var namespace = _ref.namespace,
      _ref$itemsPath = _ref.itemsPath,
      itemsPath = _ref$itemsPath === void 0 ? 'items' : _ref$itemsPath,
      extraData = _ref.extraData;
  var _config$API = config.API,
      API = _config$API === void 0 ? {} : _config$API;
  var idRef = (0, _react.useRef)(0);
  var model = (0, _Model.useModel)({
    namespace: namespace,
    type: 'useBaseChildren'
  });
  var formData = model.formData;
  var itemsData = formData[itemsPath] || [];
  var fAPI = (0, _format.formatAPI)(API, {
    namespace: namespace,
    data: extraData
  });
  (0, _lifeCycle.useWillMount)(function (_) {
    model.setPageData('onGetChildrenList', onGetList);
  });
  (0, _lifeCycle.useWillUnmount)(function () {
    model.setPageData('onGetChildrenList', undefined);
  });

  function onGetList(_ref2) {
    var _ref2$current = _ref2.current,
        current = _ref2$current === void 0 ? (0, _APIConfig.get)('DEFAULT_current') : _ref2$current,
        _ref2$pageSize = _ref2.pageSize,
        pageSize = _ref2$pageSize === void 0 ? (0, _APIConfig.get)('DEFAULT_pageSize') : _ref2$pageSize,
        _ref2$queryData = _ref2.queryData,
        queryData = _ref2$queryData === void 0 ? {} : _ref2$queryData;
    var api = fAPI.listAPI;
    console.warn('TODO', api);
  }
  /**
   * 添加单个子项
   * @param {object} data 
   */


  function onCreate(data) {
    if (Object.keys(data).length === 0) return false;
    itemsData.push(_objectSpread(_objectSpread({}, data), {}, {
      '_id': idRef.current++
    }));
    model.save('formData', _objectSpread(_objectSpread({}, formData), {}, (0, _defineProperty2["default"])({}, itemsPath, itemsData)));
  }
  /**
   * 添加多个子项
   * @param {array} data 
   */


  function onCreateList(data) {
    if (!Array.isArray(data)) return false;
    itemsData.push.apply(itemsData, (0, _toConsumableArray2["default"])(data));
    model.save('formData', _objectSpread(_objectSpread({}, formData), {}, (0, _defineProperty2["default"])({}, itemsPath, itemsData)));
  }

  function onEdit(index, data) {
    itemsData[index] = data;
    model.save('formData', _objectSpread(_objectSpread({}, formData), {}, (0, _defineProperty2["default"])({}, itemsPath, itemsData)));
  } // 是通过对原 Array 直接修改，故不能用 filter 等返回新 Array 的方式来实现


  function onRemoveChild(_ref3) {
    var record = _ref3.record,
        _ref3$options = _ref3.options,
        options = _ref3$options === void 0 ? {} : _ref3$options;
    var index = itemsData.findIndex(function (item) {
      if (item._id !== undefined) {
        return item._id === record._id;
      }

      return item.id === record.id;
    });

    if (index > -1) {
      itemsData.splice(index, 1);
    }

    model.save('formData', _objectSpread(_objectSpread({}, formData), {}, (0, _defineProperty2["default"])({}, itemsPath, itemsData)));
  }

  return {
    config: config,
    data: itemsData,
    model: model,
    handle: {
      onGetList: onGetList,
      onCreate: onCreate,
      onCreateList: onCreateList,
      onEdit: onEdit,
      onRemoveChild: onRemoveChild
    }
  };
}