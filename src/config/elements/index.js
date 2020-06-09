import React from 'react';

const elementsSet = {
  'Loading': () => <div>Loading……</div>,
  'PermRej': () => <div>403</div>,
};

function set(NodeObj) {
  Object.keys(NodeObj).forEach(key => {
    elementsSet[key] = NodeObj[key];
  })
}

function get(name) {
  return elementsSet[name];
}

const Render = ({ n, ...restProps }) => {
  const Component = elementsSet[n] || (() => <div>未定义的 element: {n}</div>);
  return <Component {...restProps} />
}

export {
  set,
  get,
  Render,
}