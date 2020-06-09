import React from 'react';


const layoutSet = {};

function set(NodeObj) {
  Object.keys(NodeObj).forEach(key => {
    layoutSet[key] = NodeObj[key];
  })
}

function get(name) {
  return layoutSet[name];
}

const Render = ({ n, ...restProps }) => {
  const Component = layoutSet[n] || (() => <div>未定义的 layout: {n}</div>);
  return <Component {...restProps} />
}

export {
  set,
  get,
  Render,
}