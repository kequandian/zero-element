import React from 'react';


const containerSet = {};

function set(NodeObj) {
  Object.keys(NodeObj).forEach(key => {
    containerSet[key] = NodeObj[key];
  });
}

function get(name) {
  return containerSet[name];
}

const Render = ({ n, ...restProps }) => {
  const Component = containerSet[n] || (() => <div>未定义的 container: {n}</div>);
  return <Component {...restProps} />
}

export {
  set,
  get,
  Render,
}