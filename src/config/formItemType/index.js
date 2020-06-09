import React from 'react';


const formItemTypeSet = {};

function set(NodeObj) {
  Object.keys(NodeObj).forEach(key => {
    formItemTypeSet[key] = NodeObj[key];
  })
}

function get(name) {
  return formItemTypeSet[name];
}

const Render = ({ n, ...restProps }) => {
  const Component = formItemTypeSet[n] || (() => <div>未定义的 formItemType: {n}</div>);
  return <Component {...restProps} />
}

export {
  set,
  get,
  Render,
}