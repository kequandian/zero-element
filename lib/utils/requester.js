"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = requester;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _replaceKey = _interopRequireDefault(require("./replaceKey"));

var _PageContext = require("../components/EventProxy/PageContext");

/**
 * 操作 model status 的工具
 *
 * @export
 * @param {object} props
 * @param {object} dataPool
 * @returns
 */
function requester(props, dataPool) {
  var namespace = props.namespace;
  var pageContext = (0, _PageContext.getPageContext)();
  var dispatch;

  if (typeof pageContext.dispatch === 'function') {
    dispatch = pageContext.dispatch;
  } else if (typeof props.dispatch === 'function') {
    dispatch = props.dispatch;
  } else {
    throw new Error("\u8BF7\u4F20\u5165\u6709\u6548\u7684 dispatch");
  }

  var APISet = {};
  var replaceAPIKey = (0, _replaceKey["default"])(dataPool);

  function requestProxy(type, payload) {
    return dispatch((0, _objectSpread2["default"])({
      type: "".concat(namespace, "/").concat(type)
    }, payload));
  }

  function getFormatAPI(key) {
    var API = APISet[key];

    if (API !== undefined) {
      return replaceAPIKey.format(API);
    } else {
      throw new Error("".concat(key, " is undefined, check your config file"));
    }
  }

  function generalFetch(effects, APIName, args) {
    var payload = args.payload,
        rest = (0, _objectWithoutProperties2["default"])(args, ["payload"]);
    var options = (0, _objectSpread2["default"])({
      payload: payload
    }, rest);

    if (options.API !== undefined) {
      options.API = replaceAPIKey.format(API);
    } else {
      options.API = getFormatAPI(APIName);
    }

    if (!options.API) {
      return new Promise(function (res, rej) {
        return rej();
      })["catch"](function (err) {
        return void err;
      });
    }

    return requestProxy(effects, options);
  }

  return {
    setAPI: function setAPI(key, API) {
      if (key instanceof Object) {
        APISet = (0, _objectSpread2["default"])({}, APISet, key);
        console.log('设置 API Set :', APISet);
        return APISet;
      }

      console.log("\u8BBE\u7F6E API ".concat(key, " = ").concat(API));
      return APISet[key] = API;
    },
    getAPI: function getAPI(key) {
      if (key === undefined) return APISet;
      return getFormatAPI(key);
    },
    formatAPI: function formatAPI(API) {
      return replaceAPIKey.format(API);
    },
    save: function save(_ref) {
      var payload = _ref.payload,
          rest = (0, _objectWithoutProperties2["default"])(_ref, ["payload"]);
      requestProxy('save', (0, _objectSpread2["default"])({
        payload: payload
      }, rest));
    },
    fetchList: function fetchList(options) {
      return generalFetch('fetchList', 'listAPI', options);
    },
    fetchOne: function fetchOne(options) {
      return generalFetch('fetchOne', 'getAPI', options);
    },
    createForm: function createForm(options) {
      return generalFetch('createForm', 'createAPI', options);
    },
    updateForm: function updateForm(options) {
      return generalFetch('updateForm', 'updateAPI', options);
    },
    deleteOne: function deleteOne(options) {
      return generalFetch('deleteOne', 'deleteAPI', options);
    },
    deleteBatch: function deleteBatch(options) {
      return generalFetch('deleteBatch', 'deleteBatchAPI', options);
    }
  };
}