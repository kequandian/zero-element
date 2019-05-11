import React from 'react';
import TitledHeader from '../components/Layout/TitledHeader';


/**
 * 管理一下内部用到的零散组件
 *
 * @export
 * @param {object} [object] 初始注册的组件
 */
export default function ComponentPortal(set = {}) {
  this.componentSet = {
    Empty: (props) => {
      return props.children;
    },
    TitledHeader,
    ...set,
  };
}

ComponentPortal.prototype.get = function (key) {
  return this.componentSet[key] || this.componentSet['Empty'];
}
ComponentPortal.prototype.if = function (boolean, trueKey, falseKey) {
  return boolean ? this.componentSet[trueKey] : this.componentSet[falseKey];
}