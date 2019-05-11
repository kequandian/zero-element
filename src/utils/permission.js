import React, { useReducer, useMemo } from 'react';
import { LS } from './utils';

const permData = { perms: [] }; // { perms: [ 'admin', 'sys-user-edit' ] }

function reducer(state, { type, payload }) {
  switch (type) {
    case 'set':
      return { perms: payload.perms };
    case 'add':
      return { perms: [...state.perms, ...payload.perms] };
    default:
      throw new Error();
  }
}

export function Perm({ name, title = null, location, children }) {
  const perms = permData.perms;

  const reject = useMemo(() => {
    return !checkPerm(name, location);
  }, [perms, name, location]);

  if (reject) {
    return title;
  } else {
    return children;
  }
}

export function getPerm() {
  const perms = permData.perms;
  return perms;
}

export function setPerm(data) {
  const [value, dispatch] = useReducer(reducer, permData);
  return dispatch({
    type: 'set',
    payload: {
      perms: data,
    }
  });
}
export function addPerm(data) {
  const [value, dispatch] = useReducer(reducer, permData);
  return dispatch({
    type: 'add',
    payload: {
      perms: data,
    }
  });
}

export function checkPerm(permission, location = true) {
  let perms = permData.perms;

  if (location) {
    perms = LS.get('permissions') || [];
  }
  return testPerm(permission, perms);
}

function testPerm(currentPerm, permList) {
  if (!Array.isArray(currentPerm)) {
    currentPerm = [currentPerm];
  }
  return currentPerm.some(perm => permList.some(existing => existing === perm));
}