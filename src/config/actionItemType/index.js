import React from 'react';


const actionItemTypeSet = {};

function set(NodeObj) {
  Object.keys(NodeObj).forEach(key => {
    actionItemTypeSet[key] = NodeObj[key];
  })
}

function get(name) {
  return actionItemTypeSet[name];
}

const Render = ({ n, ...restProps }) => {
  const Component = actionItemTypeSet[n] || (() => <div>未定义的 actionItemType: {n}</div>);
  return <Component {...restProps} />
}

export {
  set,
  get,
  Render,
}