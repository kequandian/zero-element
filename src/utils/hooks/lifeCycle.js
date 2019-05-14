import { useState, useEffect, useMemo } from 'react';

export {
  useWillMount,
  useDidMount,
  useWillUnmount,
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