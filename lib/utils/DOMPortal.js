"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = manageRef;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

function mountToDOM(ref, child) {
  if (!ref || !_react["default"].isValidElement(child)) return null;
  return _reactDom["default"].createPortal(child, ref);
}

function unMountToDOM(ref) {
  return _reactDom["default"].unmountComponentAtNode(ref);
}
/**
 * 用于修改某些组件的局部固定位置
 * 组件把自己可挂载的地方 register 之后，其它组件就可以通过 mount 挂载其它内容进去
 *
 * @export
 * @returns
 */


function manageRef() {
  var refSet = {};
  return {
    register: function register(key, ref) {
      if (!ref || ref.toString() !== '[object HTMLDivElement]') {
        console.warn('预期接收 HTMLDivElement 作为容器，实际接收: ', ref);
        return null;
      }

      ;
      refSet[key] = ref;
    },
    unregister: function unregister(key) {
      delete refSet[key];
    },
    mount: function mount(key, child) {
      if (refSet[key]) {
        return mountToDOM(refSet[key], child);
      } else {
        console.warn("\u8282\u70B9 ".concat(key, " \u672A\u6CE8\u518C"));
      }
    }
  };
}