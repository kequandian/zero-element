import React from 'react';
const storage = {};

export function initExtra(namespace, dispatch) {
  storage[namespace] = {
    state: {},
    node: {},
  };
  dispatch({
    type: 'extraNode',
    payload: new Proxy(storage[namespace].node, handlerNode(namespace, dispatch))
  });
  dispatch({
    type: 'extraState',
    payload: new Proxy(storage[namespace].state, handlerState(namespace, dispatch))
  });
}
function handlerNode(namespace, dispatch) {
  return {
    set: function (obj, prop, value) {
      if (value === null) {
        delete obj[prop];
      } else {
        obj[prop] = value;
      }

      dispatch({
        type: 'extraNode',
        payload: new Proxy(storage[namespace].node, handlerNode(namespace, dispatch)),
      });
      return true;
    }
  }
}
function handlerState(namespace, dispatch) {
  return {
    set: function (obj, prop, value) {
      if (value === null) {
        delete obj[prop];
      } else {
        obj[prop] = value;
      }
      dispatch({
        type: 'extraState',
        payload: new Proxy(storage[namespace].state, handlerState(namespace, dispatch)),
      });
      return true;
    }
  }
}

export function getExtraAll(namespace) {
  return Object.keys(storage[namespace].node).map(key => {
    return React.cloneElement(storage[namespace].node[key], {
      key,
    });
  })
}

export function destroyExtra(namespace) {
  // 页面都移除了，无需触发 render
  delete storage[namespace];
}