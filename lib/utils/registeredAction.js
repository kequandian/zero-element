"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = registeredAction;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _PageContext = require("../components/EventProxy/PageContext");

function registeredAction() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  (0, _PageContext.addToListener)(function (pageContext) {
    var requester = pageContext.requester;
    requester.save({
      payload: {
        ZEleAction: actionProxy(config)
      }
    });
  });
}

function actionProxy(config) {
  var actionMap = {};
  config.items && config.items.forEach(function (item, i) {
    if (item.config && item.config.actions) {
      var actions = item.config.actions;
      actions.forEach(function (action) {
        var key = action.key,
            restConfig = (0, _objectWithoutProperties2["default"])(action, ["key"]);

        if (key) {
          actionMap[key] = match(restConfig);
        }
      });
    }
  });
  return function (key) {
    if (key === undefined) {
      return (0, _PageContext.getPageContext)();
    }

    if (actionMap[key]) {
      actionMap[key]();
    } else {
      console.warn("\u672A\u6CE8\u518C\u7684 action: ".concat(key, "\uFF0C\u8BF7\u5728 config \u4E2D \u6307\u5B9A key \u6765\u6CE8\u518C"));
    }
  };
}

function match(config) {
  var type = config.type,
      options = config.options;

  if (type === 'modal') {
    return (0, _PageContext.getPageContext)().onModal.bind(this, {
      options: options
    });
  }

  return function () {
    return console.warn("\u672A\u77E5\u7684 action type: ".concat(type));
  };
}