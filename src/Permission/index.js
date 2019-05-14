import React from 'react';
import Permission from './Permission';
import { Render } from '@/global/elements';

const permPools = {};

function usePermission(options) {
  if (typeof options === 'object') {
    const { namespace = 'global' } = options;
    return getPermission(namespace);
  }
  return getPermission('global');
}

function getPermission(namespace) {
  if (!permPools[namespace]) {
    createPermission({ namespace });
  }
  return permPools[namespace].usePermission();
}

function createPermission({ namespace }) {
  permPools[namespace] = new Permission({ namespace });
}

function removePermission(namespace) {
  delete permPools[namespace];
}

function setPerm(perm, namespace = 'global') {
  permPools[namespace].setPerm(perm);
}
function delPerm(perm, namespace = 'global') {
  permPools[namespace].delPerm(perm);
}

export {
  usePermission,
  removePermission,
  setPerm,
  delPerm,
}

export default function Perm(props) {
  const { perm, rej = null, namespace = 'global', children } = props;
  const [permObj] = getPermission(namespace);
  if (permObj[perm]) {
    return children;
  } else {
    return rej || <Render n="PermRej" />;
  }
}