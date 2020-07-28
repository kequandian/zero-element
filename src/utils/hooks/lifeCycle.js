/* eslint-disable react-hooks/exhaustive-deps */
import { useReducer, useEffect, useMemo } from 'react';

export {
  useWillMount,
  useDidMount,
  useWillUnmount,
  useForceUpdate,
}

function useWillMount(func) {
  useMemo(() => void func(), []);
}
function useDidMount(func) {
  useEffect(() => void func(), []);
}

function useWillUnmount(func) {
  useEffect(() => func, []);
}

function useForceUpdate() {
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  return forceUpdate;
}