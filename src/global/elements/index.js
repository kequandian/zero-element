import React from 'react';
import loader from '../utils/loader';


const elementsSet = {
  'Loading': () => <div>Loading……</div>,
  'PermRej': () => <div>403</div>,
};

function set(NodeObj) {
  Object.keys(NodeObj).forEach(key => {
    elementsSet[key] = loader(NodeObj[key]);
  })
}

function get(name) {
  return elementsSet[name];
}

const Render = ({ n, ...restProps }) => {
  const Component = elementsSet[n] || <div>未定义的 element: {n}</div>;
  return <Component {...restProps} />
}

export {
  set,
  get,
  Render,
}