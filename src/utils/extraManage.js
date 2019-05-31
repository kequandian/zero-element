import React from 'react';
const storage = {};

export function initExtra(namespace, dispatch) {
  storage[namespace] = {};
  dispatch({
    type: 'extra',
    payload: new Proxy(storage[namespace], {
      get: function (target, name) {
        return target[name];
      },
      set: function (obj, prop, value) {
        if (value === null) {
          delete obj[prop];
        }
        obj[prop] = value;
        dispatch({
          type: 'extra',
          payload: obj,
        });
        return true;
      }
    })
  });
}
export function getExtraAll(namespace) {
  return Object.keys(storage[namespace]).map(key => {
    return React.cloneElement(storage[namespace][key], {
      key,
    });
  })
}

export function destroyExtra(namespace) {
  // 页面都移除了，无需触发 render
  delete storage[namespace];
}