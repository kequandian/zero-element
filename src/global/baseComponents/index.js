import React from 'react';


const baseComponentsSet = {};

function set(NodeObj) {
  Object.keys(NodeObj).forEach(key => {
    baseComponentsSet[key] = NodeObj[key];
  });
}

function get(name) {
  return baseComponentsSet[name];
}

const Render = ({ n, ...restProps }) => {
  const Component = baseComponentsSet[n] || <div>未定义的 baseComponent: {n}</div>;
  return <Component {...restProps} />
}

export {
  set,
  get,
  Render,
}