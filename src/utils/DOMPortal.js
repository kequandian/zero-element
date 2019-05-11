import React from 'react';
import ReactDOM from 'react-dom';

function mountToDOM(ref, child) {
  if (!ref || !React.isValidElement(child)) return null;
  return ReactDOM.createPortal(child, ref);
}
function unMountToDOM(ref) {
  return ReactDOM.unmountComponentAtNode(ref);
}


/**
 * 用于修改某些组件的局部固定位置
 * 组件把自己可挂载的地方 register 之后，其它组件就可以通过 mount 挂载其它内容进去
 *
 * @export
 * @returns
 */
export default function manageRef() {
  let refSet = {};

  return {
    register(key, ref) {
      if (!ref || ref.toString() !== '[object HTMLDivElement]') {
        console.warn('预期接收 HTMLDivElement 作为容器，实际接收: ', ref);
        return null;
      };
      refSet[key] = ref;
    },
    unregister(key) {
      delete refSet[key];
    },
    mount(key, child) {
      if (refSet[key]) {
        return mountToDOM(refSet[key], child);
      } else {
        console.warn(`节点 ${key} 未注册`);
      }
    },
  };
}