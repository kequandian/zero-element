"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = listHooks;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _queryString = _interopRequireDefault(require("query-string"));

var _modelHooks = _interopRequireDefault(require("./modelHooks"));

var _request = require("../request");

var _PageContext = require("../../components/EventProxy/PageContext");

var _antd = require("antd");

var methodMap = {
  get: _request.query,
  post: _request.post,
  put: _request.update,
  "delete": _request.remove
};

function listHooks(props) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _props$modelStatus = props.modelStatus,
      modelStatus = _props$modelStatus === void 0 ? {} : _props$modelStatus,
      requester = props.requester,
      dataPool = props.dataPool,
      history = props.history;
  var _modelStatus$searchDa = modelStatus.searchData,
      searchData = _modelStatus$searchDa === void 0 ? {} : _modelStatus$searchDa;
  var modelPath = options.modelPath;
  var hooks = (0, _modelHooks["default"])(props, {
    modelPath: modelPath
  });

  var _getPageContext = (0, _PageContext.getPageContext)(),
      onListRefresh = _getPageContext.onListRefresh,
      onModal = _getPageContext.onModal;

  function onGetListData(_ref) {
    var current = _ref.current,
        pageSize = _ref.pageSize;
    var queryData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var listData = hooks.getSelfModelStatus();
    var _listData$pageSize = listData.pageSize,
        listDataPageSize = _listData$pageSize === void 0 ? 10 : _listData$pageSize;
    return hooks.fetch('fetchList', (0, _objectSpread2["default"])({
      payload: (0, _objectSpread2["default"])({
        current: current,
        pageSize: pageSize ? pageSize : listDataPageSize
      }, searchData, queryData)
    }, options));
  }

  function onTableChange(current, pageSize) {
    onGetListData({
      current: current,
      pageSize: pageSize
    });
  }

  function onTableRefresh() {
    var listData = hooks.getSelfModelStatus();
    var _listData$current = listData.current,
        current = _listData$current === void 0 ? 1 : _listData$current,
        _listData$pageSize2 = listData.pageSize,
        pageSize = _listData$pageSize2 === void 0 ? 10 : _listData$pageSize2;
    onGetListData({
      current: current,
      pageSize: pageSize
    });
  }

  function onPath(_ref2) {
    var record = _ref2.record,
        _ref2$options = _ref2.options,
        options = _ref2$options === void 0 ? {} : _ref2$options;
    var path = options.path,
        _options$queryData = options.queryData,
        queryData = _options$queryData === void 0 ? 'id' : _options$queryData;

    if (history && path) {
      var queryObj = getSearchObject(queryData, record);
      var searchString = {};
      Object.keys(queryObj).forEach(function (key) {
        searchString[key] = record[queryObj[key]] || queryObj[key];
      });
      history.push({
        pathname: path,
        search: _queryString["default"].stringify(searchString)
      });
    }
  }

  function getSearchObject(queryData, record) {
    if (typeof queryData === 'string') {
      return {
        id: queryData
      };
    } else if ((0, _typeof2["default"])(queryData) === 'object') {
      return queryData;
    } else if (typeof queryData === 'function') {
      return queryData(record);
    }

    console.error('传入的 queryData 非预期');
    return {};
  }

  function onDelete(_ref3) {
    var record = _ref3.record,
        _ref3$options = _ref3.options,
        options = _ref3$options === void 0 ? {} : _ref3$options;
    dataPool.registerToRecord(record);
    var request = hooks.fetch('deleteOne', {});
    request.then(function (_ref4) {
      var code = _ref4.code;

      if (code === 200) {
        // AntdMessage.success('删除成功'); // 在 model 里面有提示
        if (onListRefresh) {
          onListRefresh();
        }
      }
    });
  }

  function onSwitch(_ref5) {
    var record = _ref5.record,
        _ref5$options = _ref5.options,
        options = _ref5$options === void 0 ? {} : _ref5$options;
    var method = options.method,
        API = options.API,
        _options$message = options.message,
        message = _options$message === void 0 ? '操作成功' : _options$message;
    dataPool.registerToRecord(record);
    var matchMethod = methodMap[method] || methodMap['put'];
    var request = matchMethod(requester.formatAPI(API));
    request.then(function (_ref6) {
      var code = _ref6.code;

      if (code === 200) {
        message && _antd.message.success(message);

        if (onListRefresh) {
          onListRefresh(); // 使用注册进来的刷新方法
        }
      }
    });
  }

  function handleModal(_ref7) {
    var _ref7$options = _ref7.options,
        options = _ref7$options === void 0 ? {} : _ref7$options;
    onModal({
      options: options
    });
  }

  function handleSaveSelectedRows(selectedRowKeys, selectedRows) {
    var data = hooks.getSelfModelStatus();
    hooks.save({
      payload: (0, _defineProperty2["default"])({}, modelPath, (0, _objectSpread2["default"])({}, data, {
        selectedRowKeys: selectedRowKeys,
        selectedRows: selectedRows
      }))
    });
  }

  function onRequest(_ref8) {
    var record = _ref8.record,
        _ref8$options = _ref8.options,
        options = _ref8$options === void 0 ? {} : _ref8$options;
    var method = options.method,
        API = options.API,
        _options$message2 = options.message,
        message = _options$message2 === void 0 ? '操作成功' : _options$message2;
    dataPool.registerToRecord(record);
    var matchMethod = methodMap[method] || methodMap['get'];
    var request = matchMethod(requester.formatAPI(API));
    request.then(function (_ref9) {
      var code = _ref9.code;

      if (code === 200) {
        message && _antd.message.success(message);

        if (onListRefresh) {
          onListRefresh(); // 使用注册进来的刷新方法
        }
      }
    });
  }

  return {
    getSelfModelStatus: hooks.getSelfModelStatus,
    setSelfModelStatus: hooks.setSelfModelStatus,
    save: hooks.save,
    onGetListData: onGetListData,
    onTableChange: onTableChange,
    onTableRefresh: onTableRefresh,
    onSaveSelectedRows: handleSaveSelectedRows,
    onPath: onPath,
    onDelete: onDelete,
    onSwitch: onSwitch,
    onModal: handleModal,
    onRequest: onRequest
  };
}