import React from 'react';


const valueTypeSet = {};

function set(NodeObj) {
  Object.keys(NodeObj).forEach(key => {
    valueTypeSet[key] = NodeObj[key];
  })
}

function get(name) {
  return valueTypeSet[name];
}

const Render = ({ n, ...restProps }) => {
  const Component = valueTypeSet[n] || (() => <div>未定义的 valueType: {n}</div>);
  return <Component {...restProps} />
}

export {
  set,
  get,
  Render,
}